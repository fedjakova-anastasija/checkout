const { defineConfig } = require('vite');
const react = require('@vitejs/plugin-react');

module.exports = defineConfig({
  base: '/checkout/',
  plugins: [react()],
  build: {
    outDir: 'build',
  },
});
