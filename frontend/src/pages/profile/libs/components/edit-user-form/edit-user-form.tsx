import { actions as usersActions } from '~/store/users/users.js';
import styles from './styles.module.css';
import { useAppDispatch, useAppForm } from '~/hooks/hooks';
import { UserDTO, UserPatchRequestDTO, UserPatchRequestSchema } from 'shared/src';
import { useCallback } from 'react';
import { Button, ImageInput, Input } from '~/components/components';

type Properties = {
  user: UserDTO;
};

const EditUserForm = ({ user }: Properties): JSX.Element => {
  const { name, photos } = user;
  const dispatch = useAppDispatch();

  const { control, errors, handleSubmit, isDirty } = useAppForm<UserPatchRequestDTO>({
    defaultValues: {
      name,
      photos,
    },
    validationSchema: UserPatchRequestSchema,
  });

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit(async (formData: UserPatchRequestDTO) => {
        void dispatch(usersActions.update({ id: user.id.toString(), data: formData }));
      })(event_);
    },
    [dispatch, handleSubmit, user.id],
  );

  return (
    <form className={styles['form-wrapper']} onSubmit={handleFormSubmit}>
      <div className={styles['inputs-wrapper']}>
        <div className={styles['name-inputs']}>
          <Input autoComplete="username" control={control} errors={errors} label="Name" name="name" />
        </div>
        <ImageInput
          placeholder="Upload portfolio photos"
          name="photos"
          label="Photos"
          control={control}
          errors={errors}
          maxImages={10}
        />
      </div>

      <div>
        <Button isDisabled={!isDirty} label="Update Profile" type="submit" />
      </div>
    </form>
  );
};

export { EditUserForm };
