module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    'module:react-native-dotenv',
    '@babel/preset-env', {
      targets: {
        node: 'current'
      }
    }
  ],
  plugins: [
    [
      'babel-plugin-root-import',
      {
        rootPathSuffix: 'src/',
        rootPathPrefix: '~/'
      }
    ]
  ]
}
