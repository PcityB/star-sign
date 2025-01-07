import { createAsyncThunk } from '@reduxjs/toolkit';
import { name } from './slice';
import { AsyncThunkConfig, PreferenceCreateRequestDTO } from '~/common/types/types';
import { actions as authActions } from '~/store/auth/auth';

const update = createAsyncThunk<void, { data: PreferenceCreateRequestDTO }, AsyncThunkConfig>(
  `${name}/update`,
  async ({ data }, { dispatch, extra: { preferencesService } }) => {
    await preferencesService.update(data);
    setTimeout(async () => {
      await dispatch(authActions.fetchAuthenticatedUser());
    }, 100);
  },
);

export { update };
