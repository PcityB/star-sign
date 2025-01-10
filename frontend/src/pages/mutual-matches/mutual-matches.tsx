import { useAppDispatch, useAppSelector } from '~/hooks/hooks.js';
import { UserCard } from './components/components.js';
import styles from './styles.module.css';
import { Loader, PageLayout } from '~/components/components.js';
import { useEffect } from 'react';
import { DataStatus } from '~/common/enums/enums.js';
import { actions as matchActions } from '~/store/matches/matches.js';

const MutualMatches = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(({ auth }) => auth);
  const { matches, status } = useAppSelector(({ matches }) => matches);

  useEffect(() => {
    if (status === DataStatus.IDLE) {
      void dispatch(matchActions.getMatchesByUserId());
    }
  }, [dispatch, status]);

  if (!user) {
    return <Loader />;
  }

  if (status === DataStatus.PENDING || status === DataStatus.IDLE) {
    return <Loader />;
  }

  const filteredMatches = matches
    .filter((match) => match.isAccepted)
    .map((match) => ({
      user: match.userId1 === user.id ? match.user2 : match.user1,
      synastryScore: match.synastryScore,
    }));

  return (
    <PageLayout>
      <div className={styles['profile-layout']}>
        <div className={styles['profile-header']}>
          <div className={styles['profile-header-title']}>
            <h1 className={styles['title']}>Mutual Matches</h1>
          </div>
        </div>
        <div className={styles['user-cards']}>
          {filteredMatches.length ? (
            <>
              {filteredMatches.map(({ user, synastryScore }, index) => (
                <div key={user.id || index} className={styles.cardWrapper}>
                  <UserCard user={user} matchScore={synastryScore} />
                </div>
              ))}
            </>
          ) : (
            <div>No mutual matches found. Try better!</div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export { MutualMatches };
