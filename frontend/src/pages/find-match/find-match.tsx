import { useAppSelector, useModal } from '~/hooks/hooks.js';
import { EditPreferencesForm } from './libs/components/components.js';
import styles from './styles.module.css';
import { Button, Loader, Modal, PageLayout } from '~/components/components.js';
import { useEffect } from 'react';
import { DataStatus } from '~/common/enums/enums.js';

const FindMatch = (): JSX.Element => {
  const { user } = useAppSelector(({ auth }) => auth);
  const { updateStatus } = useAppSelector(({ users }) => users);

  const { isOpened: isEditModalOpen, onClose: handleEditModalClose, onOpen: handleEditModalOpen } = useModal();

  useEffect(() => {
    if (updateStatus === DataStatus.SUCCESS) {
      handleEditModalClose();
    }
  }, [handleEditModalClose, updateStatus]);

  if (!user) {
    return <Loader />;
  }

  return (
    <PageLayout>
      <div className={styles['profile-layout']}>
        <div className={styles['profile-header']}>
          <div className={styles['profile-header-title']}>
            <h1 className={styles['title']}>Find Your Zodiac Match</h1>
          </div>
          <div className={styles['profile-header-button']}>
            <Button label="My Preferences" onClick={handleEditModalOpen} />
          </div>
        </div>
      </div>
      <Modal isOpened={isEditModalOpen} onClose={handleEditModalClose} title="My Preferences">
        <EditPreferencesForm user={user} />
      </Modal>
    </PageLayout>
  );
};

export { FindMatch };
