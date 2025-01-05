import { actions as usersActions } from '~/store/users/users.js';
import styles from './styles.module.css';
import { useAppDispatch, useAppForm } from '~/hooks/hooks';
import { UserDTO, UserPatchRequestDTO, UserPatchRequestSchema } from 'shared/src';
import { useCallback } from 'react';
import { Button, CountryCityInput, DateTimePickerInput, ImageInput, Input } from '~/components/components';
import RadioInput from '~/components/radio-input/radio-input';
import { useWatch } from 'react-hook-form';

type Properties = {
  user: UserDTO;
};

const EditUserForm = ({ user }: Properties): JSX.Element => {
  const { name, photos, gender, description, birthTimestamp, birthCity, birthCountry, birthLatitude, birthLongitude } =
    user;
  const dispatch = useAppDispatch();

  const { control, errors, handleSubmit, isDirty, handleValueSet } = useAppForm<UserPatchRequestDTO>({
    defaultValues: {
      name,
      photos,
      gender,
      description,
      birthTimestamp: birthTimestamp ? new Date(birthTimestamp): birthTimestamp,
      birthCity,
      birthCountry,
      birthLatitude,
      birthLongitude,
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

  const descriptionValue = useWatch({
    control,
    defaultValue: description,
    name: 'description',
  });
  const isDescriptionCounterShown = !errors['description']?.message;

  const genderOptions = [
    {
      label: 'Male',
      value: 'male',
    },
    {
      label: 'Female',
      value: 'female',
    },
    {
      label: 'Other',
      value: 'other',
    },
  ];

  return (
    <form className={styles['form-wrapper']} onSubmit={handleFormSubmit}>
      <div className={styles['inputs-wrapper']}>
        <Input autoComplete="username" control={control} errors={errors} label="My Name" name="name" />
        <ImageInput
          placeholder="Upload Photos"
          name="photos"
          label="My Photos"
          control={control}
          errors={errors}
          maxImages={10}
        />
        <RadioInput label="My Gender" name="gender" control={control} errors={errors} options={genderOptions} />
        <div className={styles['description-wrapper']}>
          <Input control={control} errors={errors} label="My Profile Description" name="description" rowsCount={4} />
          {isDescriptionCounterShown && (
            <span className={styles['description-counter']}>
              {descriptionValue?.length || 0}/{500}
            </span>
          )}
        </div>
        <CountryCityInput
          control={control}
          cityName="birthCity"
          countryName="birthCountry"
          cityLabel="City of birth"
          countryLabel="Country of birth"
          errors={errors}
          handleValueSet={handleValueSet}
          latitudeName="birthLatitude"
          longitudeName="birthLongitude"
        />
        <DateTimePickerInput
          control={control}
          timestampName="birthTimestamp"
          label="Date of Birth"
          errors={errors}
          handleValueSet={handleValueSet}
          defaultDate={birthTimestamp ? new Date(birthTimestamp) : null}
        />
      </div>
      <div>
        <Button isDisabled={!isDirty} label="Update Profile" type="submit" />
      </div>
    </form>
  );
};

export { EditUserForm };
