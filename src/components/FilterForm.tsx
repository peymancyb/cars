import React, {useState} from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {makeStyles} from '@material-ui/core/styles';
import brandColors from '../constants/colors';
import Button from './Button';
import {ISort, IFilterOptions} from '../hooks/carListReducer';

const useStyles = makeStyles(theme => ({
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

interface IFilterForm {
  manufactureList: string[];
  colors: string[];
  sortList: ISort[];
  onFilter: (filterOptions: IFilterOptions) => void;
}

function FilterForm({
  colors,
  manufactureList,
  sortList,
  onFilter,
}: IFilterForm) {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedManufacture, setSelectedManufacture] = useState(
    manufactureList[0],
  );
  const [selectedSort, setSelectedSort] = useState(sortList[0].value);
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
            onChange={(event: React.ChangeEvent<{value: unknown}>) => {
              setSelectedColor(event.target.value as string);
            }}
            displayEmpty
            className={classes.selectEmpty}>
            {colors.map(color => (
              <MenuItem key={color} value={color}>
                {color}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          <FormLabel htmlFor="Manufacturer-label">Manufacturer</FormLabel>
          <Select
            labelId="Manufacturer-label"
            id="Manufacturer-label-id"
            value={selectedManufacture}
            onChange={(event: React.ChangeEvent<{value: unknown}>) => {
              setSelectedManufacture(event.target.value as string);
            }}
            displayEmpty
            className={classes.selectEmpty}>
            {manufactureList.map(manufacture => (
              <MenuItem key={manufacture} value={manufacture}>
                {manufacture}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          <FormLabel htmlFor="Manufacturer-label">Sort by</FormLabel>
          <Select
            labelId="Manufacturer-label"
            id="Manufacturer-label-id"
            value={selectedSort}
            onChange={(event: React.ChangeEvent<{value: unknown}>) => {
              setSelectedSort(event.target.value as string);
            }}
            displayEmpty
            className={classes.selectEmpty}>
            {sortList.map(sort => (
              <MenuItem key={sort.value} value={sort.value}>
                {sort.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className={classes.buttonContainer}>
        <Button
          text="Filter"
          onPress={() =>
            onFilter({
              color: selectedColor,
              manufacture: selectedManufacture,
              sortBy: selectedSort,
            })
          }
        />
      </div>
    </div>
  );
}
export default FilterForm;
