import { deleteCurrentUser, update } from './actions';
import { actions, reducer } from './slice';

const allActions = {
  ...actions,
  update,
  deleteCurrentUser,
};

export { allActions as actions, reducer };
