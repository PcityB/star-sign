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

const getMatchPartnerById = createAsyncThunk<UserWithMatchScoreDTO, number, AsyncThunkConfig>(
  `${name}/get-match-partner-by-id`,
  async (partnerId, { extra: { usersService } }) => {
    return await usersService.getMatchPartnerById(partnerId);
  },
);

export { update, deleteCurrentUser, getAllByPreference, getMatchPartnerById };
