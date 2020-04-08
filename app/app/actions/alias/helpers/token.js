import path from 'path';
import * as fse from 'fs-extra';
import getAppDataPath from 'appdata-path';
import { setLoading, setToken, setSaved } from '../../token';

const getTokenJsonPath = () => {
  let appFolderPath = getAppDataPath('client-database');
  appFolderPath = path.resolve(appFolderPath, 'token.json');
  return fse.ensureFile(appFolderPath).then(() => appFolderPath);
};

// @TODO: dispatch into error message.
const getTokenAsJSON = () => async dispatch => {
  try {
    const filePath = await getTokenJsonPath();
    const dataJson = await fse.readJson(filePath);
    dispatch(setToken(dataJson));
  } catch (e) {
    // @TODO: dispatch into error message.
    return { error: true };
  } finally {
    dispatch(setLoading(false));
  }
};
// @TODO: dispatch into error message.
const saveTokenAsJSON = token => async dispatch => {
  try {
    dispatch(setLoading(true));
    dispatch(setToken(token));
    const filePath = await getTokenJsonPath();
    await fse.writeJSON(filePath, token);
    dispatch(setSaved(true));
  } catch (e) {
    // @TODO: dispatch into error message.
    return { error: true };
  } finally {
    dispatch(setLoading(false));
  }
};
export { getTokenAsJSON, saveTokenAsJSON };
