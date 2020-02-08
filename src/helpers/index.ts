import {IManufacture} from '../api';

export const carsListMock = new Array(10).fill({}).map(() => ({
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
}));

export const getManufacturersNames = (manufacturersList: IManufacture[]) => {
  return manufacturersList.map(
    (manufacturer: IManufacture) => manufacturer.name,
  );
};
