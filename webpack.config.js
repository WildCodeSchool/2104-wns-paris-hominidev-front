/* eslint-disable @typescript-eslint/no-var-requires */
const CopyPlugin = require("copy-webpack-plugin");
const path =  require('path');

module.exports = {
   mode: "production",
   context: path.resolve(__dirname, "src"),
   entry: {
      // Background script
      "static/js/background.js": "./background/script.tsx",
      // Hot-reload script
      "static/js/hot-reload.js": "./hot-reload/script.js",
      // Overlay script
      "static/js/overlay.js": "./index.jsx",
      // Devtools script
      "static/js/devtools.js": "./devtools/script.js",
      // Popup script
      "static/js/popup.js": "./popup/script.tsx",
      // Dashboard script
      "static/js/dashboard.js": "./dashboard/script.tsx",
      // All of the "chunks" to extract and place in common file for faster loading of common libraries between pages
      "static/js/common.js":  [ "react", "react-dom" ]
   },
   module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            compilerOptions: {
               "noEmit": false
            }
         },
        },
        {
            test: /\.s?[ac]ss$/i,
            use: [
               // Creates `style` nodes from JS strings
               "style-loader",
               // Translates CSS into CommonJS
               "css-loader",
               // Compiles Sass to CSS
               "sass-loader",
            ]
         },
         {
            test: /\.(png|jp(e*)g|svg|gif)$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: 'images/[hash]-[name].[ext]',
                },
              },
            ],
          },
      ],
    },
   resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
   output: {
      path: path.resolve(__dirname, "build"),
      filename: "[name]"
   },
   devServer: {
      writeToDisk: true,
      disableHostCheck: true,
      host: '127.0.0.1', 
      port: 8080,
      https:false,
      public:'127.0.0.1:8080'
    },
   plugins: [
      new CopyPlugin({
         patterns: [
            { from: "../public", to: "" },
         ],
      }),
   ]
};