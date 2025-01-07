import { useAppDispatch, useAppSelector, useModal } from '~/hooks/hooks.js';
import { EditPreferencesForm } from './libs/components/components.js';
import { UserCard } from './libs/components/components.js';
import styles from './styles.module.css';
import { Button, Loader, Modal, PageLayout } from '~/components/components.js';
import { useEffect, useState } from 'react';
import { DataStatus } from '~/common/enums/enums.js';
import { actions as userActions } from '~/store/users/users.js';

const FindMatch = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(({ auth }) => auth);
  const { updateStatus, users, status } = useAppSelector(({ users }) => users);

  const { isOpened: isEditModalOpen, onClose: handleEditModalClose, onOpen: handleEditModalOpen } = useModal();

  const [centerIndex, setCenterIndex] = useState(0);

  useEffect(() => {
    if (status === DataStatus.IDLE) {
      void dispatch(userActions.getAllByPreference());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (updateStatus === DataStatus.SUCCESS) {
      handleEditModalClose();
      void dispatch(userActions.getAllByPreference());
    }
  }, [dispatch, handleEditModalClose, updateStatus]);

  if (!user) {
    return <Loader />;
  }

  if (status === DataStatus.PENDING || status === DataStatus.IDLE) {
    return <Loader />;
  }

  const handleSingleClick = (index: number) => {
    setCenterIndex(index);
  };

  const handleDoubleClick = (user: any) => {
    console.log('Double-clicked:', user);
    // Move the center card to the next one if not at the end of the list
    if (centerIndex + 1 < users.length) {
      setCenterIndex(centerIndex + 1); // Increment the centerIndex
    }
  };

  const getCardClass = (index: number): string => {
    if (index === centerIndex) return styles.centerCard;
    if (index === centerIndex - 1) return styles.leftCard;
    if (index === centerIndex + 1) return styles.rightCard;
    return styles.hiddenCard; // Hide other cards
  };

  return (
    <PageLayout>
      <div className={styles['profile-layout']}>
        <div className={styles['profile-header']}>
          <div className={styles['profile-header-title']}>
            <h1 className={styles['title']}>Find Your Zodiac Match</h1>
          </div>
          <div className={styles['profile-header-button']}>
            <Button label="My Preferences" onClick={handleEditModalOpen} />
          </div>
        </div>
        <div className={styles.slider}>
          {users.length > 0 ? (
            <>
              {users.map((user, index) => {
                const cardClass = getCardClass(index);
                const isClickable = cardClass === styles.rightCard || cardClass === styles.centerCard;

                return (
                  <div
                    key={user.id}
                    className={`${styles.cardWrapper} ${cardClass}`}
                    onClick={isClickable ? () => handleSingleClick(index) : undefined}
                    onDoubleClick={cardClass === styles.centerCard ? () => handleDoubleClick(user) : undefined}
                  >
                    <UserCard
                      user={user}
                      isCenter={index === centerIndex}
                      onSingleClick={() => handleSingleClick(index)}
                      onDoubleClick={() => handleDoubleClick(user)}
                    />
                  </div>
                );
              })}
              {/* Placeholder for the right side if no next card */}
              {centerIndex + 1 >= users.length && (
                <div className={`${styles.cardWrapper} ${styles.rightCard} ${styles.emptyCard}`}>
                  <div className={styles.placeholder}>No more matches</div>
                </div>
              )}
              {/* Placeholder for the left side if at the first card */}
              {centerIndex === 0 && <div className={`${styles.cardWrapper} ${styles.leftCard} ${styles.hiddenCard}`} />}
            </>
          ) : (
            <div>No partners found. Please, update your preferences.</div>
          )}
        </div>
      </div>
      <Modal isOpened={isEditModalOpen} onClose={handleEditModalClose} title="My Preferences">
        <EditPreferencesForm user={user} />
      </Modal>
    </PageLayout>
  );
};

export { FindMatch };
