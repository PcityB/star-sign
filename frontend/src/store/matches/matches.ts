import { createMatch, getMatchesByUserId, acceptMatch, deleteMatch } from './actions';
import { actions, reducer } from './slice';

const allActions = {
  ...actions,
  createMatch,
  getMatchesByUserId,
  acceptMatch,
  deleteMatch,
};

export { allActions as actions, reducer };
