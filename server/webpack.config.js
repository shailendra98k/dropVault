const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './index.js', // Entry point of your ExpressJS app
  target: 'node', // Tells Webpack that this is for Node.js environment
  externals: [nodeExternals()], // Exclude node_modules from the bundle
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js', // Output file name
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Transpile all .js files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
