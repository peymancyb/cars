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
  const setLoading = (isLoading: boolean) => {
    dispatch({
      type: types.LOADING_STATE_CHANGED,
      data: isLoading,
    });
  };

  const getCarList = useCallback(async (filterOptions, activePage) => {
    const manufacture =
      filterOptions.manufacture === allManufacturers
        ? ''
        : filterOptions.manufacture;
    const color = filterOptions.color === allColors ? '' : filterOptions.color;
    const {sortBy} = filterOptions;
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
  }, []);

  const updateCarList = useCallback(
    async (filterOptions, selectedPage) => {
      try {
        setLoading(true);
        await getCarList(filterOptions, selectedPage);
        setLoading(false);
      } catch (error) {
        console.log('updateCarList:error', error);
      }
    },
    [getCarList],
  );

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
      updateCarList(state.filter, selectedPage);
    },
    [state.filter, state.pagination, updateCarList],
  );

  const getInitialState = useCallback(async () => {
    try {
      setLoading(true);
      const [colorsList, manufacturersList] = await Promise.all([
        CarApi.getColorsList(),
        CarApi.getManufacturersList(),
        getCarList(state.filter, state.pagination.active),
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
  }, [getCarList, state.filter, state.formOptions, state.pagination.active]);

  useEffect(() => {
    getInitialState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setFilter = (filterOptions: IFilterOptions) => {
    const firstPage = 1;
    dispatch({
      type: types.SET_FILTER_OPTIONS,
      data: filterOptions,
    });
    dispatch({
      type: types.PAGINATION_ACTIVE_CHANGED,
      data: firstPage,
    });
    updateCarList(filterOptions, firstPage);
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
