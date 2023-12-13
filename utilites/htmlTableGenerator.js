function generateTable(data) {
  if (data.length === 0) {
    return '';
  }

  const tableHeaders = Object.keys(data[0]).map(key => `<th>${key}</th>`).join('');
  const tableRows = data.map(obj => `
    <tr>
      ${Object.values(obj).map(val => `<td>${val || ''}</td>`).join('')}
    </tr>
  `).join('');

  return `
    <table>
      <tr>${tableHeaders}</tr>
      ${tableRows}
    </table>
  `;
}

module.exports = { generateTable };
