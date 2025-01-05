import { createSlice } from '@reduxjs/toolkit';
import { deleteCurrentUser, update } from './actions';
import { ValueOf } from '~/common/types/types';
import { DataStatus } from '~/common/enums/enums';
import { notifyError, notifySuccess } from '~/utils/notification/notification';

export interface UsersState {
  updateStatus: ValueOf<typeof DataStatus>;
  deleteStatus: ValueOf<typeof DataStatus>;
  error: { code: string | number | undefined; message: string | undefined };
}

const initialState: UsersState = {
  updateStatus: DataStatus.IDLE,
  deleteStatus: DataStatus.IDLE,
  error: { code: undefined, message: undefined },
};

const { reducer, actions, name } = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(update.pending, (state) => {
        state.updateStatus = DataStatus.PENDING;
      })
      .addCase(update.fulfilled, (state) => {
        state.updateStatus = DataStatus.SUCCESS;
        notifySuccess('Profile updated successfully.');
      })
      .addCase(update.rejected, (state, action) => {
        state.updateStatus = DataStatus.ERROR;
        state.error = {
          code: action.error.code,
          message: action.error.message,
        };
        notifyError(action.error.message || 'Failed to update user');
      });

    builder.addCase(deleteCurrentUser.pending, (state) => {
      state.deleteStatus = DataStatus.PENDING;
    });
    builder.addCase(deleteCurrentUser.fulfilled, (state) => {
      state.deleteStatus = DataStatus.SUCCESS;
    });
    builder.addCase(deleteCurrentUser.rejected, (state) => {
      state.deleteStatus = DataStatus.ERROR;
    });
  },
});

export { reducer, name, actions };
