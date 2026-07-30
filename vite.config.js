const { defineConfig } = require('vite');
const react = require('@vitejs/plugin-react');
const fs = require('node:fs');
const path = require('node:path');

function githubPagesSpaFallback() {
  let outDir;

  return {
    name: 'github-pages-spa-fallback',
    configResolved(config) {
      outDir = config.build.outDir;
    },
    closeBundle() {
      const outputDir = path.resolve(__dirname, outDir);
      const indexFile = path.join(outputDir, 'index.html');
      const notFoundFile = path.join(outputDir, '404.html');

      if (fs.existsSync(indexFile)) {
        fs.copyFileSync(indexFile, notFoundFile);
      }
    },
  };
}

module.exports = defineConfig({
  base: '/checkout/',
  plugins: [react(), githubPagesSpaFallback()],
  build: {
    outDir: 'build',
  },
});
