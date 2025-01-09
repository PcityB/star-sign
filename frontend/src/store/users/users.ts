import { deleteCurrentUser, getAllByPreference, update, getMatchPartnerById } from './actions';
import { actions, reducer } from './slice';

const allActions = {
  ...actions,
  update,
  deleteCurrentUser,
  getAllByPreference,
  getMatchPartnerById
};

export { allActions as actions, reducer };
