// Check if the renderer and main bundles are built
import path from 'path';
import chalk from 'chalk';
import fs from 'fs';

function CheckBuildsExist() {
  const mainPath = path.join(__dirname, '..', '..', 'app', 'main.prod.js');
  const mainRendererPath = getRendererPath('main');

  if (!fs.existsSync(mainPath)) {
    throw new Error(
      chalk.whiteBright.bgRed.bold(
        'The main process is not built yet. Build it by running "yarn build-main"'
      )
    );
  }

  if (!fs.existsSync(mainRendererPath)) {
    throw new Error(
      chalk.whiteBright.bgRed.bold(
        'The main renderer process is not built yet. Build it by running "yarn build-renderer"'
      )
    );
  }
}

CheckBuildsExist();

function getRendererPath(name) {
  return path.join(
    __dirname,
    '..',
    '..',
    'app',
    'dist',
    `${name}.renderer.prod.js`
  );
}
