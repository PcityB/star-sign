import styles from './styles.module.css';

const Loader = (): JSX.Element => (
  <div className={styles['loader-wrapper']}>
      <div className={styles["pulse"]}></div>
  </div>
);

export { Loader };
