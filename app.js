require('dotenv').config();

const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const csurf = require('csurf');
const cookieParser = require('cookie-parser'); // Needed for csurf
const oauthCallbackRoute = require('./routes/oauthCallbackRoute');

const app = express();

// Apply Helmet to all requests with CSP
app.use(helmet({
  contentSecurityPolicy: false
  // {
  //   directives: {
  //     defaultSrc: ["'self'"], // Customize this based on your needs
  //     // Add other directives as needed
  //   }
  // }
}));

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// app.set('trust proxy', 1);

// Rate limiting setup
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// Apply rate limiting to all requests
// app.use(limiter);

// // Setup for CSRF protection
// app.use(cookieParser()); // Required for 'csurf'
// app.use(csurf({ cookie: true })); // CSRF protection using cookies

// Parsing JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define the route for the root path '/'
app.get('/home', publicDataController.renderPublicDataPage);

// Using the OAuth callback route
app.get('/oauth-callback', oauthCallbackRoute);

module.exports = app;