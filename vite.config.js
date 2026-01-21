export default {
  build: {
    manifest: true,
    rollupOptions: {
      input: './src/main.js',
    },
    outDir: 'static/bundle',
    assetsDir: '',
  },

  publicDir: false,
  clearScreen: false,
};
