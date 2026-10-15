import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import puppeteer from 'puppeteer-core';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const mdFilePath = path.resolve('src/Day1/DAY1-TypeScript.md');
const pdfOutputPath = path.resolve('src/Day1/DAY1-TypeScript.pdf');

async function run() {
  console.log('Reading markdown from:', mdFilePath);
  const markdown = fs.readFileSync(mdFilePath, 'utf8');

  console.log('Parsing markdown to HTML...');
  const bodyHtml = marked.parse(markdown);

  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;600&family=Inter:wght@400;500;600;700&display=swap');
  
  @page {
    size: A4;
    margin: 20mm 15mm 20mm 15mm;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 13px;
    line-height: 1.65;
    color: #24292f;
    background-color: #ffffff;
    margin: 0;
    padding: 0;
  }

  h1 {
    color: #0969da;
    border-bottom: 2px solid #eaecef;
    padding-bottom: 0.3em;
    font-size: 24px;
    margin-top: 24px;
    margin-bottom: 16px;
    page-break-after: avoid;
  }

  h2 {
    color: #1f2328;
    border-bottom: 1px solid #d0d7de;
    padding-bottom: 0.3em;
    font-size: 18px;
    margin-top: 24px;
    margin-bottom: 12px;
    page-break-after: avoid;
  }

  h3 {
    color: #24292f;
    font-size: 15px;
    margin-top: 18px;
    margin-bottom: 8px;
    page-break-after: avoid;
  }

  p, li {
    font-size: 13px;
  }

  code {
    font-family: 'Fira Code', Consolas, 'Courier New', monospace;
    font-size: 11.5px;
    background-color: #f6f8fa;
    padding: 0.2em 0.4em;
    border-radius: 4px;
    color: #cf222e;
  }

  pre {
    background-color: #0d1117;
    color: #c9d1d9;
    padding: 14px;
    border-radius: 6px;
    overflow-x: auto;
    font-size: 11.5px;
    line-height: 1.45;
    page-break-inside: avoid;
  }

  pre code {
    background-color: transparent;
    color: inherit;
    padding: 0;
    border-radius: 0;
  }

  table {
    border-collapse: collapse;
    width: 100%;
    margin: 16px 0;
    page-break-inside: avoid;
    font-size: 12px;
  }

  table, th, td {
    border: 1px solid #d0d7de;
  }

  th {
    background-color: #f6f8fa;
    font-weight: 600;
    text-align: left;
    padding: 6px 10px;
  }

  td {
    padding: 6px 10px;
  }

  tr:nth-child(even) {
    background-color: #fcfcfc;
  }

  blockquote {
    margin: 12px 0;
    padding: 4px 12px;
    color: #57606a;
    border-left: 4px solid #0969da;
    background: #f6f8fa;
    border-radius: 0 4px 4px 0;
  }

  hr {
    height: 1px;
    background-color: #d0d7de;
    border: none;
    margin: 24px 0;
  }

  .page-break {
    page-break-before: always;
  }
</style>
</head>
<body>
${bodyHtml}
</body>
</html>`;

  console.log('Launching Chrome via puppeteer-core...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setContent(fullHtml, { waitUntil: 'networkidle0' });

  console.log('Generating PDF...');
  await page.pdf({
    path: pdfOutputPath,
    format: 'A4',
    margin: {
      top: '18mm',
      right: '15mm',
      bottom: '18mm',
      left: '15mm'
    },
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: '<div style="font-size:9px;color:#888;width:100%;text-align:right;padding-right:15mm;">TypeScript Day 1 Study & Interview Guide</div>',
    footerTemplate: '<div style="font-size:9px;color:#888;width:100%;text-align:center;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>'
  });

  await browser.close();
  console.log('PDF generated successfully at:', pdfOutputPath);
}

run().catch((err) => {
  console.error('Failed to generate PDF:', err);
  process.exit(1);
});
