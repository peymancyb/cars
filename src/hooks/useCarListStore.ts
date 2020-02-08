import {useCallback, useEffect, useReducer} from 'react';
import CarApi from '../api';
import carListReducer, {
  carListInitialState,
  types,
  IFilterOptions,
  allColors,
  allManufacturers,
} from './carListReducer';
import {getManufacturersNames} from '../helpers';

function useCarListStore() {
  const [state, dispatch] = useReducer(carListReducer, carListInitialState);
  console.log('useCarListStore:state -> ', state);
  const setLoading = (isLoading: boolean) => {
    dispatch({
      type: types.LOADING_STATE_CHANGED,
      data: isLoading,
    });
  };

  const getCarList = useCallback(async () => {
    const manufacture =
      state.filter.manufacture === allManufacturers
        ? ''
        : state.filter.manufacture;
    const color = state.filter.color === allColors ? '' : state.filter.color;
    const {sortBy} = state.filter;
    console.log('sortBy: filter -> ', sortBy);
    const activePage = state.pagination.active;
    window.scrollTo(0, 0);
    const carList = await CarApi.getCarList(
      activePage,
      manufacture,
      color,
      sortBy,
    );
    dispatch({
      type: types.SET_CAR_LIST,
      data: carList,
    });
    dispatch({
      type: types.PAGINATION_TOTAL_CHANGED,
      data: carList.totalPageCount,
    });
  }, [state.filter, state.pagination]);

  const updateCarList = useCallback(async () => {
    try {
      setLoading(true);
      await getCarList();
      setLoading(false);
    } catch (error) {
      console.log('updateCarList:error', error);
    }
  }, [getCarList]);

  const onChangePage = useCallback(
    async page => {
      let selectedPage = page;
      const {total} = state.pagination;
      selectedPage = selectedPage > total ? total : selectedPage;
      selectedPage = selectedPage < 1 ? 1 : selectedPage;
      dispatch({
        type: types.PAGINATION_ACTIVE_CHANGED,
        data: selectedPage,
      });
      updateCarList();
    },
    [state.pagination, updateCarList],
  );

  const getInitialState = useCallback(async () => {
    try {
      setLoading(true);
      const [colorsList, manufacturersList] = await Promise.all([
        CarApi.getColorsList(),
        CarApi.getManufacturersList(),
        getCarList(),
      ]);
      const manufacturersNames = getManufacturersNames(manufacturersList);
      dispatch({
        type: types.SET_FORM_OPTIONS,
        data: {
          ...state.formOptions,
          colors: [...state.formOptions.colors, ...colorsList],
          manufacturers: [
            ...state.formOptions.manufacturers,
            ...manufacturersNames,
          ],
        },
      });
      setLoading(false);
    } catch (error) {
      console.log('error -> ', error);
    }
  }, [getCarList, state.formOptions]);

  useEffect(() => {
    getInitialState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setFilter = (filterOptions: IFilterOptions) => {
    console.log('filterOptions -> ', filterOptions);
    dispatch({
      type: types.SET_FILTER_OPTIONS,
      data: filterOptions,
    });
    dispatch({
      type: types.PAGINATION_ACTIVE_CHANGED,
      data: 1,
    });
    updateCarList();
  };

  return {
    loading: state.loading,
    carsList: state.carsList,
    formOptions: state.formOptions,
    setFilter,
    pagination: state.pagination,
    onChangePage,
  };
}

export default useCarListStore;
