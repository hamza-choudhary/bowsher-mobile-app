module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        extensions: [
          '.ios.js',
          '.android.js',
          '.ios.jsx',
          '.android.jsx',
          '.js',
          '.jsx',
          '.json',
          '.ts',
          '.tsx',
        ],
        root: ['./src'],
        alias: {
          '@assets': './src/assets',
          '@styles': './src/styles',
          '@utils': './src/utils',
          '@screens': './src/screens',
          '@navigation': './src/navigation',
          '@common': './src/common',
          '@helpers': './src/helpers',
          '@constants': './src/constants',
        },
      },
    ],
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
