import React, { useCallback, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import CarApi from '../api';
import Button from '../components/Button'
import brandColors from '../constants/colors';


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
  const { stockNumber } = useParams();
  console.log('stockNumber -> ', stockNumber);

  const getCar = useCallback(async () => {
    try {
      const { car } = await CarApi.getCarByStockNumber(Number(stockNumber));
      console.log('car -> ', car);
      setCarDetails(car);
    } catch (error) {
      console.log('error -> ', error);
    }
  }, []);

  useEffect(() => {
    getCar();
  }, []);

  if (!carDetails) {
    return null;
  }

  return (
    <Layout>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <img style={{marginLeft: 'auto', marginRight: 'auto', display: 'block'}} src={carDetails.pictureUrl} alt={`car-${carDetails.stockNumber}`} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 24, marginLeft:48, marginRight: 48 }}>
          <div style={{ flex: 2 }}>
            <p>
              {carDetails.manufacturerName}
              {' '}
              {carDetails.modelName}
            </p>
            <p>
              {`Stock #${carDetails?.stockNumber} - ${carDetails?.mileage.number} ${carDetails?.mileage.unit.toUpperCase()} - ${carDetails?.fuelType} - ${carDetails?.color}`}
            </p>
            <p>
              This car is currently available and can be delivered as soon as tomorrow morning. Please be aware that delivery times shown in this page are not definitive and may change due to bad weather conditions.
            </p>
          </div>
          <div style={{ flex: 1, flexDirection: 'row', borderStyle: 'solid', borderWidth: 1, borderColor: brandColors.silver, padding: 24}}>
            <p>If you like this car, click the button and save it in your collection of favourite items.</p>
            <Button className='align-right' onPress={() => {}} text='Save'/>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CardDetails;
