const path = require('path');
const glob = require('glob');

const files = glob.sync('./src/routes/**/*.ts')
.map(f => path.join(__dirname, f));

module.exports = {
	context: __dirname,
  entry: files.concat([path.join(__dirname, './src/index.ts')]),
  /*devtool: 'inline-source-map',*/
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/
    }]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
    library: {
      type: 'module',
    },
  },
  experiments: {
    outputModule: true,
  },
  mode: process.env.NODE_ENV || 'development',
};