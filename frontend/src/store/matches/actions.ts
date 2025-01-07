import { createAsyncThunk } from '@reduxjs/toolkit';
import { name } from './slice';
import { AsyncThunkConfig, MatchDTO, MatchCreateRequestDTO } from '~/common/types/types';

const createMatch = createAsyncThunk<MatchDTO, MatchCreateRequestDTO, AsyncThunkConfig>(
  `${name}/create-match`,
  async (data, { extra: { matchesService } }) => {
    return await matchesService.create(data);
  },
);

const getMatchesByUserId = createAsyncThunk<MatchDTO[], undefined, AsyncThunkConfig>(
  `${name}/get-matches-by-user-id`,
  async (_, { extra: { matchesService } }) => {
    return await matchesService.getByUserId();
  },
);

const acceptMatch = createAsyncThunk<MatchDTO, { id: string }, AsyncThunkConfig>(
  `${name}/accept-match`,
  async ({ id }, { extra: { matchesService } }) => {
    return await matchesService.accept(id);
  },
);

const deleteMatch = createAsyncThunk<boolean, { id: string }, AsyncThunkConfig>(
  `${name}/delete-match`,
  async ({ id }, { extra: { matchesService } }) => {
    return await matchesService.delete(id);
  },
);

export { createMatch, getMatchesByUserId, acceptMatch, deleteMatch };
