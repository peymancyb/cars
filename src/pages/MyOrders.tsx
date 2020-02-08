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
      <div data-testid="my-orders-component">
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
      </div>
    </Layout>
  );
}
export default MyOrders;
