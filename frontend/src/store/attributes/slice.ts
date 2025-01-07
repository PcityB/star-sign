import { createSlice } from '@reduxjs/toolkit';
import { getAllGoals, getAllInterests } from './actions';
import { GoalDTO, InterestDTO, ValueOf } from '~/common/types/types';
import { DataStatus } from '~/common/enums/enums';
import { notifyError } from '~/utils/notification/notification';

export interface AttributesState {
  goals: GoalDTO[];
  interests: InterestDTO[];
  goalsStatus: ValueOf<typeof DataStatus>;
  interestsStatus: ValueOf<typeof DataStatus>;
  error: { code: string | number | undefined; message: string | undefined };
}

const initialState: AttributesState = {
  goals: [],
  interests: [],
  goalsStatus: DataStatus.IDLE,
  interestsStatus: DataStatus.IDLE,
  error: { code: undefined, message: undefined },
};

const { reducer, actions, name } = createSlice({
  name: 'attributes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllGoals.pending, (state) => {
        state.goalsStatus = DataStatus.PENDING;
      })
      .addCase(getAllGoals.fulfilled, (state, action) => {
        state.goals = action.payload;
        state.goalsStatus = DataStatus.SUCCESS;
      })
      .addCase(getAllGoals.rejected, (state, action) => {
        state.goalsStatus = DataStatus.ERROR;
        state.error = {
          code: action.error.code,
          message: action.error.message,
        };
        notifyError(action.error.message || 'Failed to fetch categories');
      })

      .addCase(getAllInterests.pending, (state) => {
        state.interestsStatus = DataStatus.PENDING;
      })
      .addCase(getAllInterests.fulfilled, (state, action) => {
        state.interests = action.payload;
        state.interestsStatus = DataStatus.SUCCESS;
      })
      .addCase(getAllInterests.rejected, (state, action) => {
        state.interestsStatus = DataStatus.ERROR;
        state.error = {
          code: action.error.code,
          message: action.error.message,
        };
        notifyError(action.error.message || 'Failed to fetch subcategories');
      });
  },
});

export { reducer, name, actions };
