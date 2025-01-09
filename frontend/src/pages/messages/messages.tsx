import React, { useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useWebSocket from '~/hooks/use-websocket/use-websocket';
import { getToken } from '~/utils/auth';
import { useAppDispatch, useAppForm, useAppSelector } from '~/hooks/hooks';
import { ApiPath } from '~/common/enums/enums';
import { actions as messageActions } from '~/store/messages/messages.js';
import styles from './styles.module.css';
import { MessageCreateRequestSchema, MessageDTO } from '~/common/types/types';
import { useWatch } from 'react-hook-form';
import { IconButton, Input } from '~/components/components';

const Messages: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const recipientId = Number(searchParams.get('recipientId'));

  const { messages } = useAppSelector(({ messages }) => messages);
  const sendMessage = useWebSocket(ApiPath.WS_API_URL, getToken() || '');

  const { control, errors, handleSubmit, isDirty, handleValueSet } = useAppForm<MessageDTO>({
    defaultValues: {
      senderId: 1,
      recipientId,
      content: '',
    },
    validationSchema: MessageCreateRequestSchema,
  });

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit(async (formData: MessageDTO) => {
        if (recipientId) {
          sendMessage(recipientId, formData.content.trim());
          handleValueSet('content', '');
        }
      })(event_);
    },
    [dispatch, handleSubmit],
  );

  useEffect(() => {
    if (recipientId) {
      void dispatch(messageActions.getAllBySenderAndRecipient(recipientId));
    }
  }, [dispatch, recipientId]);

  const contentValue = useWatch({
    control,
    defaultValue: '',
    name: 'content',
  });
  const isContentCounterShown = !errors['content']?.message;

  return (
    <div className={styles.chatContainer}>
      <h2 className={styles.header}>Chat</h2>

      <div className={styles.messagesContainer}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`${styles.message} ${msg.senderId === recipientId ? styles.received : styles.sent}`}
          >
            {msg.content}
          </div>
        ))}
      </div>
      <form className={styles['form-wrapper']} onSubmit={handleFormSubmit}>
        <div className={styles['inputs-wrapper']}>
          <Input control={control} errors={errors} label="Message Content" isLabelHidden name="content" rowsCount={1} />
          {isContentCounterShown && (
            <span className={styles['description-counter']}>
              {contentValue?.length || 0}/{1000}
            </span>
          )}
        </div>
        <div className={styles['form-button']}>
          <IconButton type="submit" isDisabled={!isDirty} iconName="send" label="Send Message" iconSize={24} />
        </div>
      </form>
    </div>
  );
};

export { Messages };
