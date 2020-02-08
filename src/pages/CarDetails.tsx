import React, {useCallback, useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import Layout from '../components/Layout';
import CarApi, {ICar} from '../api';
import Button from '../components/Button';
import LocalStorage from '../api/localStorage';

function CardDetails() {
  const [carDetails, setCarDetails] = useState<ICar | null>(null);
  const [isSave, setIsSave] = useState(false);
  const {stockNumber} = useParams();
  const history = useHistory();

  const getCar = useCallback(async () => {
    try {
      const {car} = await CarApi.getCarByStockNumber(stockNumber!);
      const isSaved = LocalStorage.isCarSaved(car.stockNumber);
      setIsSave(isSaved);
      setCarDetails(car);
    } catch (error) {
      history.push('/');
    }
  }, [stockNumber]);

  useEffect(() => {
    getCar();
  }, [getCar]);

  const getCarName = () => {
    const {manufacturerName, modelName} = carDetails!;
    return `${manufacturerName} ${modelName}`;
  };

  const getCarDetails = () => {
    const {mileage, fuelType, color} = carDetails!;
    return `Stock #${carDetails!.stockNumber} - ${
      mileage.number
    } ${mileage.unit.toUpperCase()} - ${fuelType} - ${color}`;
  };

  const handleOnSaveOrRemove = () => {
    if (!isSave) {
      LocalStorage.addCar(carDetails!);
    } else {
      LocalStorage.removeCar(carDetails!.stockNumber);
    }
    setIsSave(!isSave);
  };

  if (!carDetails) {
    return null;
  }

  return (
    <Layout>
      <div className="car-details-container">
        <div className="car-image-container">
          <img
            className="car-detail-image"
            src={carDetails.pictureUrl}
            alt={`car-${carDetails.stockNumber}`}
          />
        </div>
        <div className="car-details-view">
          <div className="car-detail-desciption">
            <p className="head-text">{getCarName()}</p>
            <p>{getCarDetails()}</p>
            <p>
              This car is currently available and can be delivered as soon as
              tomorrow morning. Please be aware that delivery times shown in
              this page are not definitive and may change due to bad weather
              conditions.
            </p>
          </div>
          <div className="save-box">
            <p>
              If you like this car, click the button and save it in your
              collection of favourite items.
            </p>
            <Button
              className="align-right"
              onPress={handleOnSaveOrRemove}
              text={!isSave ? 'Save' : 'Remove'}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CardDetails;
