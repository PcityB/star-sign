import { useAppDispatch, useAppSelector, useModal } from '~/hooks/hooks.js';
import { EditPreferencesForm } from './libs/components/components.js';
import { UserCard } from './libs/components/components.js';
import styles from './styles.module.css';
import { Button, Loader, Modal, PageLayout } from '~/components/components.js';
import { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { DataStatus } from '~/common/enums/enums.js';
import { actions as userActions } from '~/store/users/users.js';
import { actions as matchActions } from '~/store/matches/matches.js';

const FindMatch = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(({ auth }) => auth);
  const { updateStatus, users, status } = useAppSelector(({ users }) => users);
  const { matches } = useAppSelector(({ matches }) => matches);

  useEffect(() => {
    void dispatch(userActions.getAllByPreference());
    void dispatch(matchActions.getMatchesByUserId());
  }, [dispatch]);

  const { isOpened: isEditModalOpen, onClose: handleEditModalClose, onOpen: handleEditModalOpen } = useModal();

  const [centerIndex, setCenterIndex] = useState();
  const [likedUsers, setLikedUsers] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (updateStatus === DataStatus.SUCCESS) {
      handleEditModalClose();
    }
  }, [dispatch, handleEditModalClose, updateStatus]);

  useEffect(() => {
    if (users && users.length) {
      setCenterIndex(-1);
    }
  }, [users]);

  if (!user) {
    return <Loader />;
  }

  if (status === DataStatus.PENDING || status === DataStatus.IDLE) {
    return <Loader />;
  }

  const handleSingleClick = (index: number) => {
    setCenterIndex(index);
  };

  const handleDoubleClick = (user: any, index: number) => {
    toggleLike(index, user.matchScore.totalScore);
    if (centerIndex + 1 < users.length) {
      setCenterIndex(centerIndex + 1);
    }
  };

  const toggleLike = (index: number, synastryScore: number) => {
    const isLiked = likedUsers[index];
    if (isLiked) {
      const match = matches.find((match) => match.userId1 === user.id && match.userId2 === index && !match.isDeleted);
      if (match) {
        setLikedUsers((prev) => ({ ...prev, [index]: false }));
        void dispatch(matchActions.deleteMatch({ id: match.id.toString() }));
      }
    } else {
      setLikedUsers((prev) => ({ ...prev, [index]: true }));
      void dispatch(matchActions.createMatch({ userId1: user.id, userId2: index, synastryScore }));
    }
  };

  const getCardClass = (index: number): string => {
    if (index === centerIndex) return styles.centerCard;
    if (index === centerIndex - 1) return styles.leftCard;
    if (index === centerIndex + 1) return styles.rightCard;
    return styles.hiddenCard;
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
          {users ? (
            <>
              {users.map((user, index) => {
                const cardClass = getCardClass(index);
                const isLiked = likedUsers[user.id];

                return (
                  <div key={user.id} className={`${styles.cardWrapper} ${cardClass}`}>
                    <div
                      className={`${styles.heartIcon} ${isLiked ? styles.heartLiked : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(user.id, user.matchScore.totalScore);
                      }}
                    >
                      <FaHeart size={24} />
                    </div>
                    <UserCard
                      user={user}
                      isCenter={index === centerIndex}
                      onSingleClick={() => handleSingleClick(index)}
                      onDoubleClick={() => handleDoubleClick(user, user.id)}
                    />
                  </div>
                );
              })}
              {centerIndex + 1 >= users.length && (
                <div className={`${styles.cardWrapper} ${styles.rightCard} ${styles.emptyCard}`}>
                  <div className={styles.placeholder}>No more matches</div>
                </div>
              )}
              {centerIndex === 0 && <div className={`${styles.cardWrapper} ${styles.leftCard} ${styles.hiddenCard}`} />}
            </>
          ) : (
            <div>No partners found. Please, update your preferences or set up profile.</div>
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
