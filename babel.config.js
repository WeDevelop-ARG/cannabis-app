module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    'module:react-native-dotenv'
  ],
  plugins: [
    [
      'babel-plugin-root-import',
      {
        rootPathSuffix: 'src/',
        rootPathPrefix: '~/'
      }
    ],
    [
      'babel-plugin-inline-import',
      {
        extensions: ['.svg']
      }
    ]
  ]
}
