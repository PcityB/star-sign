import { useEffect, useState } from 'react';
import {
  Control,
  FieldErrors,
  FieldPath,
  FieldValues,
  UseFormSetValue,
  useWatch,
} from 'react-hook-form';
import { Country, City, ICountry, ICity } from 'country-state-city';
import { SelectOption } from '~/common/types/types.js';
import { Input, Select } from '../components';
import styles from './styles.module.css';

type Properties<T extends FieldValues> = {
  control: Control<T, null>;
  errors?: FieldErrors<T>;
  countryName: FieldPath<T>;
  cityName: FieldPath<T>;
  cityLabel: string;
  countryLabel: string;
  latitudeName?: FieldPath<T>;
  longitudeName?: FieldPath<T>;
  handleValueSet: UseFormSetValue<T>;
};

export const CountryCityInput = <T extends FieldValues>({
  control,
  countryName,
  cityName,
  cityLabel,
  countryLabel,
  latitudeName,
  longitudeName,
  errors,
  handleValueSet,
}: Properties<T>) => {
  const [countryOptions, setCountryOptions] = useState<SelectOption<string>[]>(
    []
  );
  const [cityOptions, setCityOptions] = useState<SelectOption<string>[]>([]);

  const selectedCountry = useWatch({
    control,
    name: countryName,
  });

  const selectedCity = useWatch({
    control,
    name: cityName,
  });

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const countries = await Country.getAllCountries();
        setCountryOptions(
          countries.map((country: ICountry) => ({
            label: country.name,
            value: country.isoCode,
          }))
        );
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const fetchCities = async () => {
        try {
          const cities = await City.getCitiesOfCountry(selectedCountry);
          setCityOptions(
            cities
              ? cities.map((city: ICity) => ({
                  label: city.name,
                  value: city.name,
                }))
              : []
          );
        } catch (error) {
          console.error('Error fetching cities:', error);
        }
      };

      fetchCities();
    } else {
      setCityOptions([]);
    }
  }, [selectedCountry]);

  useEffect(() => {
    const updateCoordinates = async () => {
      if (!latitudeName || !longitudeName) return;

      if (selectedCity) {
        try {
          const cities = await City.getCitiesOfCountry(selectedCountry);
          const cityDetails = cities?.find((city) => city.name === selectedCity);
          if (cityDetails) {
            handleValueSet(latitudeName, cityDetails.latitude || 0);
            handleValueSet(longitudeName, cityDetails.longitude || 0);
          }
        } catch (error) {
          console.error('Error fetching city details:', error);
        }
      } else if (selectedCountry) {
        try {
          const countries = await Country.getAllCountries();
          const countryDetails = countries.find(
            (country) => country.isoCode === selectedCountry
          );
          if (countryDetails) {
            handleValueSet(latitudeName, countryDetails.latitude || 0);
            handleValueSet(longitudeName, countryDetails.longitude || 0);
          }
        } catch (error) {
          console.error('Error fetching country details:', error);
        }
      } else {
        handleValueSet(latitudeName, 0);
        handleValueSet(longitudeName, 0);
      }
    };

    updateCoordinates();
  }, [selectedCity, selectedCountry, handleValueSet, latitudeName, longitudeName]);

  return (
    <div className={styles['container']}>
      <Select
        control={control}
        errors={errors}
        name={countryName}
        label={countryLabel}
        placeholder="Select a country"
        options={countryOptions}
        isSearchable
      />

      <Select
        control={control}
        errors={errors}
        name={cityName}
        label={cityLabel}
        placeholder="Select a city"
        options={cityOptions}
        isDisabled={!selectedCountry}
        isSearchable
      />

      {latitudeName && (
        <Input
          control={control}
          errors={errors}
          name={latitudeName}
          label="Latitude"
          placeholder="Latitude will be set automatically"
          isDisabled
        />
      )}

      {longitudeName && (
        <Input
          control={control}
          errors={errors}
          name={longitudeName}
          label="Longitude"
          placeholder="Longitude will be set automatically"
          isDisabled
        />
      )}
    </div>
  );
};
