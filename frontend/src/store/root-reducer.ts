import { reducer as authReducer } from './auth/auth';
import { reducer as usersReducer } from './users/users';
import { reducer as attributeReducer } from './attributes/attributes';
import { reducer as matchReducer } from './matches/matches';
import { reducer as preferenceReducer } from './preferences/preferences';
import { reducer as messageReducer } from './messages/messages';
import { reducer as ideaReducer } from './ideas/ideas';

const rootReducer = {
  auth: authReducer,
  users: usersReducer,
  attributes: attributeReducer,
  matches: matchReducer,
  preference: preferenceReducer,
  messages: messageReducer,
  ideas: ideaReducer,
};

export { rootReducer };
