# Minimalistic Node.js REST API

This project is a minimalistic Node.js REST API that implements basic CRUD operations (POST, GET, UPDATE, DELETE) with corresponding endpoints (/create, /read, /update, /delete).

## Table of Contents

- [Features](#features)
- [Usage](#usage)
- [Documentation](#documentation)

## Features

- **HTTP Methods:** Supports POST, GET, UPDATE, and DELETE methods.
- **Endpoints:** Provides /create, /read, /update, and /delete endpoints for data manipulation.
- **Data Management:** Uses a counter variable and an array to store and manage data in memory.
- **Request Validation:** Implements request validation for all methods and endpoints.
- **Error Handling:** Includes a general error handling mechanism for robustness.
- **Testing:** Comprehensive test suite covering all HTTP methods and endpoints.
- **Security Enhancements:**
  - **Helmet:** Enhances security by setting various HTTP headers. Protects against common web vulnerabilities.
  - **CORS Middleware:** Enables Cross-Origin Resource Sharing, ensuring secure communication with the API from different domains.
  - **express-rate-limit:** Implements rate limiting to prevent abuse and protect against brute-force attacks.
- **Performance Optimization:**
  - **Compression Middleware:** Minifies and compresses response bodies to improve API performance.
- **Docker Support:** Dockerfile, docker-compose-prod, docker-compose-dev, and docker-compose-test files are provided for easy containerization.


# Usage

## Installation and Running (Manual)

### Install dependencies

```bash
npm install
```

### Start the application in production mode
In production mode, the application is optimized for performance.
The application will be accessible at `http://localhost:80`.

```bash
npm run start
```

### Start the application in development mode
In development mode, the application runs with additional features.
The application will be accessible at `http://localhost:3000`.

```bash
npm run develop
```

### Run tests

After running the tests, you can find detailed output and logs in the /tests/logs/* folder. Each test suite will generate its own log file, providing insights into the test results.

Run tests for the POST /create endpoint
```bash
npm run test:create
```

Run tests for the GET /read endpoint
```bash
npm run test:read
```

Run tests for the PUT /update endpoint
```bash
npm run test:update
```

Run tests for the DELETE /delete endpoint
```bash
npm run test:delete
```

## Installation, Running and Testing with Docker
This project supports Docker for easy installation, running, and testing. Follow the instructions below to get started.


### Build Docker Image
This command will build the Docker image for the application.

```bash
npm run docker:build
```

### Production Container

This command will start the Docker container in production mode. The application will be accessible at `http://localhost:80`
```bash
npm run docker:prod-start 
```

This command will stop the running production container.
```bash
npm run docker:prod-stop
```

This command will stop and delete the production container.
```bash
npm run docker:prod-delete
```

### Development Container

This command will start the Docker container in development mode. The application will be accessible at `http://localhost:3000`.
```bash
npm run docker:dev-start
```

This command will stop the running development container.
```bash
npm run docker:dev-stop
```

This command will stop and delete the development container.
```bash
npm run docker:dev-delete
```

### Testing Container
This command will start the Docker container in a testing environment.
After running the tests, you can find detailed output and logs in the /tests/logs/* folder. Each test suite will generate its own log file, providing insights into the test results.

```bash
npm run docker:test-start
```

This command will stop and delete the testing container.
```bash
npm run docker:test-delete
```

# Documentation 
This documentation provides details for interacting with the this API.
Note: Replace `[PORT_NUMBER]` with `80` for production mode and `3000` for development mode. Adjust the API base URL accordingly.

`[HTTP_METHOD] /[ENDPOINT]`

## POST /create
This endpoint and method are used to create new data entries.

### Request
The request should include JSON payload with required parameters.

Create a data: `http://localhost:[PORT_NUMBER]/create`

```json
{
    "dataName": "sample name",
    "dataContent": "sample content"
}
```

#### Commandline with cURL (Windows, Linux, MacOS)

```bash
curl -X POST -H "Content-Type: application/json" -d '{"dataName":"sample name","dataContent":"sample content"}' -w '\n' -i http://localhost:[PORT_NUMBER]/create
```

#### Commandline on PowerShell (Windows)

```bash
Invoke-RestMethod -Uri 'http://localhost:[PORT_NUMBER]/create' -Method Post -Body (@{dataName='sample name'; dataContent='sample content'} | ConvertTo-Json) -Headers @{ 'Content-Type' = 'application/json' }
```

#### Postman
Send a POST request to `http://localhost:[PORT_NUMBER]/create` with the following JSON payload:

```json
{
    "dataName": "sample name",
    "dataContent": "sample content"
}
```

### Response
The expected response will be in JSON format, confirming the successful creation of the data entry.

The response includes:

`message`: A message indicating the success of the data creation operation.

`data`: An object containing details of the newly created data entry.

Example response for `http://localhost:[PORT_NUMBER]/create`:

```json
{
    "message": "Data Created",
    "data": {
        "dataID": 1,
        "dataName": "sample name",
        "dataContent": "sample content",
        "dataCreatedDatetime": "0000-00-00 00:00:00",
        "dataChangedDatetime": "0000-00-00 00:00:00"
    }
}
```

## GET /read 
This method and endpoint are used to retrieve existing data entries.

### Request
The request should include with required parameters.
Fetch all data: `http://localhost:[PORT_NUMBER]/read`

Fetch specific data by ID (replace [dataID] with the actual data ID): `http://localhost:[PORT_NUMBER]/read/[dataID]`

#### Commandline with cURL (Windows, Linux, MacOS)

Fetch all data: `http://localhost:[PORT_NUMBER]/read`

```bash
curl -X GET -H "Content-Type: application/json" -w '\n' -i http://localhost:[PORT_NUMBER]/read
```

Fetch specific data by ID (replace [dataID] with the actual data ID): `http://localhost:[PORT_NUMBER]/read/[dataID]`

```bash
curl -X GET -H "Content-Type: application/json" -w '\n' http://localhost:[PORT_NUMBER]/read/[dataID]
```

#### Commandline on PowerShell (Windows)

Fetch all data: `http://localhost:[PORT_NUMBER]/read`

```bash
Invoke-RestMethod -Uri "http://localhost:[PORT_NUMBER]/read" -Method Get -Headers @{ "Content-Type" = "application/json" }
```

Fetch specific data by ID (replace [dataID] with the actual data ID): `http://localhost:[PORT_NUMBER]/read/[dataID]`

```bash
Invoke-RestMethod -Uri "http://localhost:[PORT_NUMBER]/read/[dataID]" -Method Get -Headers @{ "Content-Type" = "application/json" }
```

#### Postman
You can use Postman to send a GET request to:

Fetch all data: `http://localhost:[PORT_NUMBER]/read`

```bash
http://localhost:[PORT_NUMBER]/read
```

Fetch specific data by ID (replace [dataID] with the actual data ID): `http://localhost:[PORT_NUMBER]/read/[dataID]`

```bash
http://localhost:[PORT_NUMBER]/read/[dataID]
```

### Response
The response from the `GET /read` endpoint will be in JSON format and will confirm the successful retrieval of data.

The response includes:

`message`: A descriptive message confirming the success of the operation.

`data`: An array containing the retrieved data entries, each with a dataName and dataContent.

Example response for `http://localhost:[PORT_NUMBER]/read`:

```json
{
    "message": "Data Fetched",
    "data": [
        {
            "dataID": 1,
            "dataName": "sample name 1",
            "dataContent": "sample content 1",
            "dataCreatedDatetime": "0000-00-00 00:00:00",
            "dataChangedDatetime": "0000-00-00 00:00:00"
        },
        {
            "dataID": 2,
            "dataName": "sample name 2",
            "dataContent": "sample content 2",
            "dataCreatedDatetime": "0000-00-00 00:00:00",
            "dataChangedDatetime": "0000-00-00 00:00:00"
        }
        // More data entries as needed
    ]
}
```

Example response for `http://localhost:[PORT_NUMBER]/read/1`:

```json
{
    "message": "Data Readed",
    "data": {
        "dataID": 1,
        "dataName": "sample name 1",
        "dataContent": "sample content 1",
        "dataCreatedDatetime": "0000-00-00 00:00:00",
        "dataChangedDatetime": "0000-00-00 00:00:00"
    }
}
```

## PUT /update 
This method and endpoint allow users to update existing data entries.

### Request
To update existing data, send a PUT request to `http://localhost:[PORT_NUMBER]/update/[dataID]`. The request should include a JSON payload with the updated parameters.

Update existing data: `http://localhost:[PORT_NUMBER]/update/[dataID]`

The request should include a JSON payload with required parameters.

```json
{
    "dataName": "sample name",
    "dataContent": "sample content"
}
```

#### Commandline with cURL (Windows, Linux, MacOS)

```bash
curl -X PUT -H "Content-Type: application/json" -d '{"dataName":"sample name 1","dataContent":"sample content 1"}' -w '\n' http://localhost:[PORT_NUMBER]/update/[dataID]
```

#### Commandline on PowerShell (Windows)

```bash
Invoke-RestMethod -Uri "http://localhost:[PORT_NUMBER]/update/[dataID]" -Method Put -Headers @{ "Content-Type" = "application/json" } -Body '{"dataName":"sample name 1","dataContent":"sample content 1"}'
```

#### Postman
Send a PUT request to `http://localhost:[PORT_NUMBER]/update/[dataID]` with the following JSON payload:

```json
{
    "dataName": "sample name 1",
    "dataContent": "sample content 1"
}
```

### Response
Upon successful update, the response includes a message confirming the update and the updated data entry.

The response includes:

`message`: "Data Updated"

`data`: An object containing the updated data entry details.

Example response for `http://localhost:[PORT_NUMBER]/update/1`:

```json
{
    "message": "Data Updated",
    "data": {
        "dataID": 1,
        "dataName": "sample name 1",
        "dataContent": "sample content 1",
        "dataCreatedDatetime": "0000-00-00 00:00:00",
        "dataChangedDatetime": "0000-00-00 00:00:00"
    }
}
```

## DELETE /delete 
This method and endpoint are used to delete existing data entries.

### Request
To delete existing data, send a DELETE request to `http://localhost:[PORT_NUMBER]/delete/[dataID]`.

Delete all data: `http://localhost:[PORT_NUMBER]/delete`

Delete specific data by ID (replace [dataID] with the actual data ID): `http://localhost:[PORT_NUMBER]/delete/[dataID]`

#### Commandline with cURL (Windows, Linux, MacOS)

Delete all data: `http://localhost:[PORT_NUMBER]/delete`

```bash
curl -X DELETE -H "Content-Type: application/json" -w '\n' http://localhost:[PORT_NUMBER]/delete
```

Delete specific data by ID (replace [dataID] with the actual data ID): `http://localhost:[PORT_NUMBER]/delete/[dataID]`

```bash
curl -X DELETE -H "Content-Type: application/json" -w '\n' http://localhost:[PORT_NUMBER]/delete/[dataID]
```

#### Commandline on PowerShell (Windows)

Delete all data: `http://localhost:[PORT_NUMBER]/delete`

```bash
Invoke-RestMethod -Uri "http://localhost:[PORT_NUMBER]/delete" -Method Delete -Headers @{ "Content-Type" = "application/json" }
```

Delete specific data by ID (replace [dataID] with the actual data ID): `http://localhost:[PORT_NUMBER]/delete/[dataID]`

```bash
Invoke-RestMethod -Uri "http://localhost:[PORT_NUMBER]/delete/[dataID]" -Method Delete -Headers @{ "Content-Type" = "application/json" }
```

#### Postman
You can use Postman to send a DELETE request to:

Delete all data: `http://localhost:[PORT_NUMBER]/delete`

```bash
http://localhost:[PORT_NUMBER]/delete
```

Delete specific data by ID (replace [dataID] with the actual data ID): `http://localhost:[PORT_NUMBER]/delete/[dataID]`

```bash
http://localhost:[PORT_NUMBER]/delete/[dataID]
```

### Response
Upon successful deletion, the response includes a message confirming the deletion and the details of the deleted data entry

The response includes:

`message`: A descriptive message confirming the success of the operation.

`data`: An object containing details of specific or all deleted data entry.

Example response for `http://localhost:[PORT_NUMBER]/delete`:

```json
{
    "message": "All Data Deleted",
    "data": []
}
```

Example response for `http://localhost:[PORT_NUMBER]/delete/1`:

```json
{
    "message": "Data deleted",
    "data": {
        "dataID": 1
    }
}
```