const htmlHeadContent = require('./htmlHeadContent'); // Ensure this path is correct for your project structure

exports.formatResponse = (proprietaryData, publicData) => {
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

  // HTML message combined with dynamic data and modular head content
  const htmlMessage = `
    <!DOCTYPE html>
    <html lang="en">
      ${htmlHeadContent}
      <body>
        <h1>Chandra Observation</h1>
        ${proprietaryData.length > 0 ? `
          <h2>Proprietary Data</h2>
          ${generateTable(proprietaryData)}
        ` : '<h2>No Proprietary Data Available</h2>'}
        ${publicData.length > 0 ? `
          <h2>Public Data</h2>
          ${generateTable(publicData)}
        ` : '<h2>No Public Data Available</h2>'}
       <a href="https://cscie49.auth.us-east-1.amazoncognito.com/logout?client_id=10obrhnincsni076hep1ku17b3&logout_uri=https://44.198.175.14:3000/" class="signout-button"">Sign out</a>
        <script>
          function signOut() {
            // Implement sign-out functionality here
          }
        </script>
      </body>
    </html>`;
  
  return htmlMessage;
};
