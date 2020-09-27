const HtmlWebpackPlugin = require('html-webpack-plugin');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');

module.exports = {
    entry: './docs/index.js',
    module: {
        rules: [
            {test: /\.js$/, use: 'babel-loader'},
            {test: /\.vue$/, use: 'vue-loader'},
            {test: /\.css$/, use: ['style-loader', 'css-loader']},
            {test: /\.s(c|a)ss$/, use: ['style-loader', 'css-loader', 'sass-loader']},
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({template: './index.html'}),
        new VueLoaderPlugin(),
        new VuetifyLoaderPlugin(),
    ],
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.join(__dirname, '.', 'docs'),
        }
    },
};
