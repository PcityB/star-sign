import { reducer as authReducer } from './auth/auth';
import { reducer as usersReducer } from './users/users';
import { reducer as attributeReducer } from './attributes/attributes';

const rootReducer = {
  auth: authReducer,
  users: usersReducer,
  attributes: attributeReducer,
};

export { rootReducer };
