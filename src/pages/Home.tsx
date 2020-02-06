import React, { useState, useEffect, useCallback } from 'react';
import Grid from '@material-ui/core/Grid';
import Layout from '../components/Layout';
import FilterForm from '../components/FilterForm';
import CarList from '../components/CarList';
import Pagination from '../components/Pagination';
import AvailableCars from '../components/AvailableCars';
import CarApi from '../api';

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

interface ICarModel {
  name: string;
}

interface IManufacture {
  name: string;
  models?: ICarModel[];
}

interface ICarsList {
  cars: ICar[];
  totalPageCount: number;
  totalCarsCount: number;
}

interface IFilterState{
  color: string;
  manufacture: string;
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

function getManufacturersNames(manufacturersList: IManufacture[]) {
  return manufacturersList.map((manufacturer: IManufacture) => manufacturer.name);
}

function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [carsList, setCarsList] = useState<ICarsList>({
    cars: mockArray,
    totalPageCount: 0,
    totalCarsCount: 0,
  });
  const [colors, setColors] = useState<string[]>(['All car colors']);
  const [manufactureList, setManufactureList] = useState<string[]>(['All manufacturers']);
  const [filter, setFilter] = useState<IFilterState>({
    color: 'All car colors',
    manufacture: 'All manufacturers',
  });

  const getInitialState = useCallback(async () => {
    try {
      setLoading(true);
      const colorsList = await CarApi.getColorsList();
      const manufacturersList = await CarApi.getManufacturersList();
      const carList = await CarApi.getCarList();
      const manufacturersNames = getManufacturersNames(manufacturersList);
      setColors((prevState) => ([...prevState, ...colorsList]));
      setCarsList(carList);
      setManufactureList((prevState) => ([...prevState, ...manufacturersNames]));
      setLoading(false);
    } catch (error) {
      console.log('error =>', error);
    }
  }, []);

  const getFilteredList = (cars: ICar[]) => cars.filter((car: ICar) => {
    const isManufacturer = (filter.manufacture === 'All manufacturers') ? true : car.manufacturerName === filter.manufacture;
    const isColor = (filter.color === 'All car colors') ? true : car.color === filter.color;
    return isColor && isManufacturer;
  });

  useEffect(() => {
    getInitialState();
  }, []);

  return (
    <Layout>
      <Grid container spacing={3} justify="center">
        <Grid item xs={6} sm={3}>
          <FilterForm
            colors={colors}
            manufactureList={manufactureList}
            onFilter={setFilter}
          />
        </Grid>
        <Grid item xs={12} sm={7}>
          <AvailableCars
            carListCount={carsList.cars.length}
            totalCarsCount={carsList.totalCarsCount}
            loading={loading}
          />
          <CarList loading={loading} cars={getFilteredList(carsList.cars)} />
          <Pagination totalPageCount={carsList.totalPageCount} loading={loading}/>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default Home;
