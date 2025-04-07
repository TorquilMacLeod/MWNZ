# Companies API Documentation

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