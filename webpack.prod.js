const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');
const path = require('path');

module.exports = [
    {
        entry: {
            'vue-advanced-popover': './src/index.js',
        },
        module: {
            rules: [
                {test: /\.js$/, use: 'babel-loader'},
                {test: /\.vue$/, use: 'vue-loader'},
                {test: /\.css$/, use: ['style-loader', 'css-loader']},
            ]
        },
        plugins: [
            new VueLoaderPlugin(),
        ],
        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
                '@': path.join(__dirname, '.', 'src'),
            }
        },
        output: {
            filename: '[name].min.js'
        }
    },
    {
        entry: {
            'docs': './docs/src/index.js',
        },
        module: {
            rules: [
                {test: /\.js$/, use: 'babel-loader'},
                {test: /\.vue$/, use: 'vue-loader'},
                {test: /\.css$/, use: ['style-loader', 'css-loader']},
                {test: /\.s(c|a)ss$/, use: ['style-loader', 'css-loader', 'sass-loader']},
            ]
        },
        plugins: [
            new VueLoaderPlugin(),
            new VuetifyLoaderPlugin(),
            new HtmlWebpackPlugin({
                inject: true,
                hash: true,
                template: './docs/src/index.html',
            }),
        ],
        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
                '@': path.join(__dirname, '.', 'src'),
            }
        },
        output: {
            path: path.resolve(__dirname, './docs'),
            filename: 'dist/[name].min.js'
        }
    },
];
