import { useAppSelector, useModal } from '~/hooks/hooks.js';
import { DeleteAccount, EditUserForm } from './libs/components/components.js';
import styles from './styles.module.css';
import { Button, Loader, Modal, PageLayout, ImageDisplay } from '~/components/components.js';
import { useEffect } from 'react';
import { DataStatus } from '~/common/enums/enums.js';
import { formatDate } from '~/utils/date/date.js';
import { FaUser } from 'react-icons/fa';

const Profile = (): JSX.Element => {
  const { user } = useAppSelector(({ auth }) => auth);
  const { updateStatus } = useAppSelector(({ users }) => users);

  const { isOpened: isEditModalOpen, onClose: handleEditModalClose, onOpen: handleEditModalOpen } = useModal();

  useEffect(() => {
    if (updateStatus === DataStatus.SUCCESS) {
      handleEditModalClose();
    }
  }, [handleEditModalClose, updateStatus]);

  const capitalizeFirstCharacter = (str: string | string[]) =>
    str ? str[0].toUpperCase() + (str.slice(1) as string).toLowerCase() : str;

  function calculateAge(dateOfBirth: string): number {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
  
    let age = today.getFullYear() - birthDate.getFullYear();
  
    const isBirthdayPassed = 
      today.getMonth() > birthDate.getMonth() || 
      (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());
  
    if (!isBirthdayPassed) {
      age--;
    }
  
    return age;
  }

  if (!user) {
    return <Loader />;
  }

  return (
    <PageLayout>
      <div className={styles['profile-layout']}>
        <div className={styles['profile-header']}>
          <h1 className={styles['title']}>My Profile</h1>
          <Button label="Update Profile" onClick={handleEditModalOpen} />
        </div>
        <div className={styles['profile-info']}>
          <div className={styles['profile-image-wrapper']}>
            {user.photos?.length ? (
              <div className={styles['profile-portfolio']}>
                <ImageDisplay images={user.photos} />
              </div>
            ) : (
              <FaUser />
            )}
          </div>
          <div className={styles['profile-text']}>
            <h1>{user.name}</h1>
            <div className={styles['profile-text-block']}>
              <h2>Gender</h2>
              <h3>{user.gender ? capitalizeFirstCharacter(user.gender) : 'Not specified'}</h3>
            </div>
            <div className={styles['profile-text-block']}>
              <h2>Birth date</h2>
              <h3>{user.birthTimestamp ? formatDate(new Date(user.birthTimestamp)) : 'Not specified'}</h3>
            </div>
            <div className={styles['profile-text-block']}>
              <h2>Age</h2>
              <h3>{user.birthTimestamp ? calculateAge(new Date(user.birthTimestamp).toDateString()) + " y. o." : 'Not specified'}</h3>
            </div>
            <div className={styles['profile-text-block']}>
              <h2>Location of birth</h2>
              <h3>{user.birthCountry ? user.birthCity + ", " + user.birthCountry : 'Not specified'}</h3>
            </div>
            <div className={styles['profile-text-block']}>
              <h2>Description</h2>
              <p>{user.description ? user.description : 'Not specified'}</p>
            </div>
            <div className={styles['profile-text-block']}>
              <h2>Account creation date</h2>
              <h3>{formatDate(new Date(user.createdAt))}</h3>
            </div>
          </div>
        </div>
        <div className={styles['divider']} />
        <DeleteAccount />
      </div>
      <Modal isOpened={isEditModalOpen} onClose={handleEditModalClose} title="Update Profile">
        <EditUserForm user={user} />
      </Modal>
    </PageLayout>
  );
};

export { Profile };
