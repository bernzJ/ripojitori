import { TYPES } from '../reducers/notesReducer';

const setNotes = payload => ({
  type: TYPES.GET_NOTES,
  payload
});

export { setNotes };
