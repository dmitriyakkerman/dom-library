let path = require('path');
let webpack = require('webpack');

module.exports = {
  watch: true,
  entry: {
    'dom-util': './src/js/dom-util.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: '[name].min.js'
  }
};