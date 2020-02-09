import React from 'react';
import {render, cleanup, fireEvent} from '@testing-library/react';
import MyOrders from './MyOrders';
import LocalStorage from '../utils/localStorage';

const carMockData = {
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
};

afterEach(cleanup);

test('(MyOrders) component should match snapshot', () => {
  const {asFragment} = render(<MyOrders />);
  expect(asFragment).toMatchSnapshot();
});

test('(MyOrders) component renders correctly', () => {
  const {getByTestId} = render(<MyOrders />);
  expect(getByTestId('my-orders-component')).toBeTruthy();
});

test('(MyOrders) should show empty message when there is no order', () => {
  const {getByText} = render(<MyOrders />);

  expect(getByText('Empty list!')).toBeTruthy();
});

test('(MyOrders) should render car list using <CarList /> while there are car saved in localStorage', () => {
  LocalStorage.addCar(carMockData);
  const {getByTestId} = render(<MyOrders />);

  expect(getByTestId('car-list-component')).toBeTruthy();
  localStorage.clear();
});

test('(MyOrders) should remove car from list after clicking on "remove"', () => {
  LocalStorage.addCar(carMockData);
  const {getByText} = render(<MyOrders />);

  fireEvent.click(getByText('remove'));

  expect(getByText('Empty list!')).toBeTruthy();
});
