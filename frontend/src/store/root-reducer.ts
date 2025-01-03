import { reducer as authReducer } from './auth/auth';
import { reducer as usersReducer } from './users/users';

const rootReducer = {
  auth: authReducer,
  users: usersReducer,
};

export { rootReducer };
