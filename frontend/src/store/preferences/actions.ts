import { createAsyncThunk } from '@reduxjs/toolkit';
import { name } from './slice';
import { AsyncThunkConfig, PreferenceCreateRequestDTO } from '~/common/types/types';
import { actions as authActions } from '~/store/auth/auth';
import { actions as usersActions } from '~/store/users/users';

const update = createAsyncThunk<void, { data: PreferenceCreateRequestDTO }, AsyncThunkConfig>(
  `${name}/update`,
  async ({ data }, { dispatch, extra: { preferencesService } }) => {
    await preferencesService.update(data);
    setTimeout(async () => {
      await dispatch(authActions.fetchAuthenticatedUser());
      await dispatch(usersActions.getAllByPreference());
    }, 1000);
  },
);

export { update };
