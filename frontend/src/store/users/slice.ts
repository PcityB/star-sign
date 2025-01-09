import { createSlice } from '@reduxjs/toolkit';
import { deleteCurrentUser, getAllByPreference, getMatchPartnerById, update } from './actions';
import { UserWithMatchScoreDTO, ValueOf } from '~/common/types/types';
import { DataStatus } from '~/common/enums/enums';
import { notifyError, notifySuccess } from '~/utils/notification/notification';

export interface UsersState {
  status: ValueOf<typeof DataStatus>;
  userStatus: ValueOf<typeof DataStatus>;
  users: UserWithMatchScoreDTO[];
  user: UserWithMatchScoreDTO | null;
  updateStatus: ValueOf<typeof DataStatus>;
  deleteStatus: ValueOf<typeof DataStatus>;
  error: { code: string | number | undefined; message: string | undefined };
}

const initialState: UsersState = {
  user: null,
  users: [],
  userStatus: DataStatus.IDLE,
  status: DataStatus.IDLE,
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

    builder.addCase(getAllByPreference.pending, (state) => {
      state.status = DataStatus.PENDING;
    });
    builder.addCase(getAllByPreference.fulfilled, (state, action) => {
      state.status = DataStatus.SUCCESS;
      state.users = action.payload;
    });
    builder.addCase(getAllByPreference.rejected, (state, action) => {
      state.status = DataStatus.ERROR;
      state.error = {
        code: action.error.code,
        message: action.error.message,
      };
    });
    builder.addCase(getMatchPartnerById.pending, (state) => {
      state.userStatus = DataStatus.PENDING;
    });
    builder.addCase(getMatchPartnerById.fulfilled, (state, action) => {
      state.userStatus = DataStatus.SUCCESS;
      state.user = action.payload;
    });
    builder.addCase(getMatchPartnerById.rejected, (state, action) => {
      state.userStatus = DataStatus.ERROR;
      state.error = {
        code: action.error.code,
        message: action.error.message,
      };
    });
  },
});

export { reducer, name, actions };
