import { createAsyncThunk } from '@reduxjs/toolkit';
import { name } from './slice';
import { AsyncThunkConfig, MessageDTO } from '~/common/types/types';

const getAllBySenderAndRecipient = createAsyncThunk<MessageDTO[], number, AsyncThunkConfig>(
  `${name}/get-all-by-sender-and-recipient`,
  async (recipientId, { extra: { messagesService } }) => {
    return await messagesService.getAllBySenderAndRecipient(recipientId);
  },
);

export { getAllBySenderAndRecipient };
