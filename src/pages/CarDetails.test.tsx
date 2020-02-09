import React from 'react';
import {
  render,
  cleanup,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import {MemoryRouter, Route, withRouter} from 'react-router-dom';
import CarDetails from './CarDetails';

const CarDetailsWrapper = withRouter(CarDetails);

interface IRenderCarDetailsWrapper {
  stockNumber: number;
}

const renderCarDetailsWrapper = ({stockNumber}: IRenderCarDetailsWrapper) => {
  return render(
    <MemoryRouter initialEntries={[`/car/${stockNumber}`]}>
      <Route path="/car/:stockNumber">
        <CarDetailsWrapper />
      </Route>
    </MemoryRouter>,
  );
};

afterEach(cleanup);

test('(CarDetails) component should match snapshot', () => {
  const stockNumber = 10066;
  const {asFragment} = renderCarDetailsWrapper({
    stockNumber,
  });
  expect(asFragment).toMatchSnapshot();
});

test('using "stockNumber" provided in url should get the car information if car is available', async () => {
  const stockNumber = 10066;
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
