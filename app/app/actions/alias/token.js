import { createAliasedAction } from 'electron-redux';

import { getTokenAsJSON, saveTokenAsJSON } from './helpers/token';

const TYPES = {
  ALIAS_LOAD_TOKEN: 'ALIAS_LOAD_TOKEN',
  ALIAS_SAVE_TOKEN: 'ALIAS_SAVE_TOKEN'
};

const loadToken = createAliasedAction(TYPES.ALIAS_LOAD_TOKEN, () =>
  getTokenAsJSON()
);

const saveToken = createAliasedAction(TYPES.ALIAS_SAVE_TOKEN, token =>
  saveTokenAsJSON(token)
);

export { TYPES, loadToken, saveToken };
