const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const ExtractTextPlugin=require("extract-text-webpack-plugin");
const createVersion=require("./createVersion");

const version=createVersion();
const lessExtract = new ExtractTextPlugin(version+'/[name].css');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    //publicPath: '/dist/',
    filename: version+'/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,        
        use: ["style-loader","css-loader"]
      },      
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          },
          postcss: [require('postcss-cssnext')()],
          extractCSS: lessExtract.extract({            
            use: ["less-loader","css-loader"],
            fallback: "vue-style-loader"
          })
          
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-extract-loader',
        options: {
          name:version+'/[name].[ext]',
          relativePath:version
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  plugins:[
      lessExtract,
      new HtmlWebpackPlugin({
        template:"index.html"
      })
  ],
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
    proxy:{
      "/api/":{
        target:"http://localhost:9000/"
      }
    }
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
};

