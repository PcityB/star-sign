import { getAllGoals, getAllInterests } from './actions';
import { actions, reducer } from './slice';

const allActions = {
  ...actions,
  getAllGoals,
  getAllInterests,
};

export { allActions as actions, reducer };
