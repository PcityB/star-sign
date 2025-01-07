import { createSlice } from '@reduxjs/toolkit';
import { createMatch, getMatchesByUserId, acceptMatch, deleteMatch } from './actions';
import { MatchDTO, ValueOf } from '~/common/types/types';
import { DataStatus } from '~/common/enums/enums';
import { notifyError, notifySuccess } from '~/utils/notification/notification';

export interface MatchesState {
  status: ValueOf<typeof DataStatus>;
  matches: MatchDTO[];
  createStatus: ValueOf<typeof DataStatus>;
  acceptStatus: ValueOf<typeof DataStatus>;
  deleteStatus: ValueOf<typeof DataStatus>;
  error: { code: string | number | undefined; message: string | undefined };
}

const initialState: MatchesState = {
  status: DataStatus.IDLE,
  matches: [],
  createStatus: DataStatus.IDLE,
  acceptStatus: DataStatus.IDLE,
  deleteStatus: DataStatus.IDLE,
  error: { code: undefined, message: undefined },
};

const { reducer, actions, name } = createSlice({
  name: 'matches',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle createMatch
      .addCase(createMatch.pending, (state) => {
        state.createStatus = DataStatus.PENDING;
      })
      .addCase(createMatch.fulfilled, (state, action) => {
        state.createStatus = DataStatus.SUCCESS;
        state.matches.push(action.payload);
        notifySuccess('Match created successfully.');
      })
      .addCase(createMatch.rejected, (state, action) => {
        state.createStatus = DataStatus.ERROR;
        state.error = {
          code: action.error.code,
          message: action.error.message,
        };
        notifyError(action.error.message || 'Failed to create match');
      })

      // Handle getMatchesByUserId
      .addCase(getMatchesByUserId.pending, (state) => {
        state.status = DataStatus.PENDING;
      })
      .addCase(getMatchesByUserId.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCESS;
        state.matches = action.payload;
      })
      .addCase(getMatchesByUserId.rejected, (state, action) => {
        state.status = DataStatus.ERROR;
        state.error = {
          code: action.error.code,
          message: action.error.message,
        };
      })

      // Handle acceptMatch
      .addCase(acceptMatch.pending, (state) => {
        state.acceptStatus = DataStatus.PENDING;
      })
      .addCase(acceptMatch.fulfilled, (state, action) => {
        state.acceptStatus = DataStatus.SUCCESS;
        const index = state.matches.findIndex((match) => match.id === action.payload.id);
        if (index !== -1) {
          state.matches[index] = action.payload;
        }
        notifySuccess('Match accepted successfully.');
      })
      .addCase(acceptMatch.rejected, (state, action) => {
        state.acceptStatus = DataStatus.ERROR;
        state.error = {
          code: action.error.code,
          message: action.error.message,
        };
        notifyError(action.error.message || 'Failed to accept match');
      })

      // Handle deleteMatch
      .addCase(deleteMatch.pending, (state) => {
        state.deleteStatus = DataStatus.PENDING;
      })
      .addCase(deleteMatch.fulfilled, (state, action) => {
        state.deleteStatus = DataStatus.SUCCESS;
        state.matches = state.matches.filter((match) => match.id !== +action.meta.arg.id);
        notifySuccess('Match deleted successfully.');
      })
      .addCase(deleteMatch.rejected, (state, action) => {
        state.deleteStatus = DataStatus.ERROR;
        state.error = {
          code: action.error.code,
          message: action.error.message,
        };
        notifyError(action.error.message || 'Failed to delete match');
      });
  },
});

export { reducer, name, actions };
