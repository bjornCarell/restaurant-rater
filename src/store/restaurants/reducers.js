import {combineReducers} from 'redux';
import {
  START_LOADING,
  STORE_RESTAURANTS,
  RECORD_LOADING_ERROR,
} from './actions';

// in redux we must follow the design state = []
// otherwise we get: Reducer "records" returned undefined during initialization.
// If the state passed to the reducer is undefined, you must explicitly return
//the initial state. The initial state may not be undefined. If you don't want
// to set a value for this reducer, you can use null instead of undefined.
const records = (state = [], action) => {
  const {type} = action;
  switch (type) {
    case STORE_RESTAURANTS:
      return action.records;
    default:
      return state;
  }
};

const loading = (state = false, action) => {
  switch (action.type) {
    case START_LOADING:
      return true;
    case STORE_RESTAURANTS:
      return false;
    default:
      return state;
  }
};

const loadError = (state = false, action) => {
  switch (action.type) {
    case RECORD_LOADING_ERROR:
      return true;
    default:
      return state;
  }
};

export default combineReducers({
  records,
  loading,
  loadError,
});
