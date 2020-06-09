const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'webpage-markers.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
