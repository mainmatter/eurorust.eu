export default {
  build: {
    manifest: true,
    rollupOptions: {
      input: './src/main.js',
    },
    outDir: 'static/bundle',
    assetsDir: '',
    minify: process.env.BUILD_MODE === 'production',
  },

  publicDir: false,
  clearScreen: false,
};
