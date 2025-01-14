import { useAppDispatch, useAppSelector } from '~/hooks/hooks.js';
import { UserCard } from './components/components.js';
import styles from './styles.module.css';
import { Loader, PageLayout } from '~/components/components.js';
import { useEffect, useState } from 'react';
import { DataStatus } from '~/common/enums/enums.js';
import { actions as matchActions } from '~/store/matches/matches.js';
import { FaHeart } from 'react-icons/fa';

const Matches = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(({ auth }) => auth);
  const { matches, status } = useAppSelector(({ matches }) => matches);

  const [likedUsers, setLikedUsers] = useState<Record<number, boolean>>({});

  useEffect(() => {
    void dispatch(matchActions.getMatchesByUserId());
  }, [dispatch]);

  if (!user) {
    return <Loader />;
  }

  if (status === DataStatus.PENDING || status === DataStatus.IDLE) {
    return <Loader />;
  }

  const filteredMatches = matches
    .filter((match) => !match.isAccepted)
    .filter((match) => match.userId1 !== user.id)
    .map((match) => ({
      user: match.userId1 === user.id ? match.user2 : match.user1,
      synastryScore: match.synastryScore,
    }));

  const handleDoubleClick = (user: any, index: number) => {
    toggleLike(index, user.synastryScore);
  };

  const toggleLike = (index: number, synastryScore: number) => {
    const isLiked = likedUsers[index];
    if (isLiked) {
      const match = matches.find((match) => match.userId2 === user.id && match.userId1 === index && !match.isDeleted);
      if (match) {
        setLikedUsers((prev) => ({ ...prev, [index]: false }));
        void dispatch(matchActions.deleteMatch({ id: match.id.toString() }));
      }
    } else {
      setLikedUsers((prev) => ({ ...prev, [index]: true }));
      void dispatch(matchActions.createMatch({ userId1: user.id, userId2: index, synastryScore }));
    }
  };

  return (
    <PageLayout>
      <div className={styles['profile-layout']}>
        <div className={styles['profile-header']}>
          <div className={styles['profile-header-title']}>
            <h1 className={styles['title']}>My Matches</h1>
            <p>Find out who liked you</p>
          </div>
        </div>
        <div className={styles['user-cards']}>
          {filteredMatches.length ? (
            <>
              {filteredMatches.map(({ user, synastryScore }, index) => {
                const isLiked = likedUsers[user.id];
                return (
                  <div key={user?.id || index} className={styles.cardWrapper}>
                    <div
                      className={`${styles.heartIcon} ${isLiked ? styles.heartLiked : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(user.id, synastryScore);
                      }}
                    >
                      <FaHeart size={24} />
                    </div>
                    <UserCard
                      user={user}
                      matchScore={synastryScore}
                      onDoubleClick={() => handleDoubleClick(user, user.id)}
                    />
                  </div>
                );
              })}
            </>
          ) : (
            <div>No matches found. Try better!</div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export { Matches };
