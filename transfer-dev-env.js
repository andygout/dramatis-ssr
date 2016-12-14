const fs = require('fs');
fs.createReadStream('.dev-env').pipe(fs.createWriteStream('.env'));
