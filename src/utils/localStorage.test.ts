import LocalStorage from './localStorage';
import {ICar} from '../api';

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

afterEach(() => {
  localStorage.clear();
});

describe('LocalStorage', () => {
  test('addCar function adds the car to the localStorage', () => {
    LocalStorage.addCar(carMockData);
    const savedCars = localStorage.getItem('saved_cars');
    const cars = JSON.parse(savedCars!);
    const stockNumber = cars.map((car: ICar) => car.stockNumber);
    expect(stockNumber.includes(carMockData.stockNumber)).toBeTruthy();
    localStorage.clear();
  });

  test('getCars function gets the list of cars from localStorage', () => {
    let cars = LocalStorage.getCars();
    expect(cars).toEqual([]);
    LocalStorage.addCar(carMockData);
    cars = LocalStorage.getCars();
    expect(cars).toEqual([carMockData]);
  });

  test('removeCar function removes the car from the localStorage', () => {
    LocalStorage.addCar(carMockData);
    let cars = LocalStorage.getCars();
    expect(cars).toEqual([carMockData]);
    LocalStorage.removeCar(carMockData.stockNumber);
    cars = LocalStorage.getCars();
    expect(cars).toEqual([]);
  });

  test('isCarSaved function checks whether the car is already saved in the localStorage', () => {
    LocalStorage.addCar(carMockData);
    expect(LocalStorage.isCarSaved(carMockData.stockNumber)).toBeTruthy();
  });
});
