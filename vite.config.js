export default {
  build: {
    manifest: true,
    rollupOptions: {
      input: {
        '2025': './src/2025/main.js',
        '2026': './src/main.js',
      }
    },
    outDir: 'static/bundle',
    assetsDir: '',
  },

  publicDir: false,
  clearScreen: false,
};
