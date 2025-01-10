import { createSlice } from '@reduxjs/toolkit';
import { get } from './actions';
import { DatingIdea, ValueOf } from '~/common/types/types';
import { DataStatus } from '~/common/enums/enums';
import { notifyError } from '~/utils/notification/notification';

export interface AttributesState {
  ideas: DatingIdea[];
  status: ValueOf<typeof DataStatus>;
  error: { code: string | number | undefined; message: string | undefined };
}

const initialState: AttributesState = {
  ideas: [],
  status: DataStatus.IDLE,
  error: { code: undefined, message: undefined },
};

const { reducer, actions, name } = createSlice({
  name: 'ideas',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(get.pending, (state) => {
        state.status = DataStatus.PENDING;
      })
      .addCase(get.fulfilled, (state, action) => {
        state.ideas = action.payload;
        state.status = DataStatus.SUCCESS;
      })
      .addCase(get.rejected, (state, action) => {
        state.status = DataStatus.ERROR;
        state.error = {
          code: action.error.code,
          message: action.error.message,
        };
        notifyError(action.error.message || 'Failed to fetch categories');
      });
  },
});

export { reducer, name, actions };
