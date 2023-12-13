// config.js
require('dotenv').config();

const cognitoDetails = {
  clientId: process.env.COGNITO_CLIENT_ID,
  clientSecret: process.env.COGNITO_CLIENT_SECRET,
  redirectUri: process.env.COGNITO_REDIRECT_URI,
  tokenUrl: process.env.COGNITO_TOKEN_URL,
};

const dbConnectionDetails = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

module.exports = {
  cognitoDetails,
  dbConnectionDetails,
};