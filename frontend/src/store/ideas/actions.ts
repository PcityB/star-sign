import { createAsyncThunk } from '@reduxjs/toolkit';
import { name } from './slice';
import { AsyncThunkConfig, DatingIdea } from '~/common/types/types';

const get = createAsyncThunk<DatingIdea[], number, AsyncThunkConfig>(
  `${name}/fetch`,
  async (partnerId, { extra: { ideasService } }) => {
    return await ideasService.get(partnerId.toString());
  },
);

export { get };
