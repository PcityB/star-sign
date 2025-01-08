import { UserWithMatchScoreDTO } from 'shared/src';
import styles from './styles.module.css';
import { ImageDisplay } from '~/components/components';
import { FaUser } from 'react-icons/fa';
import {
  TbZodiacAries,
  TbZodiacTaurus,
  TbZodiacGemini,
  TbZodiacCancer,
  TbZodiacLeo,
  TbZodiacVirgo,
  TbZodiacLibra,
  TbZodiacScorpio,
  TbZodiacSagittarius,
  TbZodiacCapricorn,
  TbZodiacAquarius,
  TbZodiacPisces,
} from 'react-icons/tb';

type UserCardProps = {
  user: UserWithMatchScoreDTO;
  isCenter: boolean;
  onSingleClick: () => void;
  onDoubleClick: () => void;
};

// Zodiac sign to icon mapping
const zodiacIcons = {
  Aries: <TbZodiacAries size={20} />,
  Taurus: <TbZodiacTaurus size={20} />,
  Gemini: <TbZodiacGemini size={20} />,
  Cancer: <TbZodiacCancer size={20} />,
  Leo: <TbZodiacLeo size={20} />,
  Virgo: <TbZodiacVirgo size={20} />,
  Libra: <TbZodiacLibra size={20} />,
  Scorpio: <TbZodiacScorpio size={20} />,
  Sagittarius: <TbZodiacSagittarius size={20} />,
  Capricorn: <TbZodiacCapricorn size={20} />,
  Aquarius: <TbZodiacAquarius size={20} />,
  Pisces: <TbZodiacPisces size={20} />,
};

const UserCard = ({ user, isCenter, onSingleClick, onDoubleClick }: UserCardProps) => {
  function calculateAge(birthDate: Date): number {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

  const calculateScoreColor = (score: number) => {
    const clampedScore = Math.min(Math.max(score, 0), 40);
    const red = Math.round((1 - clampedScore / 40) * 255);
    const green = Math.round((clampedScore / 40) * 255);
    const alpha = 0.3;
    return `rgba(${red}, ${green}, 0, ${alpha})`;
  };

  const scoreColor = calculateScoreColor(user?.matchScore?.totalScore || 0);
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
      <div className={styles['profile-info']}>
        <div className={styles['profile-main-info']}>
          <h2 className={styles['name']}>
            {user.name}, {calculateAge(new Date(user.birthTimestamp))}
          </h2>
          <h3 className={styles['location']}>
            Location:&nbsp;{user.Preference?.currentCity && user.Preference?.currentCity + ', '}
            {user.Preference?.currentCountry && user.Preference?.currentCountry}
          </h3>
          <h4 className={styles['zodiac-signs']}>
            Sun Sign:&nbsp; {zodiacIcons[user?.PlanetaryPosition?.sunSign]} {user.PlanetaryPosition?.sunSign}
          </h4>
          <h4 className={styles['zodiac-signs']}>
            Moon Sign:&nbsp; {zodiacIcons[user.PlanetaryPosition?.moonSign]} {user.PlanetaryPosition?.moonSign}
          </h4>
        </div>
        <div className={styles['profile-match-info']}>
          <div className={styles['score-wrapper']} style={{ backgroundColor: scoreColor }}>
            <h2 className={styles['score']}>{user?.matchScore?.totalScore || 'N/A'} pts Match</h2>
          </div>
          <div className={styles['score-wrapper-4']}>
            <h2 className={styles['category-score']}>+4 scores: {user?.matchScore?.categoryScores[4]}</h2>
          </div>
          <div className={styles['score-wrapper-4-minus']}>
            <h2 className={styles['category-score']}>-4 scores: {user?.matchScore?.categoryScores[-4]}</h2>
          </div>
        </div>
      </div>
      <div className={styles['goals-wrapper']}>
        {user.Preference?.goals &&
          user.Preference?.goals.map((goal) => <div className={styles['goal']}>{goal.name}</div>)}
      </div>
      <div className={styles['interests-wrapper']}>
        {user.Preference?.interests &&
          user.Preference?.interests.map((interest) => <div className={styles['interest']}>{interest.name}</div>)}
      </div>
    </div>
  );
};

export { UserCard };
