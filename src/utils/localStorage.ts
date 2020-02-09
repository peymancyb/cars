import {ICar} from '../api';

const savedCars = 'saved_cars';

class LocalStorage {
  static addCar(car: ICar) {
    const cars = LocalStorage.getCars();
    const isCarSaved = LocalStorage.isCarSaved(car.stockNumber);
    if (!isCarSaved && car) {
      const newCarList = [...cars, car];
      localStorage.setItem(savedCars, JSON.stringify(newCarList));
    }
  }

  static getCars(): ICar[] {
    const carsList = localStorage.getItem(savedCars);
    const cars = JSON.parse(carsList!);
    return cars || [];
  }

  static removeCar(stockNumber: number): void {
    const cars = LocalStorage.getCars();
    const newCarList = cars.filter(car => car.stockNumber !== stockNumber);
    localStorage.setItem(savedCars, JSON.stringify(newCarList));
  }

  static isCarSaved(stockNumber: number): boolean {
    const cars = LocalStorage.getCars();
    const stockNumbers = cars.map(car => car.stockNumber);
    return stockNumbers.includes(stockNumber);
  }
}

export default LocalStorage;
