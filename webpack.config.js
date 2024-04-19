'use strict';

let path = require('path');

module.exports = {
  mode: 'development', // для разработки
  // mode: 'production', // для завершенного проекта и оптимизации кода
  entry: './src/js/index.js', // для нормального расположения файлов внутри проекта с папками src и dist
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist/js' // для нормального расположения файлов внутри проекта с папками src и dist
  },
  watch: true, // webpack отслеживает изменения файлов и в автоматическом режиме пересобирать проект (можно так же гибко настроить, см. конфигурацию)

  devtool: "source-map", // хранит информацию об исходниках

  module: { // модули
    rules: [ // правила
        {
          test: /\.m?js$/, // объект в котом находим файлы js
          exclude: /(node_modules|bower_components)/, // исключения
          use: { // как и что мы будем использовать
            loader: 'babel-loader', // нужно установить в проект npm i --save-dev babel-loader
            options: {
              presets: [['@babel/preset-env', { // указание какой пресет будет использоваться
                  debug: true,
                  corejs: 3, // доп библиотека для использования только нужных полифилов, нужно установить в проект npm i --save-dev core-js
                  useBuiltIns: "usage" // команда corejs
              }]]
            }
          }
        }
    ]
  } // модули и их настройка
};
