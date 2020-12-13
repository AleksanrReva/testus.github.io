const path = require('path'); // подключаем path к конфигу вебпак
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // подключили к проекту плагин
const HtmlWebpackPlugin = require('html-webpack-plugin'); // подключили плагин
const WebpackMd5Hash = require('webpack-md5-hash');

module.exports = { // module.exports — это синтаксис экспорта в Node.js 
  entry: { main: './src/index.js' }, // указали первое место куда заглянет webpack — файл index.js в папке src
  output: { // указали в какой файл будет собирться весь js и дали ему имя 
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js' // после установки md5-hash, до того filename: 'main.js'
  },

  module: {
    rules: [{ // тут описываются правила
      test: /\.js$/, // регулярное выражение, которое ищет все js файлы
      use: { loader: "babel-loader" }, // весь js обрабатывается пакетом babel-loader
      exclude: /node_modules/ // исключаем папку node_modules
      },
      {
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'] // приминяем установленные пакеты. 'postcss-loader' добавили после установки плагинов для CSS
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({ // вызов функции
      filename: 'style.[contenthash].css'
    }),
    new HtmlWebpackPlugin({
      inject: false, // стили не нужно прописывать внутри тегов
      // после установки md5-hash запись hash: true, для страницы нужно считать хеш, — удаляем
      template: './src/index.html', // откуда брать образец для сравнения с текущим видом проекта
      filename: 'index.html' // имя выходного файла, который окажется в dist после сборки
    })
  ]
};