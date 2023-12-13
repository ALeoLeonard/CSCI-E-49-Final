
exports.formatResponse = (proprietaryData, publicData) => {
  const htmlMessage = `
    <html>
      <body>
        <h1>Congrats, you can view this data</h1>
        <h2>Proprietary Data:</h2>
        <pre>${JSON.stringify(proprietaryData, null, 2)}</pre>
        <h2>Public Data:</h2>
        <pre>${JSON.stringify(publicData, null, 2)}</pre>
      </body>
    </html>`;
  return htmlMessage;
};
