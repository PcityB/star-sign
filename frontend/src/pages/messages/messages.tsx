import React, { useCallback, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useWebSocket from '~/hooks/use-websocket/use-websocket';
import { getToken } from '~/utils/auth';
import { useAppDispatch, useAppForm, useAppSelector, useModal } from '~/hooks/hooks';
import { ApiPath, AppPath, DataStatus } from '~/common/enums/enums';
import { actions as messageActions } from '~/store/messages/messages.js';
import { actions as userActions } from '~/store/users/users.js';
import { actions as ideaActions } from '~/store/ideas/ideas.js';
import styles from './styles.module.css';
import { MessageCreateRequestSchema, MessageDTO } from '~/common/types/types';
import { useWatch } from 'react-hook-form';
import { Avatar, IconButton, Input, Loader, Modal } from '~/components/components';
import { UserCard } from '../find-match/libs/components/components';
import { formatDate } from '~/utils/date/date';

const formatTime = (date: Date | undefined) => {
  if (!date) return '';
  return date.toString().split('T')[1].substring(0, 5);
};

const Messages: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const recipientId = Number(searchParams.get('recipientId'));
  if (!recipientId) {
    return <p>Please specify recipient user.</p>;
  }

  const { messages, status: messagesStatus } = useAppSelector(({ messages }) => messages);
  const { user, userStatus: status } = useAppSelector(({ users }) => users);
  const { ideas, status: ideasStatus } = useAppSelector(({ ideas }) => ideas);

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

  const isIdeasLoading = ideasStatus === DataStatus.IDLE || ideasStatus === DataStatus.PENDING;
  const fetchDatingIdeas = () => {
    handleIdeaModalOpen();
    void dispatch(ideaActions.get(recipientId));
  };

  const { isOpened: isModalOpen, onClose: handleModalClose, onOpen: handleModalOpen } = useModal();
  const { isOpened: isIdeaModalOpen, onClose: handleIdeaModalClose, onOpen: handleIdeaModalOpen } = useModal();

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

  let lastMessageDate: string | null = null;

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
        <div className={styles['ideas-button']}>
          <h3>Dating ideas</h3>
          <IconButton iconName="idea" label="Fetch Dating Ideas" iconSize={24} onClick={fetchDatingIdeas} />
        </div>
      </div>

      <div className={styles.messagesContainer}>
        {messages.map((msg) => {
          const messageDate = formatDate(new Date(msg.createdAt || '') || '');
          const isNewDate = messageDate !== lastMessageDate;
          lastMessageDate = messageDate;

          return (
            <React.Fragment key={msg.id}>
              {isNewDate && <div className={styles.dateSeparator}>{messageDate}</div>}
              <div className={`${styles.message} ${msg.senderId === recipientId ? styles.received : styles.sent}`}>
                {msg.content}
                <div className={styles.timestamp}>{formatTime(msg.createdAt)}</div>
              </div>
            </React.Fragment>
          );
        })}
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
      <Modal isOpened={isIdeaModalOpen} onClose={handleIdeaModalClose} title="" isMinWidth={true}>
        {isIdeasLoading ? (
          <div className={styles['ideas-loader']}>
            <Loader />
          </div>
        ) : (
          <div className={styles['ideas-layout']}>
            <div className={styles['ideas-match']}>
              <h2>Astrological Match</h2>
              <div className={styles['ideas-block']}>
                <h3>Compatibility Notes</h3>
                <p>{ideas[0].astrologicalMatch.compatibilityNotes}</p>
              </div>
              <div className={styles['ideas-block']}>
                <h3>Partner 1</h3>
                <p>{ideas[0].astrologicalMatch.user1Details}</p>
              </div>
              <div className={styles['ideas-block']}>
                <h3>Partner 2</h3>
                <p>{ideas[0].astrologicalMatch.user2Details}</p>
              </div>
            </div>
            <div className={styles['ideas-wrapper']}>
              {ideas.map((idea, index) => (
                <div key={index} className={styles['idea-wrapper']}>
                  <h2>{idea.title}</h2>
                  <div className={styles['ideas-block']}>
                    <h3>Date</h3>
                    <p>{idea.date}</p>
                  </div>
                  <div className={styles['ideas-block']}>
                    <h3>Location</h3>
                    <p>{idea.location}</p>
                  </div>
                  <div className={styles['ideas-block']}>
                    <h3>Description</h3>
                    <p>{idea.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export { Messages };
