import React, {useEffect, useCallback} from 'react';
import Grid from '@material-ui/core/Grid';
import Layout from '../components/Layout';
import FilterForm from '../components/FilterForm';
import CarList from '../components/CarList';
import Pagination from '../components/Pagination';
import AvailableCars from '../components/AvailableCars';
import CarApi from '../api';
import useCarListStore from '../hooks/useCarListStore';

interface ICarModel {
  name: string;
}

interface IManufacture {
  name: string;
  models?: ICarModel[];
}

function getManufacturersNames(manufacturersList: IManufacture[]) {
  return manufacturersList.map(
    (manufacturer: IManufacture) => manufacturer.name,
  );
}

function Home() {
  const {
    loading,
    setLoading,
    carsList,
    setCarsList,
    formOptions,
    setFormOptions,
    setFilter,
    filteredCarList,
  } = useCarListStore();

  const getInitialState = useCallback(async () => {
    try {
      setLoading(true);
      const [colorsList, manufacturersList, carList] = await Promise.all([
        CarApi.getColorsList(),
        CarApi.getManufacturersList(),
        CarApi.getCarList(),
      ]);
      const manufacturersNames = getManufacturersNames(manufacturersList);
      setCarsList(carList);
      setFormOptions(prevState => ({
        colors: [...prevState.colors, ...colorsList],
        manufacturers: [...prevState.manufacturers, ...manufacturersNames],
      }));
      setLoading(false);
    } catch (error) {
      console.log('error =>', error);
    }
  }, [setCarsList, setFormOptions, setLoading]);

  useEffect(() => {
    getInitialState();
  }, [getInitialState]);

  return (
    <Layout>
      <Grid container spacing={3} justify="center">
        <Grid item xs={6} sm={3}>
          <FilterForm
            colors={formOptions.colors}
            manufactureList={formOptions.manufacturers}
            onFilter={setFilter}
          />
        </Grid>
        <Grid item xs={12} sm={7}>
          <AvailableCars
            carListCount={filteredCarList.length}
            totalCarsCount={carsList.totalCarsCount}
            loading={loading}
          />
          <CarList loading={loading} cars={filteredCarList} />
          <Pagination
            totalPageCount={carsList.totalPageCount}
            loading={loading}
          />
        </Grid>
      </Grid>
    </Layout>
  );
}

export default Home;
