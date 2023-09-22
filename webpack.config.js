const path = require('path');
const glob = require('glob');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const files = glob.sync('./src/routes/**/*.ts')
.map(f => path.join(__dirname, f));

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