import {useCallback, useEffect, useState} from 'react';
import CarApi from '../api';

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

interface IPagination {
  active: number;
  total: number;
}

interface ICarModel {
  name: string;
}

interface IManufacture {
  name: string;
  models?: ICarModel[];
}

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

function getManufacturersNames(manufacturersList: IManufacture[]) {
  return manufacturersList.map(
    (manufacturer: IManufacture) => manufacturer.name,
  );
}

function useCarListStore() {
  const [loading, setLoading] = useState<boolean>(true);
  const [pagination, setPagination] = useState<IPagination>({
    active: 1,
    total: 1,
  });
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

  const updateCarList = useCallback(
    async (shouldReset?: boolean) => {
      const manufacture =
        filter.manufacture === allManufacturers ? '' : filter.manufacture;
      const color = filter.color === allColors ? '' : filter.color;
      try {
        setLoading(true);
        window.scrollTo(0, 0);
        const carList = await CarApi.getCarList(
          pagination.active,
          manufacture,
          color,
        );
        setCarsList(() => carList);
        setPagination(prevState => ({
          active: shouldReset ? 1 : prevState.active,
          total: carList.totalPageCount,
        }));
        setLoading(false);
      } catch (error) {
        console.log('updateCarList:error', error);
      }
    },
    [filter, pagination],
  );

  const onChangePage = useCallback(
    page => {
      const newPage = page < 1 ? 1 : page;
      setPagination(prevState => ({
        ...prevState,
        active: newPage > pagination.total ? pagination.total : newPage,
      }));
    },
    [pagination],
  );

  const getInitialState = useCallback(async () => {
    try {
      setLoading(true);
      const [colorsList, manufacturersList] = await Promise.all([
        CarApi.getColorsList(),
        CarApi.getManufacturersList(),
      ]);
      const manufacturersNames = getManufacturersNames(manufacturersList);
      setFormOptions(prevState => ({
        colors: [...prevState.colors, ...colorsList],
        manufacturers: [...prevState.manufacturers, ...manufacturersNames],
      }));
      await updateCarList();
    } catch (error) {
      console.log('error', error);
    }
  }, []);

  useEffect(() => {
    updateCarList();
  }, [pagination.active]);

  useEffect(() => {
    updateCarList(true);
  }, [filter]);

  return {
    loading,
    carsList,
    formOptions,
    setFilter,
    pagination,
    onChangePage,
    getInitialState,
  };
}

export default useCarListStore;
