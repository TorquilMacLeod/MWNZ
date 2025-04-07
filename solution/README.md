# Companies API Documentation

## Deployment

In order to deploy this solution into a new environment:
* Zip the solutions/lambda folder and upload to an S3 bucket
* Create a new CloudFormation stack using cloudformation.yml as a template
* Enter the parameters as required
* Once the stack has launched, navigate to the outputs and note the URL of the new API

## API Endpoint

The base API endpoint is:
```
https://6jo30zzzz8.execute-api.eu-west-2.amazonaws.com/dev
```

## Available Endpoints

### Get Company by ID

Retrieves information about a specific company by its ID.

**Endpoint:** `/companies/{id}`

**Method:** GET

**URL Example:**
```
https://6jo30zzzz8.execute-api.eu-west-2.amazonaws.com/dev/companies/1
```

**Path Parameters:**
- `id` (required): The unique identifier of the company you want to retrieve.

**Response Format:**
```json
{
  "id": "company_id",
  "name": "Company Name",
  "description": "Company Description"
}
```

## Try It Now

You can test the API with company ID 1:
[https://6jo30zzzz8.execute-api.eu-west-2.amazonaws.com/dev/companies/1](https://6jo30zzzz8.execute-api.eu-west-2.amazonaws.com/dev/companies/1)