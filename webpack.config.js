const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

function config() {
  return {
    entry: './src/scripts/index.ts',
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].[hash].js',
    },
    plugins: [
      new HtmlPlugin({
        template: 'src/index.html',
      }),
      new ExtractTextPlugin("styles.css"),
    ],
    module: {
      rules: [
        {
          test: /\.(tsx|ts)?$/,
          use: [
            {
              loader: 'ts-loader',
            }
          ]
        },
        {
          test: /\.(styl)$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: true
                }
              },
            ]
          })
        },
        {
          test: /\.(png|jpg|svg|woff)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'fonts/[name]-[hash].[ext]',
              }
            }
          ],
        }
      ]
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: path.resolve(__dirname, 'dist'),
      port: 4000
    }
  };
}

module.exports = () =>  config();
