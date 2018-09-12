const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
// const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');

module.exports = {
    /*入口文件模块路径*/
    entry: ['babel-polyfill','./src/main.js'],
    output: {
        /*出口文件模块目录,必须绝对路径*/
        path: path.join(__dirname, 'dist'),
        /*出口文件文件名*/
        filename: 'bundle.js'
    },
    devServer: {
        open: true,
        //配置webpack-dev-server的www目录, 就是打包后的目录
        contentBase: './',
        port: 8889,
        //启用热更新
        hot: true

    },
    plugins: [
        new htmlWebpackPlugin({
            //内存中生成的名字
            filename: 'index.html',
            template: path.join(__dirname, './index.html'),
            //是否压缩
            minify: {
                removeAttributeQuotes: false
            }
        }),
        new VueLoaderPlugin(),
        //启用热更新
        new webpack.HotModuleReplacementPlugin()
    ],
    //排除打包项,key: 包名 , value: 导出的接口名
    externals: {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios'
    },
    module: {
      /*规则*/
      rules: [
        {
          /*匹配.css文件,当匹配时使用指定加载器*/
            /*npm install --save-dev style-loader css-loader*/
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        //less ,npm install --save-dev less-loader less
        {
          test: /\.less$/,
          use: [{
              loader: "style-loader" // creates style nodes from JS strings
          }, {
              loader: "css-loader" // translates CSS into CommonJS
          }, {
              loader: "less-loader" // compiles Less to CSS
          }]
        },
          //匹配图片文件 npm install --save-dev url-loader file-loader
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
              'url-loader?limit=10240&name=[hash:8]-[name].[ext]'  //参数跟地址栏参数一样,limit 是图片大小,单位byte , 如果小于limit,进行base64编码, name=[name].[ext] 保持原有文件名
          ]
        },
          //匹配字体
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
              'url-loader'
          ]
        },

          // babel(es6转es5) npm install -D babel-loader babel-core babel-preset-env babel-preset-stage-0
          //默认只转换语法,需要babel-polyfill来转换es6的api
          //减小体积,去除重复代码 npm i -D babel-plugin-transform-runtime npm i -D babel-runtime
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: [
               'babel-loader'
          ]
        },
          //vue loader ,vue-template-compiler
          // npm i -D vue-loader vue-template-compiler
          {
              test: /\.vue$/,
              use: [
                  'vue-loader'
              ]
          },
      ]
    },
    resolve: {
        //修改导包时候的包路径
        alias: {
            // "vue$": "vue/dist/vue.js"
        }
    }

}