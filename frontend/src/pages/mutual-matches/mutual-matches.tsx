import { useAppDispatch, useAppSelector } from '~/hooks/hooks.js';
import { UserCard } from './components/components.js';
import styles from './styles.module.css';
import { Loader, PageLayout } from '~/components/components.js';
import { useEffect } from 'react';
import { DataStatus } from '~/common/enums/enums.js';
import { actions as userActions } from '~/store/users/users.js';
import { actions as matchActions } from '~/store/matches/matches.js';

const MutualMatches = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(({ auth }) => auth);
  const { users, status } = useAppSelector(({ users }) => users);

  useEffect(() => {
    if (status === DataStatus.IDLE) {
      void dispatch(matchActions.getMatchesByUserId());
      void dispatch(userActions.getAllByPreference());
    }
  }, [dispatch, status]);

  if (!user) {
    return <Loader />;
  }

  if (status === DataStatus.PENDING || status === DataStatus.IDLE) {
    return <Loader />;
  }

  return (
    <PageLayout>
      <div className={styles['profile-layout']}>
        <div className={styles['profile-header']}>
          <div className={styles['profile-header-title']}>
            <h1 className={styles['title']}>Mutual Matches</h1>
          </div>
        </div>
        <div className={styles['user-cards']}>
          {users.length > 0 ? (
            <>
              {users.map((user) => {
                return (
                  <div key={user.id} className={styles.cardWrapper}>
                    <UserCard user={user} />
                  </div>
                );
              })}
            </>
          ) : (
            <div>No partners found. Please, update your preferences.</div>
          )}
          {users.length > 0 ? (
            <>
              {users.map((user) => {
                return (
                  <div key={user.id} className={styles.cardWrapper}>
                    <UserCard user={user} />
                  </div>
                );
              })}
            </>
          ) : (
            <div>No partners found. Please, update your preferences.</div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export { MutualMatches };
