const run = require('./index');

run()
.then(() => console.log('Done'))
.catch(err => console.error(err));