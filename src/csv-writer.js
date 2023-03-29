const fs = require('fs');
const path = require('path');
const moment = require('moment');

const csvPath = path.join(__dirname, moment().format('DDMMYYYY') + '_verge.csv');
// console.log(csvPath);
module.exports = function writeCsv(data) {
  return new Promise((resolve, reject) => {
    const stream = fs.createWriteStream(csvPath);

    stream.once('open', () => {
      stream.write('id, URL, headline, author, date\n');

      data.forEach((article, i) => {
        
        stream.write(`${i + 1}, ${article.link}, "${article.headline}", ${article.author}, ${article.date}\n`);
      });

      stream.end();
      resolve();
    });

    stream.on('error', err => {
      console.log(err);
      reject(err);
    });
  });
};
