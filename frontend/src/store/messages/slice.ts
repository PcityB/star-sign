import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MessageDTO, ValueOf } from '~/common/types/types';
import { getAllBySenderAndRecipient } from './actions';
import { DataStatus } from '~/common/enums/enums';
import { notifyError } from '~/utils/notification/notification';

type MessagesState = {
  messages: MessageDTO[];
  status: ValueOf<typeof DataStatus>;
  error: { code: string | number | undefined; message: string | undefined };
};

const initialState: MessagesState = {
  messages: [],
  status: DataStatus.IDLE,
  error: { code: undefined, message: undefined },
};

const { reducer, actions, name } = createSlice({
  name: 'matches',
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<MessageDTO>) {
      state.messages.push(action.payload);
    },
    setMessages(state, action: PayloadAction<MessageDTO[]>) {
      state.messages = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBySenderAndRecipient.pending, (state) => {
        state.status = DataStatus.PENDING;
      })
      .addCase(getAllBySenderAndRecipient.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCESS;
        state.messages = action.payload;
      })
      .addCase(getAllBySenderAndRecipient.rejected, (state, action) => {
        state.status = DataStatus.ERROR;
        state.error = {
          code: action.error.code,
          message: action.error.message,
        };
        notifyError(action.error.message || 'Failed to fetch messages.');
      });
  },
});

export { reducer, name, actions };
export const { addMessage, setMessages } = actions;
