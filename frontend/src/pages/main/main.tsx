import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import { AppPath } from '~/common/enums/enums';
import { Button } from '~/components/components';

const Main = (): JSX.Element => {
  const navigate = useNavigate();

  const handleRedirectToProfile = () => {
    navigate(AppPath.PROFILE);
  };

  return (
    <main className={styles['container']}>
      <section className={styles['hero']}>
        <h1 className={styles['hero-title']}>Find the best partner for you.</h1>
        <div className={styles['profile-header-button']}>
          <Button label="Set up my profile" onClick={handleRedirectToProfile} />
        </div>
      </section>
    </main>
  );
};

export { Main };
