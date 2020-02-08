import {ICar} from '.';

const savedCars = 'saved_cars';

class LocalStorage {
  static addCar(car: ICar) {
    const cars = LocalStorage.getCars();
    const isCar = cars.find(
      currentCar => currentCar.stockNumber === car.stockNumber,
    );

    if (!isCar && car) {
      const newCarList = [...cars, car];
      localStorage.setItem(savedCars, JSON.stringify(newCarList));
    }
  }

  static getCars(): ICar[] {
    let cars;
    try {
      const carsList = localStorage.getItem(savedCars);
      cars = JSON.parse(carsList!);
    } catch (error) {
      console.log('error -> ', error);
    }
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
