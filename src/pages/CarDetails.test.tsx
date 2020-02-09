import React from 'react';
import {
  render,
  cleanup,
  waitForElementToBeRemoved,
  act,
  fireEvent,
} from '@testing-library/react';
import {MemoryRouter, Route, withRouter} from 'react-router-dom';
import CarApi from '../api';
import CarDetails from './CarDetails';
import LocalStorage from '../utils/localStorage';

const CarDetailsWrapper = withRouter(CarDetails);

interface IRenderCarDetailsWrapper {
  stockNumber: number;
}

const renderCarDetailsWrapper = ({stockNumber}: IRenderCarDetailsWrapper) =>
  render(
    <MemoryRouter initialEntries={[`/car/${stockNumber}`]}>
      <Route path="/car/:stockNumber">
        <CarDetailsWrapper />
      </Route>
    </MemoryRouter>,
  );

afterEach(cleanup);

test('(CarDetails) component should match snapshot', async () => {
  let stockNumber = 1;
  await act(async () => {
    const carList = await CarApi.getCarList();
    stockNumber = carList.cars[0].stockNumber;
  });
  const {asFragment, getByText} = renderCarDetailsWrapper({
    stockNumber,
  });
  await waitForElementToBeRemoved(() => getByText('Loading ...'));
  expect(asFragment).toMatchSnapshot();
});

test('using "stockNumber" provided in url should get the car information if car is available', async () => {
  let stockNumber = 1;
  await act(async () => {
    const carList = await CarApi.getCarList();
    stockNumber = carList.cars[0].stockNumber;
  });
  const {getByText, container} = renderCarDetailsWrapper({
    stockNumber,
  });

  await waitForElementToBeRemoved(() => getByText('Loading ...'));
  expect(container).toHaveTextContent(
    'If you like this car, click the button and save',
  );
});

test('showing not found message when car is not available', async () => {
  const stockNumber = 1;
  const {getByText, container} = renderCarDetailsWrapper({
    stockNumber,
  });
  await waitForElementToBeRemoved(() => getByText('Loading ...'));
  expect(container).toHaveTextContent('Car not found!');
});

test('Save button should save car in localStorage', async () => {
  let stockNumber = 1;
  await act(async () => {
    const carList = await CarApi.getCarList();
    stockNumber = carList.cars[0].stockNumber;
  });
  const {getByText, container} = renderCarDetailsWrapper({
    stockNumber,
  });
  await waitForElementToBeRemoved(() => getByText('Loading ...'));
  expect(container).toHaveTextContent(
    'If you like this car, click the button and save',
  );

  fireEvent.click(getByText('Save'));
  const isCarSaved = LocalStorage.isCarSaved(stockNumber);
  expect(isCarSaved).toEqual(true);
});

test('Remove button should remove the car from localStorage', async () => {
  localStorage.clear();
  let stockNumber = 1;
  await act(async () => {
    const carList = await CarApi.getCarList();
    const firstCar = carList.cars[0];
    stockNumber = firstCar.stockNumber;
    LocalStorage.addCar(firstCar);
  });
  const {getByText, container} = renderCarDetailsWrapper({
    stockNumber,
  });
  await waitForElementToBeRemoved(() => getByText('Loading ...'));
  expect(container).toHaveTextContent(
    'If you like this car, click the button and save',
  );

  fireEvent.click(getByText('Remove'));
  const isCarSaved = LocalStorage.isCarSaved(stockNumber);
  expect(isCarSaved).toEqual(false);
});
