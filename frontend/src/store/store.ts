import { configureStore } from '@reduxjs/toolkit';
import { auth as authService } from '../services/services';
import { users as usersService } from '../services/services';
import { attributes as attributesService } from '../services/services';
import { matches as matchesService } from '../services/services';
import { preferences as preferencesService } from '../services/services';
import { messages as messagesService } from '../services/services';
import { ideas as ideasService } from '../services/services';
import { rootReducer } from './root-reducer';
import { listenerMiddleware } from './middleware/401';

const extraArgument = {
  authService,
  usersService,
  attributesService,
  matchesService,
  preferencesService,
  messagesService,
  ideasService,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument,
      },
    }).prepend(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, extraArgument };
