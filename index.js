const scrape = require('./scraper');
const writeCsv = require('./csv-writer');
const writeSqlite = require('./src/sqlite-writer');

module.exports = async function run() {
    const articles = await scrape();
    await writeCsv(articles);
    await writeSqlite(articles);
};
