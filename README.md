# Evaluation Instructions

## Introduction

The purpose of this exercise is to evaluate your approach to creating a very simple Node.js backend application. We expect you to spend a couple of hours or less to complete this, and it will be used to evaluate how you approach a technical task.

## Sequence

1. Clone this repo `git clone https://github.com/MiddlewareNewZealand/evaluation-instructions.git`
2. Develop a simple Node.js API (see [Evaluation Details](#-Evaluation-details))
3. Publish your code to a source repository that we can access
4. Provide us with a link to this code at least a day before you come to see us

## Evaluation details

- Create an application using any libraries you wish
- When a request is received make another request to the [existing backend xml service](./xml-api/openapi-xml.yaml)
- Transform the xml response into a json format that matches the [supplied OpenAPI specification](./openapi-companies.yaml)
- Ensure that the application code is tested appropriately

## Things to consider

- You will need to tell us how you went about creating your application and why you created it in the way that you did
- Think about how you would deploy the application into a production environment
- Think about how your application is documented - remember that your audience (us) are technical and should be able to run your code

## Resources

- [Your API OpenAPI specification](./openapi-companies.yaml)
- [Existing XML API OpenAPI specification](./xml-api/openapi-xml.yaml)
- Existing XML API curl example

  ```bash
  curl https://raw.githubusercontent.com/MiddlewareNewZealand/evaluation-instructions/blob/main/xml-api/1.xml
  ```
