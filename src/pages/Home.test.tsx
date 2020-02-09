import React from 'react';
import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
} from '@testing-library/react';
import Home from './Home';

afterEach(cleanup);

beforeAll(() => {
  window.scrollTo = jest.fn();
});

describe('(Home) component', () => {
  test('should match snapshot', async () => {
    const {asFragment, getByTestId} = render(<Home />);
    await waitForElement(() => getByTestId('home-component'));
    await waitForElement(() => getByTestId('available-cars-view'));
    await waitForElement(() => getByTestId('pagination-component'));
    expect(asFragment).toMatchSnapshot();
  });

  test('(AvailableCars) component should be rendered after loading', async () => {
    const {getByText, getByTestId} = render(<Home />);
    await waitForElement(() => getByTestId('available-cars-view'));
    expect(getByText('Available cars')).toBeTruthy();
  });

  test('(Pagination) component should be rendered after loading', async () => {
    const {getByText, getByTestId} = render(<Home />);
    await waitForElement(() => getByTestId('pagination-component'));
    expect(getByText('First')).toBeTruthy();
    expect(getByText('Previous')).toBeTruthy();
    expect(getByText('Next')).toBeTruthy();
    expect(getByText('Last')).toBeTruthy();
  });

  test('navigating to First page works', async () => {
    const {getByText, getByTestId} = render(<Home />);
    await waitForElement(() => getByTestId('pagination-component'));
    expect(getByText('First')).toBeTruthy();
    fireEvent.click(getByText('First'));
    await waitForElement(() => getByTestId('pagination-component'));
    expect(getByText('First')).toBeTruthy();
  });

  test('navigating to Previous page works', async () => {
    const {getByText, getByTestId} = render(<Home />);
    await waitForElement(() => getByTestId('pagination-component'));
    expect(getByText('Previous')).toBeTruthy();
    fireEvent.click(getByText('Previous'));
    await waitForElement(() => getByTestId('pagination-component'));
    expect(getByText('Previous')).toBeTruthy();
  });

  test('navigating to Next page works', async () => {
    const {getByText, getByTestId} = render(<Home />);
    await waitForElement(() => getByTestId('pagination-component'));
    expect(getByText('Next')).toBeTruthy();
    fireEvent.click(getByText('Next'));
    await waitForElement(() => getByTestId('pagination-component'));
    expect(getByText('Next')).toBeTruthy();
  });

  test('navigating to Last page works', async () => {
    const {getByText, getByTestId} = render(<Home />);
    await waitForElement(() => getByTestId('pagination-component'));
    expect(getByText('Last')).toBeTruthy();
    fireEvent.click(getByText('Last'));
    await waitForElement(() => getByTestId('pagination-component'));
    expect(getByText('Last')).toBeTruthy();
  });
});
