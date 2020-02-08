import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import brandColors from '../constants/colors';
import {ICar} from '../api';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  formControl: {
    margin: theme.spacing(1),
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  formButton: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'flex-end',
  },
  carCard: {
    boxShadow: 'none',
    display: 'flex',
    alignItems: 'center',
  },
  cardContainer: {
    borderStyle: 'solid',
    borderColor: brandColors.silver,
    borderWidth: 1,
    marginTop: 18,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
}));

interface ICarList {
  loading: boolean;
  cars: ICar[];
  removable?: boolean;
  onRemoveItem?: (stockNumber: number) => void;
}

interface ILoadingCarItem {
  loading: boolean;
  car?: ICar;
  removable?: boolean;
  onRemoveItem?: (stockNumber: number) => void;
}

function CarItem({loading, car, removable, onRemoveItem}: ILoadingCarItem) {
  const classes = useStyles();
  return (
    <div className={classes.cardContainer}>
      <Card className={classes.carCard}>
        <CardContent>
          {loading ? (
            <Skeleton animation="wave" variant="rect" width={120} height={90} />
          ) : (
            <img
              alt={car?.modelName}
              src={car?.pictureUrl}
              width={120}
              height={90}
            />
          )}
        </CardContent>
        <CardContent className={classes.content}>
          {loading ? (
            <Skeleton animation="wave" height={50} width="80%" />
          ) : (
            <p className="head-text">
              {`${car?.manufacturerName} ${car?.modelName}`}
            </p>
          )}
          {loading ? (
            <Skeleton animation="wave" height={30} width="80%" />
          ) : (
            <Typography style={{textAlign: 'left'}}>
              {`Stock #${car?.stockNumber} - ${
                car?.mileage.number
              } ${car?.mileage.unit.toUpperCase()} - ${car?.fuelType} - ${
                car?.color
              }`}
            </Typography>
          )}

          {loading ? (
            <Skeleton animation="wave" height={40} width="40%" />
          ) : (
            <Link href={`/car/${car?.stockNumber}`} className="details-text">
              View details
            </Link>
          )}
          {removable ? (
            <p
              onClickCapture={() =>
                onRemoveItem && onRemoveItem(car!.stockNumber)
              }>
              remove
            </p>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}

function CarList({loading, cars, removable, onRemoveItem}: ICarList) {
  return (
    <div>
      {cars.map(car => (
        <CarItem
          key={car.stockNumber}
          loading={loading}
          car={car}
          removable={removable}
          onRemoveItem={onRemoveItem}
        />
      ))}
    </div>
  );
}

export default CarList;
