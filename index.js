const axios = require('axios');
const cheerio = require('cheerio');

const domain = process.argv[2];
const url = `https://www.pagesinventory.com/search/?s=${domain}`;

axios.get(url)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    const tableRows = $('table tr');
var count = 1
    tableRows.each((i, element) => {
      if (i > 0) {
        const rowColumns = $(element).find('td');
        const columnText = $(rowColumns[0]).find('a').text();
        if (columnText) {
        console.log(count + ". " + columnText);
        count++
        } else {
            console.log("Subdomain tidak terdeteksi!");
        }
      }  else {
            console.log("Subdomain tidak terdeteksi!");
        }
    });
  })
  .catch(error => {
    console.log(error);
  });
