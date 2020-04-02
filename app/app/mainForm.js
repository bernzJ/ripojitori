/* eslint-disable */
import { app, BrowserWindow, ipcMain } from 'electron';
import { loadTest } from './actions/alias/test';

let mainWindow = null;

const createMainForm = store => {

  mainWindow = new BrowserWindow({
    uid: 'main',
    transparent: true,
    frame: false,
    show: false,
    width: 1495,
    height: 880,
    webPreferences: {
      nodeIntegration: true
    }
  });

  store.dispatch(loadTest());
  mainWindow.openDevTools();

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
  });

  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });
  return mainWindow;
};

export { createMainForm };
