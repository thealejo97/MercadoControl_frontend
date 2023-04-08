module.exports = {
  sourceMaps: true,
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['module-resolver', {
      alias: {
        server: {
          port: 3000
        },
        "metro-react-native-babel-preset": `metro-react-native-babel-preset/index.js`,
      },
    }],
  ],
};
