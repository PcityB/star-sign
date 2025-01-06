import { Button, Loader, PageLayout } from '~/components/components';
import styles from './styles.module.css';
import { useAppSelector } from '~/hooks/hooks';
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

// Map zodiac signs to their corresponding icons and styles
const zodiacMap = {
  Aries: { icon: <TbZodiacAries size={120} />, style: styles.aries },
  Taurus: { icon: <TbZodiacTaurus size={120} />, style: styles.taurus },
  Gemini: { icon: <TbZodiacGemini size={120} />, style: styles.gemini },
  Cancer: { icon: <TbZodiacCancer size={120} />, style: styles.cancer },
  Leo: { icon: <TbZodiacLeo size={120} />, style: styles.leo },
  Virgo: { icon: <TbZodiacVirgo size={120} />, style: styles.virgo },
  Libra: { icon: <TbZodiacLibra size={120} />, style: styles.libra },
  Scorpio: { icon: <TbZodiacScorpio size={120} />, style: styles.scorpio },
  Sagittarius: { icon: <TbZodiacSagittarius size={120} />, style: styles.sagittarius },
  Capricorn: { icon: <TbZodiacCapricorn size={120} />, style: styles.capricorn },
  Aquarius: { icon: <TbZodiacAquarius size={120} />, style: styles.aquarius },
  Pisces: { icon: <TbZodiacPisces size={120} />, style: styles.pisces },
};

const zodiacIcons = {
  Pisces: <TbZodiacPisces size={20} />,
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
};

const AstroProfile = (): JSX.Element => {
  const { user } = useAppSelector(({ auth }) => auth);

  if (!user) {
    return <Loader />;
  }

  if (!user.PlanetaryPosition) {
    return (
      <PageLayout>
        <div className={styles['profile-layout']}>
          <div className={styles['profile-header']}>
            <div className={styles['profile-header-title']}>
              <h1 className={styles['title']}>Your Astrological Profile</h1>
            </div>
            <div className={styles['profile-header-button']}>
              <Button label="Update Data" variant="outlined" />
            </div>
          </div>
          <p>No birth date and location specified.</p>
        </div>
      </PageLayout>
    );
  }

  const { sunSign, moonSign, ascendant } = user.PlanetaryPosition;

  const renderCard = (title: string, value: string) => {
    const zodiac = zodiacMap[value];
    return (
      <div className={`${styles.card} ${zodiac?.style}`}>
        <h3 className={styles.cardTitle}>{title}</h3>
        {zodiac?.icon}
        <h2 className={styles.cardValue}>{value}</h2>
      </div>
    );
  };

  const getOrdinalSuffix = (num: number): string => {
    const lastDigit = num % 10;
    const lastTwoDigits = num % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 13) return 'th';
    if (lastDigit === 1) return 'st';
    if (lastDigit === 2) return 'nd';
    if (lastDigit === 3) return 'rd';
    return 'th';
  };

  const renderRow = (celestialBody: string, data: string) => {
    const [rightAscension, house, sign] = data.split(', ');
    const houseWithSuffix = `${house}${getOrdinalSuffix(Number(house))}`; // Add the suffix to the house number

    return (
      <tr className={styles.row}>
        <td className={styles.cell}>{celestialBody}</td>
        <td className={styles.cell}>{Number(rightAscension).toFixed(2)}</td>
        <td className={styles.cell}>{houseWithSuffix}</td>
        <td className={styles.cell}>
          {zodiacIcons[sign]} {sign}
        </td>
      </tr>
    );
  };

  return (
    <PageLayout>
      <div className={styles['profile-layout']}>
        <div className={styles['profile-header']}>
          <div className={styles['profile-header-title']}>
            <h1 className={styles['title']}>Your Astrological Profile</h1>
          </div>
          <div className={styles['profile-header-button']}>
            <Button label="Update Data" variant="outlined" />
          </div>
        </div>
        <div className={styles['profile-cards']}>
          {renderCard('Sun Sign', sunSign)}
          {renderCard('Moon Sign', moonSign)}
          {renderCard('Ascendant', ascendant)}
        </div>
        <div className={styles['planetary-positions']}>
          <h2 className={styles['sub-title']}>Your Planetary Positions</h2>
          <div className={styles['table-container']}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.header}>Celestial Body</th>
                  <th className={styles.header}>Right Ascension</th>
                  <th className={styles.header}>House</th>
                  <th className={styles.header}>Sign</th>
                </tr>
              </thead>
              <tbody>
                {renderRow('Sun', user.PlanetaryPosition.sunPosition)}
                {renderRow('Moon', user.PlanetaryPosition.moonPosition)}
                {renderRow('Mercury', user.PlanetaryPosition.mercury)}
                {renderRow('Venus', user.PlanetaryPosition.venus)}
                {renderRow('Mars', user.PlanetaryPosition.mars)}
                {renderRow('Jupiter', user.PlanetaryPosition.jupiter)}
                {renderRow('Saturn', user.PlanetaryPosition.saturn)}
                {renderRow('Uranus', user.PlanetaryPosition.uranus)}
                {renderRow('Neptune', user.PlanetaryPosition.neptune)}
                {renderRow('Pluto', user.PlanetaryPosition.pluto)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export { AstroProfile };
