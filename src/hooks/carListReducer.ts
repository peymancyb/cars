import {ICars} from '../api';
import {carsListMock} from '../helpers';

export enum types {
  PAGINATION_ACTIVE_CHANGED = 'PAGINATION_ACTIVE_CHANGED',
  PAGINATION_TOTAL_CHANGED = 'PAGINATION_TOTAL_CHANGED',
  SET_FILTER_OPTIONS = 'SET_FILTER_OPTIONS',
  LOADING_STATE_CHANGED = 'LOADING_STATE_CHANGED',
  SET_CAR_LIST = 'SET_CAR_LIST',
  SET_FORM_OPTIONS = 'SET_FORM_OPTIONS',
}

export interface IFilterOptions {
  color: string;
  manufacture: string;
  sortBy: string;
}

export interface ISort {
  title: string;
  value: string;
}

interface IFilterState {
  color: string;
  manufacture: string;
  sortBy: string;
}

interface IFormOptions {
  colors: string[];
  manufacturers: string[];
  sortList: ISort[];
}

interface IPaginationState {
  active: number;
  total: number;
}

interface ICarlistState {
  loading: boolean;
  pagination: IPaginationState;
  carsList: ICars;
  formOptions: IFormOptions;
  filter: IFilterState;
}

interface IAction {
  type: string;
  data?: any;
}

export const allColors = 'All car colors';
export const allManufacturers = 'All manufacturers';
const allSortOptions: ISort[] = [
  {title: 'None', value: ''},
  {title: 'Mileage - Ascending', value: 'asc'},
  {title: 'Mileage - Descending', value: 'des'},
];

export const carListInitialState = {
  loading: true,
  pagination: {
    active: 1,
    total: 1,
  },
  carsList: {
    cars: carsListMock,
    totalPageCount: 0,
    totalCarsCount: 0,
  },
  formOptions: {
    colors: [allColors],
    manufacturers: [allManufacturers],
    sortList: allSortOptions,
  },
  filter: {
    color: allColors,
    manufacture: allManufacturers,
    sortBy: allSortOptions[0].value,
  },
};

function carListReducer(state: ICarlistState, action: IAction) {
  switch (action.type) {
    case types.PAGINATION_ACTIVE_CHANGED:
      return {
        ...state,
        pagination: {
          total: state.pagination.total,
          active: action.data,
        },
      };
    case types.PAGINATION_TOTAL_CHANGED:
      return {
        ...state,
        pagination: {
          total: action.data,
          active: state.pagination.active,
        },
      };
    case types.SET_FILTER_OPTIONS:
      return {...state, filter: action.data};
    case types.LOADING_STATE_CHANGED:
      return {...state, loading: action.data};
    case types.SET_CAR_LIST:
      return {...state, carsList: action.data};
    case types.SET_FORM_OPTIONS:
      return {...state, formOptions: action.data};
    default:
      return state;
  }
}

export default carListReducer;
