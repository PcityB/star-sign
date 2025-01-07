import { deleteCurrentUser, getAllByPreference, update } from './actions';
import { actions, reducer } from './slice';

const allActions = {
  ...actions,
  update,
  deleteCurrentUser,
  getAllByPreference,
};

export { allActions as actions, reducer };
