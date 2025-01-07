import { createAsyncThunk } from '@reduxjs/toolkit';
import { name } from './slice';
import { AsyncThunkConfig, UserPatchRequestDTO, UserWithMatchScoreDTO } from '~/common/types/types';
import { actions as authActions } from '~/store/auth/auth';

const update = createAsyncThunk<void, { id: string; data: UserPatchRequestDTO }, AsyncThunkConfig>(
  `${name}/update`,
  async ({ id, data }, { dispatch, extra: { usersService } }) => {
    await usersService.update(id, data);
    setTimeout(async () => {
      await dispatch(authActions.fetchAuthenticatedUser());
    }, 100);
  },
);

const deleteCurrentUser = createAsyncThunk<void, undefined, AsyncThunkConfig>(
  `${name}/delete-current-user`,
  async (_, { dispatch, extra: { usersService } }) => {
    await usersService.deleteCurrentUser();
    await dispatch(authActions.fetchAuthenticatedUser());
    void dispatch(authActions.signOut());
  },
);

const getAllByPreference = createAsyncThunk<UserWithMatchScoreDTO[], undefined, AsyncThunkConfig>(
  `${name}/get-all-by-preference`,
  async (_, { extra: { usersService } }) => {
    return await usersService.getAllByPreference();
  },
);

export { update, deleteCurrentUser, getAllByPreference };
