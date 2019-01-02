const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
require("@babel/polyfill")
module.exports = {
    mode: 'development',
    //入口文件相对于启动webpack文件所在的目录
    entry: {
        app: ['@babel/polyfill', './src/scripts/app.js']
    },

    // 出口
    output: {
        path: path.resolve(__dirname, '../dev'),
        filename: '[name].js'
    },
    module: {
        //样式编译有顺序，从下到上
        rules: [{
            test: /\.(scss|css)$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }]
        }, {
            test: /\.(png|jpg|gif)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    // limit 定义是否做base64编码的边界值
                    limit: 8192,
                    name: '[name].[ext]',
                    outputPath: 'assets/images'
                }
            }]
        }, 
        {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/plugin-transform-runtime']
                }
            }
        },
        {
            test: /\.html$/,
            use: {
              loader: 'string-loader'
            }
        }]
    },
    //插件：plugins,增强webpackd的能力
    plugins:[
      //copy html并且导入入口文件
      new HtmlWebpackPlugin({
          filename:'index.html',
          //默认在package.json层找index.html
          template:'./src/index.html'
      }),
      //拷贝文件
      new CopyWebpackPlugin([{
          from:path.resolve(__dirname,'../public'),
          to:path.resolve(__dirname,"../dev/public")
      }])
    ],

    devServer: {
        contentBase: path.join(__dirname, "../dev"),
        compress: true,
        port: 9000,
        host: 'localhost',
        proxy: {
            "/api": {
              target: "http://localhost:3000",
              changeOrigin: true
            }
          }
    }
}