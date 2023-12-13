const { getPublicData } = require('../services/queryService');

exports.renderPublicDataPage = (req, res) => {
    console.log('public data works')
    getPublicData((err, publicData) => {
        if (err) {
            return res.status(500).send('Error fetching public data');
        }

        // Render the public data and the sign-in button as HTML
        const htmlContent = `
            <html>
                <head>
                    <title>Public Data</title>
                    <style>
                        /* Add styles for your button here */
                        .signin-button {
                            position: absolute;
                            top: 10px;
                            right: 10px;
                            padding: 10px 20px;
                            background-color: #007bff;
                            color: white;
                            text-decoration: none;
                            border-radius: 5px;
                        }
                        .signin-button:hover {
                            background-color: #0056b3;
                        }
                    </style>
                </head>
                <body>
                    <a href="https://cscie49.auth.us-east-1.amazoncognito.com/oauth2/authorize?client_id=10obrhnincsni076hep1ku17b3&response_type=code&scope=email+openid+phone&redirect_uri=https%3A%2F%2F44.198.175.14%3A3000%2Foauth-callback" class="signin-button">Sign In</a>
                    <h1>Public Data</h1>
                    <pre>${JSON.stringify(publicData, null, 2)}</pre>
                </body>
            </html>`;
        res.send(htmlContent);
    });
};