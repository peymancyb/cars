import axios from 'axios';

type IColors = string[];

interface ICarModel {
  name: string;
}

export interface IManufacture {
  name: string;
  models: ICarModel[];
}

type IManufactures = IManufacture[];

export interface ICar {
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

export interface ICars {
  totalPageCount: number;
  totalCarsCount: number;
  cars: ICar[];
}

interface IStockNumberData {
  car: ICar;
}

const endpointUrl = 'https://auto1-mock-server.herokuapp.com/api/';

class CarApi {
  static async getCarList(
    page: number = 1,
    manufacturer: string = '',
    color: string = '',
    srotBy: string = '',
  ): Promise<ICars> {
    let carList;
    try {
      const {data} = await axios.get(
        `${endpointUrl}cars/?page=${page}&manufacturer=${manufacturer}&color=${color}&sort=${srotBy} `,
      );
      carList = data;
    } catch (error) {
      console.log('getCarList: error => ', error.message);
    }
    return carList;
  }

  static async getManufacturersList(): Promise<IManufactures> {
    let manufactureList = [];
    try {
      const {data} = await axios.get(`${endpointUrl}manufacturers/`);
      manufactureList = data.manufacturers;
    } catch (error) {
      console.log('getManufacturersList: error => ', error.message);
    }
    return manufactureList;
  }

  static async getColorsList(): Promise<IColors> {
    let colors = [];
    try {
      const {data} = await axios.get(`${endpointUrl}colors/`);
      colors = data.colors;
    } catch (error) {
      console.log('getColorsList: error => ', error.message);
    }
    return colors;
  }

  static async getCarByStockNumber(
    stocknumber: string,
  ): Promise<IStockNumberData> {
    let car;
    try {
      const {data} = await axios.get(`${endpointUrl}cars/${stocknumber}`);
      car = data;
    } catch (error) {
      console.log('getCarByStockNumber: error => ', error.message);
    }
    return car;
  }
}

export default CarApi;
