const { requestCognitoToken } = require('../services/cognitoTokenService');
const { verifyToken } = require('../services/tokenVerificationService');
const { getAllFromFinalProjectTable } = require('../services/queryService');
const { processData } = require('../utilities/dataProcessingUtil');
const { formatResponse } = require('../utilities/responseFormattingUtil');
const { isUserInGroup } = require('../utilities/cognitoUtil');

exports.handleOauthCallback = (req, res) => {
  const code = req.query.code; // the code we receive from Cognito as a query parameter
  console.log('Received code:', code); // Log the received code

  // Request Cognito token
  requestCognitoToken(code, (tokenError, tokenData) => {
    if (tokenError) {
      console.error('Error fetching token from Cognito:', tokenError);
      return res.status(500).send('An error occurred during authentication.');
    }

    console.log('Token data received:', tokenData);

    // Verify the ID token
    const idToken = tokenData.id_token;
    verifyToken(idToken, (verifyError, decoded) => {
      if (verifyError) {
        console.error('Error verifying ID token:', verifyError);
        return res.status(500).send('An error occurred during token verification.');
      }

      console.log('Decoded token:', decoded); // Log the decoded token

      // Fetch all data and then filter based on group membership
      getAllFromFinalProjectTable((queryError, queryResults) => {
        if (queryError) {
          console.error('Error executing SQL query:', queryError);
          return res.status(500).send('An error occurred during data retrieval.');
        }

        // Process the data into public and proprietary
        const { proprietaryData, publicData } = processData(queryResults);

        // Check for group membership and format response accordingly
        let htmlResponse;
        if (isUserInGroup(decoded, 'Cognito_PI_Team')) {
          htmlResponse = formatResponse(proprietaryData, publicData); // Assuming formatResponse handles both types of data
        } else {
          htmlResponse = formatResponse([], publicData); // Only public data for non-group members
        }

        res.send(htmlResponse);
      });
    });
  });
};
