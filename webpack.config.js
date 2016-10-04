const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: path.join(__dirname, "frontend"),
  entry: {
      index: './index'
  },

  output: {
    path: 'public',
    filename: path.join('js', '[name].js')
  },

  watch: true,

  watchOptions: {
	   aggregateTimeout: 100
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
  ],

  module: {
    loaders: [{
      test: /\.js$/,
      include: [ path.resolve(__dirname, "frontend") ],
      loader: 'babel-loader?presets[]=es2015&presets[]=react&presets[]=stage-2'
    },
    {
        test: /\.css$/,
        loader: "style-loader!css-loader!autoprefixer-loader",
        exclude: [/node_modules/, /public/]
    },
    {
        test: /\.less$/,
        loader: "style-loader!css-loader!autoprefixer-loader!less",
        exclude: [/node_modules/, /public/]
    }]
  }

}
