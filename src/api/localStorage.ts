interface ICar {
  stockNumber: number;
  manufacturerName: string;
  modelName: string;
  color: string;
  mileage: {
    number: number;
    unit: string;
  };
  fuelType: string;
  pictureUrl: string;
}

const savedCars = 'saved_cars';

class LocalStorage {
  static addCar(car: ICar) {
    const cars = LocalStorage.getCars();
    console.log('cars -> ', cars);
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
      console.log('carsList -> ', carsList);
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
}

export default LocalStorage;
