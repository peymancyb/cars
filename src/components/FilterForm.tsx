import React, {useState} from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {makeStyles} from '@material-ui/core/styles';
import brandColors from '../constants/colors';
import Button from './Button';
import {IMenuItem, IFilterOptions} from '../hooks/carListReducer';

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
  manufactureList: IMenuItem[];
  colors: IMenuItem[];
  sortList: IMenuItem[];
  onFilter: (filterOptions: IFilterOptions) => void;
}

interface IFilterSelect {
  children?: React.ReactNode;
  labelText: string;
  value: string;
  onChange: (value: string) => void;
}

function FilterSelect({labelText, value, onChange, children}: IFilterSelect) {
  const classes = useStyles();
  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <FormLabel htmlFor={`color-label-${labelText}`}>{labelText}</FormLabel>
      <Select
        labelId={`color-label-${labelText}`}
        id={`color-label-${labelText}-id`}
        value={value}
        onChange={(event: React.ChangeEvent<{value: unknown}>) => {
          onChange(event.target.value as string);
        }}
        displayEmpty
        className={classes.selectEmpty}>
        {children}
      </Select>
    </FormControl>
  );
}

function FilterForm({
  colors,
  manufactureList,
  sortList,
  onFilter,
}: IFilterForm) {
  const [selectedColor, setSelectedColor] = useState(colors[0].value);
  const [selectedManufacture, setSelectedManufacture] = useState(
    manufactureList[0].value,
  );
  const [selectedSort, setSelectedSort] = useState(sortList[0].value);
  const classes = useStyles();

  return (
    <div data-testid="filter-form-component" className={classes.container}>
      <div>
        <FilterSelect
          labelText="Color"
          value={selectedColor}
          onChange={setSelectedColor}>
          {colors.map(color => (
            <MenuItem key={`${color.title}-${color.value}`} value={color.value}>
              {color.title}
            </MenuItem>
          ))}
        </FilterSelect>
        <FilterSelect
          labelText="Manufacturer"
          value={selectedManufacture}
          onChange={setSelectedManufacture}>
          {manufactureList.map(manufacture => (
            <MenuItem
              key={`${manufacture.title}-${manufacture.value}`}
              value={manufacture.value}>
              {manufacture.title}
            </MenuItem>
          ))}
        </FilterSelect>
        <FilterSelect
          labelText="Sort by"
          value={selectedSort}
          onChange={setSelectedSort}>
          {sortList.map(sort => (
            <MenuItem key={sort.value} value={sort.value}>
              {sort.title}
            </MenuItem>
          ))}
        </FilterSelect>
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
