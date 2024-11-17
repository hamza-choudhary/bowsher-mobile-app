module.exports = {
  root: true,
  extends: ['@react-native', 'plugin:react/recommended'],
  rules: {
    'react/react-in-jsx-scope': 'off', //suppress import react from react warning
  },
};
