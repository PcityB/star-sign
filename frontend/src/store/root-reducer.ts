import { reducer as authReducer } from './auth/auth';
import { reducer as usersReducer } from './users/users';
import { reducer as attributeReducer } from './attributes/attributes';
import { reducer as matchReducer } from './matches/matches';
import { reducer as preferenceReducer } from './preferences/preferences';

const rootReducer = {
  auth: authReducer,
  users: usersReducer,
  attributes: attributeReducer,
  matchReducer,
  preferenceReducer,
};

export { rootReducer };
