import { get } from './actions';
import { actions, reducer } from './slice';

const allActions = {
  ...actions,
  get,
};

export { allActions as actions, reducer };
