import React from 'react';
import {render, cleanup} from '@testing-library/react';
import Home from './Home';

afterEach(cleanup);

beforeAll(() => {
  window.scrollTo = jest.fn();
});

test('(Home) component should match snapshot', () => {
  const {asFragment} = render(<Home />);
  expect(asFragment).toMatchSnapshot();
});
