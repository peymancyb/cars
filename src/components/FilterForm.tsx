import React, { useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import brandColors from '../constants/colors';
import Button from './Button';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(4),
    color: theme.palette.text.secondary,
    borderColor: brandColors.silver,
    borderStyle: 'solid',
    borderWidth: '1px',
    display: 'flex',
    flexDirection: 'column',
  },
  formControl: {
    margin: theme.spacing(1),
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  carCard: {
    margin: theme.spacing(2),
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 24,
  },
}));

interface ICarModel {
  name: string;
}

interface IManufacture {
  name: string;
  models?: ICarModel[];
}

interface IFilterOptions {
  color: string;
  manufacture: string;
}

interface IFilterForm{
  manufactureList: string[];
  colors: string[];
  onFilter: (filterOptions: IFilterOptions) => void;
}

function FilterForm({
  colors, manufactureList, onFilter,
}: IFilterForm) {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedManufacture, setSelectedManufacture] = useState(manufactureList[0]);

  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div>
        <FormControl variant="outlined" className={classes.formControl}>
          <FormLabel htmlFor="color-label">Color</FormLabel>
          <Select
            labelId="color-label"
            id="color-label-id"
            value={selectedColor}
            onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
              console.log('onColorSelect -> ', event.target.value);
              setSelectedColor(event.target.value as string);
            }}
            displayEmpty
            className={classes.selectEmpty}
          >
            {colors.map((color) => <MenuItem key={color} value={color}>{color}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          <FormLabel htmlFor="Manufacturer-label">Manufacturer</FormLabel>
          <Select
            labelId="Manufacturer-label"
            id="Manufacturer-label-id"
            value={selectedManufacture}
            onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
              console.log('onManufactureSelect -> ', event.target.value);
              setSelectedManufacture(event.target.value as string);
            }}
            displayEmpty
            className={classes.selectEmpty}
          >
            {manufactureList.map((manufacture) => <MenuItem key={manufacture} value={manufacture}>{manufacture}</MenuItem>)}
          </Select>
        </FormControl>
      </div>
      <div className={classes.buttonContainer}>
        <Button
          text="Filter"
          onPress={() => onFilter({
            color: selectedColor,
            manufacture: selectedManufacture,
          })}
        />
      </div>
    </div>
  );
}
export default FilterForm;
