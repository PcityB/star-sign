import { getAllBySenderAndRecipient } from './actions';
import { actions, reducer } from './slice';

const allActions = {
  ...actions,
  getAllBySenderAndRecipient,
};

export { allActions as actions, reducer };
