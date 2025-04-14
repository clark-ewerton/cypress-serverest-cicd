// generate-index.js
const fs = require('fs');

const browsers = ['chrome', 'edge'];
const reportsDir = './public';

// HTML Template
const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Cypress Reports</title>
  <style>
    body { font-family: Arial; margin: 20px; }
    h1 { color: #333; }
    .browser { margin: 10px; padding: 10px; border: 1px solid #ddd; }
    a { color: #0066cc; }
  </style>
</head>
<body>
  <h1>Cypress Reports</h1>
  ${browsers.map(browser => `
    <div class="browser">
      <h2>${browser.toUpperCase()}</h2>
      <a href="/${browser}/report.html" target="_blank">Ver Relatório Completo</a><br>
      <a href="/${browser}/videos/" target="_blank">Vídeos</a> | 
      <a href="/${browser}/screenshots/" target="_blank">Screenshots</a>
    </div>
  `).join('')}
  <p>Updated: ${new Date().toLocaleString()}</p>
</body>
</html>
`;

// Save the file
fs.writeFileSync(`${reportsDir}/index.html`, html);
console.log('✅ index.html generated!');
