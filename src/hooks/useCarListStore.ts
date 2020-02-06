import {useCallback, useEffect, useState} from 'react';

const mockArray = new Array(10).fill({}).map(() => ({
  stockNumber: Math.random() * 100 + 1,
  manufacturerName: '',
  modelName: '',
  color: '',
  mileage: {
    number: 1,
    unit: 'km',
  },
  fuelType: '',
  pictureUrl: '',
}));

const allColors = 'All car colors';
const allManufacturers = 'All manufacturers';

interface IFilterState {
  color: string;
  manufacture: string;
}

interface IFormOptions {
  colors: string[];
  manufacturers: string[];
}

interface ICar {
  stockNumber: number;
  manufacturerName: string;
  modelName: string;
  color: string;
  mileage: {
    number: number;
    unit: string;
  };
  fuelType: string;
  pictureUrl: string;
}

interface ICarsList {
  cars: ICar[];
  totalPageCount: number;
  totalCarsCount: number;
}

function useCarListStore() {
  const [loading, setLoading] = useState<boolean>(true);
  const [carsList, setCarsList] = useState<ICarsList>({
    cars: mockArray,
    totalPageCount: 0,
    totalCarsCount: 0,
  });
  const [formOptions, setFormOptions] = useState<IFormOptions>({
    colors: [allColors],
    manufacturers: [allManufacturers],
  });
  const [filter, setFilter] = useState<IFilterState>({
    color: allColors,
    manufacture: allManufacturers,
  });
  const [filteredCarList, setFilteredCarList] = useState<ICar[]>([]);

  const updateFilterList = useCallback(() => {
    const filteredList = carsList.cars.filter((car: ICar) => {
      const isManufacturer =
        filter.manufacture === allManufacturers ||
        car.manufacturerName === filter.manufacture;
      const isColor = filter.color === allColors || car.color === filter.color;
      return isColor && isManufacturer;
    });
    setFilteredCarList(filteredList);
  }, [filter, carsList.cars]);

  useEffect(() => {
    updateFilterList();
  }, [filter, carsList.cars, updateFilterList]);

  return {
    loading,
    setLoading,
    carsList,
    setCarsList,
    formOptions,
    setFormOptions,
    setFilter,
    filteredCarList,
  };
}

export default useCarListStore;
