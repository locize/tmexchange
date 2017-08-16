const fs = require('fs');
const path = require('path');

module.exports = {
  example: {
    js: require('./example.json'),
    tmx: fs.readFileSync(path.join(__dirname, 'example.tmx')).toString().replace(/\n$/, '')
  },
  example_no_ns: {
    js: require('./example_no_ns.json'),
    tmx: fs.readFileSync(path.join(__dirname, 'example_no_ns.tmx')).toString().replace(/\n$/, '')
  },
  example_multi: {
    js: require('./example_multi.json'),
    tmx: fs.readFileSync(path.join(__dirname, 'example_multi.tmx')).toString().replace(/\n$/, '')
  }
};
