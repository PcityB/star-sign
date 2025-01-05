import { Button, ConfirmationModal } from '~/components/components.js';
import { useAppDispatch, useModal } from '~/hooks/hooks.js';
import { actions as authActions } from '~/store/auth/auth.js';
import { actions as userActions } from '~/store/users/users.js';

import styles from './styles.module.css';
import { useCallback } from 'react';

const DeleteAccount = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { isOpened, onClose, onOpen } = useModal();

  const handleDeleteClick = useCallback((): void => {
    onOpen();
  }, [onOpen]);

  const handleDeleteConfirm = useCallback(() => {
    void dispatch(userActions.deleteCurrentUser());
    void dispatch(authActions.signOut());
  }, [dispatch]);

  return (
    <div className={styles['profile-delete']}>
      <h2 className={styles['delete-title']}>Delete account</h2>
      <div>
        <Button label="Delete Your Account" onClick={handleDeleteClick} variant="danger" />
      </div>
      <ConfirmationModal
        content="This account will be deleted. This action cannot be undone. Click 'Confirm' to proceed."
        isOpened={isOpened}
        onClose={onClose}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export { DeleteAccount };
