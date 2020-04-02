import { createAliasedAction } from 'electron-redux';

import { getTestAsJSON, saveTestAsJSON } from './helpers/test';

const TYPES = {
  ALIAS_LOAD_TEST: 'ALIAS_LOAD_TEST',
  ALIAS_SAVE_TEST: 'ALIAS_SAVE_TEST'
};

const loadTest = createAliasedAction(TYPES.ALIAS_LOAD_TEST, () =>
  getTestAsJSON()
);

const saveTest = createAliasedAction(TYPES.ALIAS_SAVE_TEST, () =>
  saveTestAsJSON()
);

export { TYPES, loadTest, saveTest };
