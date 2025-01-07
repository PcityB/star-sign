import { createAsyncThunk } from '@reduxjs/toolkit';
import { name } from './slice';
import { AsyncThunkConfig, GoalDTO, InterestDTO } from '~/common/types/types';

const getAllGoals = createAsyncThunk<GoalDTO[], void, AsyncThunkConfig>(
  `${name}/fetchAllGoals`,
  async (_, { extra: { attributesService } }) => {
    return await attributesService.getAllGoals();
  },
);

const getAllInterests = createAsyncThunk<InterestDTO[], void, AsyncThunkConfig>(
  `${name}/fetchAllInterests`,
  async (_, { extra: { attributesService } }) => {
    return await attributesService.getAllInterests();
  },
);

export { getAllGoals, getAllInterests };
