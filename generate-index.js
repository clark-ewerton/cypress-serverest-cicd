// generate-index.js
const fs = require('fs');

const browsers = ['chrome', 'edge'];
const reportsDir = './public';
const base = 'cypress-serverest-cicd';
const options = {
  timeZone: 'America/Sao_Paulo',
  hour12: false,
  dateStyle: 'short',
  timeStyle: 'medium'
};

const updateTime = new Date().toLocaleString('pt-BR', options);

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
      <a href="/${base}/${browser}/report.html" target="_blank">See Complete Report</a><br>
    </div>
  `).join('')}
  <p>Updated: ${updateTime} (Brasil Time Zone)</p>
</body>
</html>
`;

// Save the file
fs.writeFileSync(`${reportsDir}/index.html`, html);
console.log('✅ index.html generated!');
