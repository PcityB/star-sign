import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MessageDTO } from '~/common/types/types';

type ChatState = {
  messages: MessageDTO[];
};

const initialState: ChatState = {
  messages: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<MessageDTO>) {
      state.messages.push(action.payload);
    },
    setMessages(state, action: PayloadAction<MessageDTO[]>) {
      state.messages = action.payload;
    },
  },
});

export const { addMessage, setMessages } = chatSlice.actions;
export default chatSlice.reducer;
