const { getPublicData } = require('../services/queryService');
const htmlHeadContent = require('../utilities/htmlHeadContent');

exports.renderPublicDataPage = (req, res) => {
    getPublicData((err, publicData) => {
        if (err) {
            return res.status(500).send('Error fetching public data');
        }

        // Function to generate table rows for given data
        const generateTableRows = (data) => {
            return data.map(obj => `
                <tr>
                    ${Object.values(obj).map(val => `<td>${val || ''}</td>`).join('')}
                </tr>
            `).join('');
        };

        // Function to generate entire table for given data
        const generateTable = (data) => {
            if (data.length === 0) {
                return '<p>No data available.</p>';
            }

            const tableHeaders = Object.keys(data[0]).map(key => `<th>${key}</th>`).join('');
            const tableRows = generateTableRows(data);

            return `
                <table>
                    <tr>${tableHeaders}</tr>
                    ${tableRows}
                </table>
            `;
        };

        // Generate the HTML content for public data
        const htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
                ${htmlHeadContent}
                <body>
                    <h1>Chandra Observation Search</h1>
                    <h2>Public Data</h2>
                    ${generateTable(publicData)}
                    <a href="https://cscie49.auth.us-east-1.amazoncognito.com/oauth2/authorize?client_id=10obrhnincsni076hep1ku17b3&response_type=code&scope=email+openid+phone&redirect_uri=https%3A%2F%2F44.198.175.14%3A3000%2Foauth-callback" class="signin-button">Sign In</a>
                </body>
            </html>`;

        res.send(htmlContent);
    });
};
