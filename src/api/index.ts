import axios from 'axios';

/**
 * cars
 * cars/{stocknumber}
 * colors/
 * manufacturers/
 */

interface IColors {
  colors: string[];
}

interface ICarModel {
  name: string;
}

interface IManufacture {
  name: string;
  models: ICarModel[];
}

interface IManufactures {
  manufacturers: IManufacture[];
}

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

interface ICars {
  totalPageCount: number;
  totalCarsCount: number;
  cars: ICar[];
}

class CarApi {
  static baseUrl = 'https://auto1-mock-server.herokuapp.com/api/';

  static async getCarList<ICars>() {
    let carList;
    try {
      const {data} = await axios.get(`${CarApi.baseUrl}cars/`);
      carList = data;
    } catch (error) {
      console.log('getCarList: error => ', error);
    }
    return carList;
  }

  static async getManufacturersList<IManufactures>() {
    let manufactureList = [];
    try {
      const {data} = await axios.get(`${CarApi.baseUrl}manufacturers/`);
      manufactureList = data.manufacturers;
    } catch (error) {
      console.log('getCarList: error => ', error);
    }

    return manufactureList;
  }

  static async getColorsList<IColors>() {
    let colors = [];
    try {
      const {data} = await axios.get(`${CarApi.baseUrl}colors/`);
      colors = data.colors;
    } catch (error) {
      console.log('getCarList: error => ', error);
    }
    return colors;
  }

  static async getCarByStockNumber<ICar>(stocknumber: number) {
    let car;
    try {
      const {data} = await axios.get(`${CarApi.baseUrl}cars/${stocknumber}`);
      car = data;
    } catch (error) {
      console.log('getCarList: error => ', error);
    }
    return car;
  }
}

export default CarApi;
