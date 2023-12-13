require('dotenv').config();

const https = require('https');
const fs = require('fs');
const helmet = require('helmet'); // Import Helmet
const app = require('./app'); // Express app

// Helmet configuration for security headers, including HSTS
// app.use(helmet());

// SSL configuration
const options = {
  key: fs.readFileSync('/etc/ssl/private/server.key'),
  cert: fs.readFileSync('/etc/ssl/certs/server.crt')
};

// Starting the HTTPS server with Helmet and HSTS
const port = 3000;
https.createServer(options, app).listen(port, () => {
  console.log(`HTTPS Server is running on port ${port}`);
});