# CSCI E-49 Cloud Security Final Project

## Overview

This project demonstrates a cloud-based application using Node.js, integrated with AWS Cognito for authentication and authorization. It showcases the implementation of OAuth callback handling, user group-based data retrieval, and secure data presentation.

## Features

- OpenID Connect authentication with AWS Cognito.
- User group verification to display proprietary or public data.
- Modular architecture for maintainability and scalability.
- Enhanced security with Helmet, CSRF protection, and rate limiting.

## Prerequisites

- Node.js (Version X.X.X or higher recommended)
- AWS account and a configured Cognito User Pool
- MySQL database with the required schema

## Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory and install dependencies:
   ```shell
   npm install
   ```
3. Set up your .env file with the required environment variables:
  - COGNITO_CLIENT_ID
  - COGNITO_CLIENT_SECRET
  - COGNITO_REDIRECT_URI
  - COGNITO_TOKEN_URL
  - Database credentials

## Running the Application
To start the application:
```shell
npm start
   ```

## Usage
Access the public data endpoint at /.
Trigger the OIDC flow by navigating to the Cognito Authorization Endpoint.

## License
This project is licensed under the MIT License.
