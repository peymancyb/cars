import React from 'react';
import {
  render,
  cleanup,
  waitForElement,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import CarDetails from './CarDetails';

afterEach(cleanup);

test('(CarDetails) component should match snapshot', () => {
  const history = createBrowserHistory();
  const {asFragment} = render(
    <Router history={history}>
      <CarDetails />
    </Router>,
  );
  expect(asFragment).toMatchSnapshot();
});

test('using "stockNumber" provided in url should get the car information if car is available', () => {
  const history = createBrowserHistory();
  history.push('/car/10000');
  const {getByTestId, getByText} = render(
    <Router history={history}>
      <CarDetails />
    </Router>,
  );

  return waitForElementToBeRemoved(() => getByText('Loading ...'))
    .then(() => {
      return waitForElement(() => getByText('Car not found!'))
        .then(() => {
          expect(getByText('Car not found!')).toBeTruthy();
        })
        .catch(() => {
          expect(
            getByText(
              'If you like this car, click the button and save it in your collection of favourite items.',
            ),
          ).toBeTruthy();
        });
    })
    .catch(err => {
      expect(err).toThrowError();
    });
});
