import React, {useState} from 'react';
import LocalStorage from '../api/localStorage';
import CarList from '../components/CarList';
import Layout from '../components/Layout';

function MyOrders() {
  const [cars, setCars] = useState(LocalStorage.getCars());

  const onRemoveCar = (stockNumber: number) => {
    LocalStorage.removeCar(stockNumber);
    const newCarList = LocalStorage.getCars();
    setCars(newCarList);
  };

  return (
    <Layout>
      {!cars.length ? (
        <p>Empty list!</p>
      ) : (
        <CarList
          loading={false}
          cars={cars}
          removable
          onRemoveItem={onRemoveCar}
        />
      )}
    </Layout>
  );
}
export default MyOrders;
