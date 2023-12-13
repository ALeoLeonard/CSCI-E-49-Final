const jwt = require('jsonwebtoken');
const { getKey } = require('../utilities/jwtUtils');

exports.verifyToken = (idToken, callback) => {
  jwt.verify(idToken, getKey, { algorithms: ['RS256'] }, (error, decoded) => {
    if (error) {
      console.error('Error in token verification:', error);
      callback(error, null);
    } else {
      callback(null, decoded);
    }
  });
};