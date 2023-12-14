
// JWT utility functions
const jwksClient = require('jwks-rsa');

// Configuration for jwksClient
const client = jwksClient({
  jwksUri: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_uPczcyKxN/.well-known/jwks.json'
});

// getKey function used for JWT token verification
exports.getKey = (header, callback) => {
  client.getSigningKey(header.kid, function(err, key) {
    if (err) {
      callback(err, null);
    } else {
      const signingKey = key.publicKey || key.rsaPublicKey;
      callback(null, signingKey);
    }
  });
};
