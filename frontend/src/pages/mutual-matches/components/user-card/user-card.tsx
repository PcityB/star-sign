import { UserDTO } from 'shared/src';
import styles from './styles.module.css';
import { IconButton, ImageDisplay } from '~/components/components';
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
import { useNavigate } from 'react-router-dom';
import { AppPath } from '~/common/enums/enums';

type UserCardProps = {
  user: UserDTO;
  matchScore: number;
};

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

const UserCard = ({ user, matchScore }: UserCardProps) => {
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

  const navigate = useNavigate();

  const handleRedirectToMessages = () => {
    navigate(`${AppPath.MESSAGES}?recipientId=${user.id}`);
  };

  const scoreColor = calculateScoreColor(matchScore || 0);

  return (
    <div className={styles.card}>
      <div className={styles['profile-image-wrapper']}>
        {user.photos?.length ? (
          <div className={styles['profile-image']}>
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
            {zodiacIcons[user?.PlanetaryPosition[0].sunSign]} {user.PlanetaryPosition[0].sunSign}
          </h4>
        </div>
        <div className={styles['profile-match-info']}>
          <div className={styles['score-wrapper']} style={{ backgroundColor: scoreColor }}>
            <h2 className={styles['score']}>{matchScore || 'N/A'}</h2>
          </div>
          <IconButton iconName="message" label="To Messages" iconSize={24} onClick={handleRedirectToMessages} />
        </div>
      </div>
    </div>
  );
};

export { UserCard };
