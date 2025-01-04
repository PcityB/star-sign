import { useEffect, useState } from 'react';
import { Control, FieldErrors, FieldPath, FieldValues, UseFormSetValue } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './styles.module.css';

type Properties<T extends FieldValues> = {
  control: Control<T, null>;
  errors?: FieldErrors<T>;
  timestampName: FieldPath<T>;
  label: string;
  handleValueSet: UseFormSetValue<T>;
  defaultDate: Date | null;
};

export const DateTimePickerInput = <T extends FieldValues>({
  timestampName,
  label,
  errors,
  handleValueSet,
  defaultDate,
}: Properties<T>) => {
  const [selectedTimestamp, setSelectedTimestamp] = useState<Date | null>(null);

  useEffect(() => {
    if (defaultDate) {
      setSelectedTimestamp(defaultDate);
    }
  }, []);

  const handleTimestampChange = (datetime: Date | null) => {
    setSelectedTimestamp(datetime);
    if (datetime) {
      handleValueSet(timestampName, new Date(datetime));
    }
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className={styles['container']}>
      <div className={styles['input-container']}>
        <label htmlFor={timestampName} className={styles['label']}>
          {label}
        </label>
        <DatePicker
          selected={selectedTimestamp}
          onChange={handleTimestampChange}
          showTimeSelect
          timeIntervals={15}
          dateFormat="yyyy-MM-dd HH:mm:ss"
          className={styles['datepicker']}
          placeholderText="Select date and time"
          id={timestampName}
          maxDate={today}
        />
        {errors?.[timestampName] && <span className={styles['error']}>{errors[timestampName]?.message}</span>}
      </div>
    </div>
  );
};
