import styles from './styles.module.css';

const Main = (): JSX.Element => {
  return (
    <main className={styles['container']}>
      <section className={styles['hero']}>
        <h1 className={styles['hero-title']}>Find the best partner for you.</h1>
      </section>
    </main>
  );
};

export { Main };
