var path = require('path');
var webpack = require('webpack');
module.exports = {
    entry: {
        index:'./src/component/img-uploader.vue'
    },
    output: {
        path: path.resolve(__dirname, '../lib'),
        filename: '[name].js',
        library:'ct-adc-img-uploader',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        'scss': 'vue-style-loader!css-loader!sass-loader',
                        'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                    }
                }
            }
        ]
    },
    resolve: {
        modules:[path.resolve(__dirname, 'src/js/component'),path.resolve(__dirname, 'src/js/module'),'node_modules'],
        extensions: ['.js', '.json','.vue','.css'],
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    },
    externals: {
        'ct-utility': {
            commonjs: 'ct-utility',
            commonjs2: 'ct-utility',
            root: 'ct-utility',
            amd: 'ct-utility'
        }
    }
};