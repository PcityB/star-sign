import { actions as attributesActions } from '~/store/attributes/attributes.js';
import { actions as preferenceActions } from '~/store/preferences/preferences.js';
import styles from './styles.module.css';
import { useAppDispatch, useAppForm, useAppSelector } from '~/hooks/hooks';
import { PreferenceCreateRequestDTO, PreferenceCreateRequestSchema, UserDTO } from 'shared/src';
import { useCallback, useEffect } from 'react';
import { Button, CountryCityInput, Input, Loader, Select } from '~/components/components';
import RadioInput from '~/components/radio-input/radio-input';
import { DataStatus } from '~/common/enums/enums';

type Properties = {
  user: UserDTO;
};

const EditPreferencesForm = ({ user }: Properties): JSX.Element => {
  const {
    minAge,
    maxAge,
    currentCity,
    currentCountry,
    gender,
    sunSign,
    moonSign,
    goals: userGoals,
    interests: userInterests,
  } = user.Preference || {};
  const dispatch = useAppDispatch();
  const { goals, interests, goalsStatus, interestsStatus } = useAppSelector(({ attributes }) => attributes);

  useEffect(() => {
    void dispatch(attributesActions.getAllGoals());
    void dispatch(attributesActions.getAllInterests());
  }, [dispatch]);

  const { control, errors, handleSubmit, isDirty, handleValueSet } = useAppForm<PreferenceCreateRequestDTO>({
    defaultValues: {
      userId: user.id || 1,
      minAge: minAge || 18,
      maxAge: maxAge || 99,
      currentCity,
      currentCountry,
      gender,
      sunSign: sunSign || '',
      moonSign: moonSign || '',
      goals: userGoals?.map((goal) => goal.id) || [],
      interests: userInterests?.map((interest) => interest.id) || [],
    },
    validationSchema: PreferenceCreateRequestSchema,
  });

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit(async (formData: PreferenceCreateRequestDTO) => {
        void dispatch(preferenceActions.update({ data: formData }));
      })(event_);
    },
    [dispatch, handleSubmit, user.id],
  );

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

  const zodiacSignOptions = [
    { label: 'All', value: '' },
    { label: 'Aries', value: 'Aries' },
    { label: 'Taurus', value: 'Taurus' },
    { label: 'Gemini', value: 'Gemini' },
    { label: 'Cancer', value: 'Cancer' },
    { label: 'Leo', value: 'Leo' },
    { label: 'Virgo', value: 'Virgo' },
    { label: 'Libra', value: 'Libra' },
    { label: 'Scorpio', value: 'Scorpio' },
    { label: 'Sagittarius', value: 'Sagittarius' },
    { label: 'Capricorn', value: 'Capricorn' },
    { label: 'Aquarius', value: 'Aquarius' },
    { label: 'Pisces', value: 'Pisces' },
  ];

  const mapToSelectOptions = (items: { id: number; name: string }[]) =>
    items.map((item) => ({ label: item.name, value: item.id }));

  const goalsOptions = mapToSelectOptions(goals);
  const interestsOptions = mapToSelectOptions(interests);

  const isLoading =
    goalsStatus === DataStatus.IDLE ||
    interestsStatus === DataStatus.IDLE ||
    goalsStatus === DataStatus.PENDING ||
    interestsStatus === DataStatus.PENDING;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <form className={styles['form-wrapper']} onSubmit={handleFormSubmit}>
      <div className={styles['inputs-wrapper']}>
        <div className={styles['input-block']}>
          <h3>Basic Preferences</h3>
          <div className={styles['input-flex-wrapper']}>
            <Input
              control={control}
              errors={errors}
              label="Minimum Age"
              name="minAge"
              type="number"
              min={18}
              max={99}
            />
            <Input
              control={control}
              errors={errors}
              label="Maximum Age"
              name="maxAge"
              type="number"
              min={18}
              max={99}
            />
          </div>
          <RadioInput label="Partner Gender" name="gender" control={control} errors={errors} options={genderOptions} />
        </div>
        <div className={styles['input-block']}>
          <h3>Location</h3>
          <CountryCityInput
            control={control}
            cityName="currentCity"
            countryName="currentCountry"
            cityLabel="City"
            countryLabel="Country"
            errors={errors}
            handleValueSet={handleValueSet}
          />
        </div>
        <div className={styles['input-block']}>
          <h3>Astrological Preferences</h3>
          <div className={styles['input-flex-wrapper']}>
            <Select control={control} name="sunSign" label="Sun Sign" errors={errors} options={zodiacSignOptions} />
            <Select control={control} name="moonSign" label="Moon Sign" errors={errors} options={zodiacSignOptions} />
          </div>
        </div>
        <div className={styles['input-block']}>
          <h3>Relationship Goals</h3>
          <div className={styles['input-flex-wrapper']}>
            <Select control={control} name="goals" label="Goals" errors={errors} options={goalsOptions} isMulti />
          </div>
        </div>
        <div className={styles['input-block']}>
          <h3>My Interests</h3>
          <div className={styles['input-flex-wrapper']}>
            <Select
              control={control}
              name="interests"
              label="Interests"
              errors={errors}
              options={interestsOptions}
              isMulti
            />
          </div>
        </div>
      </div>
      <div>
        <Button isDisabled={!isDirty} label="Update Preferences" type="submit" />
      </div>
    </form>
  );
};

export { EditPreferencesForm };
