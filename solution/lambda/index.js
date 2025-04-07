/**
 * Lambda handler for the /companies/{id} GET endpoint
 * Fetches XML from existing 'service' and returns JSON.
 * 
 * Console logging to CloudWatch is used throughout for debug.
 */

const https = require('https')
const { XMLParser } = require('fast-xml-parser')

// Define fixed XML backend URL
const xmlSource = 'https://raw.githubusercontent.com/MiddlewareNewZealand/evaluation-instructions/main/xml-api'


exports.handler = async (event, ) => {
    console.log('Event received:', JSON.stringify(event, null, 2))
    
    try {
        // Extract company ID from path parameters
        const pathParameters = event.pathParameters || {}
        const companyId = pathParameters.id
        
        if (!companyId) {
            return buildResponse(400, { error: 'Missing company ID' })
        }
        
        console.log(`Retrieving information for company ID: ${companyId}`)
        
        // Fetch and process XML data from backend
        const companyXMLData = await fetchXMLFromUrl(companyId)
        const companyJSONData = await parseXMLToJSON(companyXMLData)
        
        if (companyJSONData) {
            return buildResponse(200, companyJSONData)
        } else {
            return buildResponse(404, { error: `Company with ID ${companyId} not found` })
        }
    } catch (error) {
        console.error('Error processing request:', error)
        return buildResponse(500, { error: 'Internal server error', message: error.message })
    }
}

/**
 * Fetches XML content from a URL
 * 
 * @param {string} url - The URL to fetch XML from
 * @returns {Promise<string>} The XML content as a string (promisified)
 */
function fetchXMLFromUrl(companyId) {
    return new Promise((resolve, reject) => {
        // Determine the URL for the XML data based on company ID
        const url = `${xmlSource}/${companyId}.xml`
        
        if (!companyId) {
            console.log(`No company ID provided`)
            return reject(new Error(`No company ID provided`))
        }

        const request = https.get(url, (response) => {
            // Handle redirects
            if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                return resolve(fetchXMLFromUrl(response.headers.location))
            }
            
            // Check for error status codes
            if (response.statusCode < 200 || response.statusCode >= 300) {
                return reject(new Error(`Failed to fetch XML, status code: ${response.statusCode}`))
            }
            
            // Collect data
            const chunks = []
            response.on('data', (chunk) => {
                chunks.push(chunk)
            })
            
            response.on('end', () => {
                const data = Buffer.concat(chunks).toString()
                resolve(data)
            })
        })
        
        request.on('error', (err) => {
            reject(err)
        })
        
        // Set timeout to avoid hanging requests
        request.setTimeout(5000, () => {
            request.abort()
            reject(new Error('Request timed out'))
        })
        
        request.end()
    })
}

/**
 * Parses XML string to JSON object
 * 
 * @param {string} xmlContent - XML content as string
 * @returns {Object} Parsed JSON object
 */
function parseXMLToJSON(xmlContent) {
    // Configure parser options
    const options = {
        ignoreAttributes: false,
        attributeNamePrefix: '@_',
        parseAttributeValue: true
    }
    
    const parser = new XMLParser(options)
    return parser.parse(xmlContent)
}

/**
 * Processes parsed JSON data into the desired response format
 * 
 * @param {Object} parsedData - Parsed JSON data
 * @returns {Object} Processed JSON data
 */
function processCompanyData(parsedData) {
    try {
        // This is just an example - adjust according to your actual XML structure
        const companyInfo = parsedData.company
        
        if (!companyInfo) {
            throw new Error('Unexpected XML structure')
        }
        
        return {
            id: companyId,
            name: companyInfo.name || companyInfo.Name
        }
    } catch (error) {
        console.error('Error processing company data:', error)
    }
}

/**
 * Builds the response object for API Gateway
 * 
 * @param {number} statusCode - HTTP status code
 * @param {Object} body - Response body
 * @returns {Object} API Gateway response object
 */
function buildResponse(statusCode, body) {
    return {
        statusCode,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type'
        },
        body: JSON.stringify(body)
    }
}