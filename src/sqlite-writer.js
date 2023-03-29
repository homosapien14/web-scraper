const sqlite3 = require('sqlite3').verbose();

module.exports = function writeSqlite(data) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(':memory:');

    db.serialize(() => {
      db.run('CREATE TABLE articles (id INTEGER PRIMARY KEY, url TEXT,headline TEXT, author ;TEXT, date TEXT)');
      const stmt = db.prepare('INSERT INTO articles (url, headline, author, date) VALUES (?, ?, ?, ?)');

      data.forEach(article => {
        stmt.run(article.link, article.headline, article.author, article.date);
      });
    
      stmt.finalize();
    
      db.close(err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  });
};