const path = require('path');
const glob = require('glob');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const files = [];
const handlers = glob.sync('./src/handlers/*.ts')
  .map(f => f.split('.')[0]) //remove extension
  .map(f => f.split(path.sep).pop()); //get file name

handlers.forEach((handler) => {
  glob.sync(`./src/${handler}/**/*.ts`)
    .map(f => path.join(__dirname, f))
    .forEach(f => files.push(f));
});

module.exports = {
	context: __dirname,
  entry: files.concat([path.join(__dirname, './src/index.ts')]),
  /*devtool: 'inline-source-map',*/
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: { allowTsInNodeModules: true }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    plugins: [new TsconfigPathsPlugin({
      configFile: './tsconfig.json',
      extensions: ['.ts', '.js']
    })]
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