import path from 'path';
import * as fse from 'fs-extra';
import { setLoading, setTest } from '../../test';

const getAppFolderPath = () =>
  process.env.APPDATA ||
  (process.platform === 'darwin'
    ? `${process.env.HOME}/Library/Preferences`
    : `${process.env.HOME}/.local/share`);

const getTestJsonPath = () => {
  let appFolderPath = getAppFolderPath();
  appFolderPath = path.resolve(appFolderPath, '/Ripojitori/test.json');
  return fse.ensureFile(appFolderPath).then(() => appFolderPath);
};

// @TODO: dispatch into error message.
const getTestAsJSON = () => async (dispatch, getState) => {
  try {
    const filePath = await getTestJsonPath();
    const dataJson = await fse.readJson(filePath);
    dispatch(setTest(dataJson));
  } catch (e) {
    // @TODO: dispatch into error message.
    return { error: true };
  } finally {
    dispatch(setLoading(false));
  }
};
// @TODO: dispatch into error message.
const saveTestAsJSON = () => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));
    const {
      testReducer: { test }
    } = getState();
    const filePath = await getTestJsonPath();
    await fse.writeJSON(filePath, test);
  } catch (e) {
    // @TODO: dispatch into error message.
    return { error: true };
  } finally {
    dispatch(setLoading(false));
  }
};
export { getTestAsJSON, saveTestAsJSON };
