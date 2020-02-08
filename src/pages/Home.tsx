import React from 'react';
import Grid from '@material-ui/core/Grid';
import Layout from '../components/Layout';
import FilterForm from '../components/FilterForm';
import CarList from '../components/CarList';
import Pagination from '../components/Pagination';
import AvailableCars from '../components/AvailableCars';
import useCarListStore from '../hooks/useCarListStore';

function Home() {
  const {
    loading,
    carsList,
    formOptions,
    setFilter,
    pagination,
    onChangePage,
  } = useCarListStore();
  const shownCarListCount = 10 * (pagination.active - 1) + carsList.cars.length;

  return (
    <Layout>
      <Grid data-testid="home-component" container spacing={3} justify="center">
        <Grid item xs={6} sm={3}>
          <FilterForm
            colors={formOptions.colors}
            manufactureList={formOptions.manufacturers}
            sortList={formOptions.sortList}
            onFilter={setFilter}
          />
        </Grid>
        <Grid item xs={12} sm={7}>
          <AvailableCars
            carListCount={shownCarListCount}
            totalCarsCount={carsList.totalCarsCount}
            loading={loading}
          />
          <CarList loading={loading} cars={carsList.cars} />
          <Pagination
            activePage={pagination.active}
            totalPageCount={pagination.total}
            loading={loading}
            onChangePage={onChangePage}
          />
        </Grid>
      </Grid>
    </Layout>
  );
}

export default Home;
