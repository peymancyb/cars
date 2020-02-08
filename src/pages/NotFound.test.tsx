import React from 'react';
import {render, cleanup, fireEvent} from '@testing-library/react';
import {createBrowserHistory} from 'history';
import NotFound from './NotFound';

afterEach(cleanup);

test('(NotFound) component should match snapshot', () => {
  const {asFragment} = render(<NotFound />);
  expect(asFragment).toMatchSnapshot();
});

test('(NotFound) component renders correctly', () => {
  const {getByTestId} = render(<NotFound />);
  expect(getByTestId('not-found-component')).toHaveTextContent(
    '404 - Not Found',
  );
});

test('By clicking on "homepage" link it should navigate to home page', () => {
  const history = createBrowserHistory();
  const {getByText} = render(<NotFound />);

  fireEvent.click(getByText('homepage.'));
  expect(history.location.pathname).toBe('/');
});
