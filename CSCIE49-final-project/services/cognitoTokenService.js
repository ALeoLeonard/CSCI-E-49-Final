const https = require('https');
const querystring = require('querystring');
const { cognitoDetails } = require('../config/config');

// Function to request an OAuth token from Cognito using the authorization code
exports.requestCognitoToken = (code, callback) => {
  // Prepare the data for the POST request
  const postData = querystring.stringify({
    grant_type: 'authorization_code',
    client_id: cognitoDetails.clientId,
    redirect_uri: cognitoDetails.redirectUri,
    code: code
  });

  // Encode client credentials for the Authorization header
  const credentials = Buffer.from(`${cognitoDetails.clientId}:${cognitoDetails.clientSecret}`).toString('base64');
  const authHeader = `Basic ${credentials}`;

  // Set up the options for the HTTPS request
  const requestOptions = {
    method: 'POST',
    hostname: 'cscie49.auth.us-east-1.amazoncognito.com',
    path: '/oauth2/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData),
      'Authorization': authHeader
    }
  };
  console.log('Requesting Cognito token with options:', requestOptions); // Log request options

  // Create and send the HTTPS request to Cognito
  const tokenRequest = https.request(requestOptions, (tokenResponse) => {
    let data = '';
    tokenResponse.on('data', (chunk) => {
      data += chunk; // Collect the data chunks as they come in.
    });
    
    // Once all data has been received, parse the data
    tokenResponse.on('end', () => {
      console.log('Raw token response:', data); // Log raw token response
      if (tokenResponse.statusCode !== 200) {
        // If the response status code is not OK, return an error
        return callback(new Error(`Received status code ${tokenResponse.statusCode}`), null);
      }
      try {
        // Parse the JSON response from Cognito
        const parsedData = JSON.parse(data);
        callback(null, parsedData);
      } catch (error) {
        // Handle JSON parsing errors
        callback(new Error('Error parsing JSON response from Cognito'), null);
      }
    });
  });

  // Handle request errors (for example, network issues)
  tokenRequest.on('error', (error) => {
    console.error('Token request error:', error);
    callback(new Error('Error requesting token from Cognito'), null);
  });

  // Write the POST data to the request body
  tokenRequest.write(postData);
  tokenRequest.end(); // End the request
};