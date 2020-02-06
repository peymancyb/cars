import React, {useCallback, useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Layout from '../components/Layout';
import CarApi from '../api';
import Button from '../components/Button';

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

function CardDetails() {
  const [carDetails, setCarDetails] = useState<ICar | null>(null);
  const {stockNumber} = useParams();

  const getCar = useCallback(async () => {
    try {
      const {car} = await CarApi.getCarByStockNumber(stockNumber!);
      setCarDetails(car);
    } catch (error) {
      console.log('error -> ', error);
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

  if (!carDetails) {
    return null;
  }

  return (
    <Layout>
      <div className="car-details-container">
        <div className="car-image-container">
          <img
            style={{marginLeft: 'auto', marginRight: 'auto', display: 'block'}}
            src={carDetails.pictureUrl}
            alt={`car-${carDetails.stockNumber}`}
          />
        </div>
        <div className="car-details-view">
          <div style={{width: 450}}>
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
            <Button className="align-right" onPress={() => {}} text="Save" />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CardDetails;
