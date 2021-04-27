const {
    override,
    overrideDevServer,
    addWebpackPlugin,
    disableChunk
 } = require("customize-cra");
 
 const CopyPlugin = require('copy-webpack-plugin');
 
 const multipleEntry = require('react-app-rewire-multiple-entry')([
    {
       // points to the popup entry point
       entry: 'src/popup/index.js',
       template: 'public/popup.html',
       outPath: '/popup.html'
    },
    {
       // points to the options page entry point
       entry: 'src/options/index.js',
       template: 'public/index.html',
       outPath: '/index.html'
    }
 ]);
 
 const devServerConfig = () => config => {
   return {
      ...config,
      // webpackDevService doesn't write the files to desk
      // so we need to tell it to do so so we can load the
      // extension with chrome
      writeToDisk: true,
   }
} 



 const setOutputName = filename => config => {
   config.output = { ...config.output, filename }
   return config
 }

 const copyPlugin = new CopyPlugin({
    patterns: [
       // copy assets
       { from: 'public', to: '' },
       { from: 'src/background.js', to: '' }
    ]
 })

 module.exports = {
    webpack: override(
       setOutputName("pygmalink.js"),
       addWebpackPlugin(
          copyPlugin
       ),
       multipleEntry.addMultiEntry,
       disableChunk(),

    ),
    devServer: overrideDevServer(
       devServerConfig(),
    ),
 
 };


