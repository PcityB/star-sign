import { UserWithMatchScoreDTO } from 'shared/src';
import styles from './styles.module.css';
import { ImageDisplay } from '~/components/components';
import { FaUser } from 'react-icons/fa';

type UserCardProps = {
  user: UserWithMatchScoreDTO;
  isCenter: boolean;
  onSingleClick: () => void;
  onDoubleClick: () => void;
};

const UserCard = ({ user, isCenter, onSingleClick, onDoubleClick }: UserCardProps) => {
  const cardStyles = isCenter ? `${styles.card} ${styles.centerCard}` : `${styles.card}`;

  return (
    <div className={cardStyles} onClick={onSingleClick} onDoubleClick={onDoubleClick}>
      <div className={styles['profile-image-wrapper']}>
        {user.photos?.length ? (
          <div className={styles['profile-portfolio']}>
            <ImageDisplay images={user.photos} />
          </div>
        ) : (
          <FaUser />
        )}
      </div>
      <h3>{user.name}</h3>
      <p>Score: {user?.matchScore?.totalScore || 'N/A'}</p>
    </div>
  );
};

export { UserCard };
