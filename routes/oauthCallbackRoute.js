const express = require('express');
const router = express.Router();
const oauthCallbackController = require('../controllers/oauthCallbackController');
const publicDataController = require('../controllers/publicDataController');

// Define the route for OAuth callback (private data)
router.get('/oauth-callback', oauthCallbackController.handleOauthCallback);

// Displaying public data on root
router.get('/home', publicDataController.renderPublicDataPage);

module.exports = router;