/**
 * Created by tangshanghai on 2016/12/26.
 */
var path = require('path');
var webpack = require('webpack');
module.exports = {
    entry: {
        app:"./src/index.js",
        //vendor:["./src/lib/flv.js","./src/lib/hls.min.js"]
    },
    output: {
        path: path.resolve("./dist"),
        filename: "ColorPickerTSH.js"
    },
    module: {
        loaders: [
            {
                test: /\.js|jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', "stage-0"]
                }
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=4192&name=[path][name].[ext]'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            }
            //,
            //{
            //    test:'./src/lib/flv.min.js',
            //    loader:"imports?flvjs=flvjs,this=>window"
            //}
            //{
            //    // 得到jquery模块的绝对路径
            //    test: '../jquery.js',
            //    // 将jquery绑定为window.jQuery
            //    loader: 'expose?window.jQuery'
            //}

            //{
            //    test: "./src/lib/flv.js",
            //    loader: 'expose?window.flvjs'
            //},
            //{
            //    test: "./src/lib/hls.min.js",
            //    loader: 'expose?Hls'
            //}
        ]
    },
    //plugins: [
    //    new webpack.ProvidePlugin({
    //        $: "jquery",
    //        jQuery: "jquery",
    //        "window.jQuery": "jquery"
    //    })
    //]
    //externals: {
    //    "jquery": "jQuery"
    //}
}