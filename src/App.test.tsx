import React from 'react';
import {render, cleanup} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import App from './App';

afterEach(cleanup);

beforeAll(() => {
  // mocking the scrollTo function as it's not implemeneted
  window.scrollTo = jest.fn();
});

describe('(App) routing/navigating', () => {
  test('(Home) component should be render by default when the route is root (/)', () => {
    const history = createBrowserHistory();
    const {getByTestId, asFragment} = render(
      <Router history={history}>
        <App />
      </Router>,
    );

    expect(history.location.pathname).toBe('/');
    expect(getByTestId('home-component')).toBeTruthy();
    expect(asFragment()).toMatchSnapshot();
  });

  test('(CarDetails) component should be render when the route is matching (/car/:stockNumber)', () => {
    const history = createBrowserHistory();
    history.push('/car/10111');
    const {getByTestId, asFragment, getByText} = render(
      <Router history={history}>
        <App />
      </Router>,
    );
    expect(getByText('Loading ...')).toBeTruthy();
    expect(asFragment()).toMatchSnapshot();
  });

  test('(MyOrders) component should be render when the route is matching (/myorders)', () => {
    const history = createBrowserHistory();
    history.push('/myorders');
    const {getByTestId, asFragment} = render(
      <Router history={history}>
        <App />
      </Router>,
    );
    expect(getByTestId('my-orders-component')).toBeTruthy();
    expect(asFragment()).toMatchSnapshot();
  });

  test('(MyOrders) component is also should be rendered when the route is matching (/purchase) ', () => {
    const history = createBrowserHistory();
    history.push('/purchase');
    const {getByTestId, asFragment} = render(
      <Router history={history}>
        <App />
      </Router>,
    );

    expect(getByTestId('my-orders-component')).toBeTruthy();
    expect(asFragment()).toMatchSnapshot();
  });

  test('(NotFound) component should be render for all other routes that are not defined (/example)', () => {
    const history = createBrowserHistory();
    history.push('/example');
    const {getByTestId, asFragment} = render(
      <Router history={history}>
        <App />
      </Router>,
    );

    expect(history.location.pathname).toBe('/example');
    expect(getByTestId('not-found-component')).toHaveTextContent(
      '404 - Not Found',
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
