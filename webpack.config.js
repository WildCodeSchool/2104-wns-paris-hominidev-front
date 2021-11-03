/* eslint-disable @typescript-eslint/no-var-requires */
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'production',
  context: path.resolve(__dirname, 'src'),
  entry: {
    // Main background script
    'static/js/background.js': './parts/background/entry.tsx',
    // Hot-reload script (in background)
    'static/js/hot-reload.js': './parts/background/compFct/hotReload.js',
    // Script content (Overlay)
    'static/js/overlay.js': './parts/scriptContent/entry.jsx',
    // Devtools script
    'static/js/devtools.js': './parts/devtools/entry.js',
    // Action script (popup)
    'static/js/popup.js': './parts/action/entry.tsx',
    // Option script (dashboard)
    'static/js/option.js': './parts/option/entry.tsx',
    // All of the "chunks" to extract and place in common file for faster loading of common libraries between pages
    'static/js/common.js': ['react', 'react-dom'],
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          compilerOptions: {
            noEmit: false,
          },
        },
      },
      {
        test: /\.s?[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
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
    path: path.resolve(__dirname, 'build'),
    filename: '[name]',
  },
  devtool: 'eval-source-map',
  devServer: {
    writeToDisk: true,
    disableHostCheck: true,
    https: false,
    host: '0.0.0.0',
    public: 'localhost:8080',
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: '../public', to: '' }],
    }),
  ],
};
