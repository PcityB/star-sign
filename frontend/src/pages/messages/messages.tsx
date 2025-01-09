import React, { useCallback, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useWebSocket from '~/hooks/use-websocket/use-websocket';
import { getToken } from '~/utils/auth';
import { useAppDispatch, useAppForm, useAppSelector, useModal } from '~/hooks/hooks';
import { ApiPath, AppPath, DataStatus } from '~/common/enums/enums';
import { actions as messageActions } from '~/store/messages/messages.js';
import { actions as userActions } from '~/store/users/users.js';
import styles from './styles.module.css';
import { MessageCreateRequestSchema, MessageDTO } from '~/common/types/types';
import { useWatch } from 'react-hook-form';
import { Avatar, IconButton, Input, Loader, Modal } from '~/components/components';
import { UserCard } from '../find-match/libs/components/components';

const Messages: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const recipientId = Number(searchParams.get('recipientId'));
  if (!recipientId) {
    return <p>Please specify recipient user.</p>;
  }

  const { messages, status: messagesStatus } = useAppSelector(({ messages }) => messages);
  const { user, userStatus: status } = useAppSelector(({ users }) => users);
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
      void dispatch(userActions.getMatchPartnerById(recipientId));
      void dispatch(messageActions.getAllBySenderAndRecipient(recipientId));
    }
  }, [dispatch, recipientId]);

  const navigate = useNavigate();

  const handleRedirectToMatches = () => {
    navigate(AppPath.MUTUAL_MATCHES);
  };

  const { isOpened: isModalOpen, onClose: handleModalClose, onOpen: handleModalOpen } = useModal();

  const contentValue = useWatch({
    control,
    defaultValue: '',
    name: 'content',
  });
  const isContentCounterShown = !errors['content']?.message;

  if (
    status === DataStatus.IDLE ||
    status === DataStatus.PENDING ||
    messagesStatus === DataStatus.IDLE ||
    messagesStatus === DataStatus.PENDING
  ) {
    return <Loader />;
  }

  if ((!user && status === DataStatus.SUCCESS) || status === DataStatus.ERROR) {
    return <p>You aren't allowed to sent messages to this user.</p>;
  }

  return (
    <div className={styles.chatContainer}>
      <div className={styles.header}>
        <div className={styles['back-button']}>
          <IconButton
            iconName="leftArrow"
            label="Back to Mutual Matches"
            iconSize={24}
            onClick={handleRedirectToMatches}
          />
        </div>
        <div className={styles['name-avatar']}>
          <button className={styles['avatar']} onClick={handleModalOpen}>
            <Avatar
              name={user?.name || ''}
              imageUrl={user?.photos && user?.photos.length > 0 ? user?.photos[0] : undefined}
            />
          </button>
          <h2>{user?.name || ''}</h2>
        </div>
      </div>

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
      <Modal isOpened={isModalOpen} onClose={handleModalClose} title="" isMinWidth={false}>
        <UserCard user={user} isCenter onSingleClick={() => {}} onDoubleClick={() => {}} />
      </Modal>
    </div>
  );
};

export { Messages };
