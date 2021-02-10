export const START_LOADING = 'START_LOADING';
export const STORE_RESTAURANTS = 'STORE_RESTAURANTS';
export const RECORD_LOADING_ERROR = 'RECORD_LOADING_ERROR';

export const loadRestaurants = () => (dispatch, getState, api) => {
  dispatch(startLoading());
  api
    .loadRestaurants()
    .then(records => {
      console.log(records);
      dispatch(storeRestaurants(records));
    })
    .catch(() => dispatch(recordLoadingError()));
};

const startLoading = () => ({type: START_LOADING});

const recordLoadingError = () => ({type: RECORD_LOADING_ERROR});

const storeRestaurants = records => ({
  type: STORE_RESTAURANTS,
  records,
});
