import {combineReducers} from 'redux';
import {STORE_RESTAURANTS} from './actions';

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

const loading = () => true;

export default combineReducers({
  records,
  loading,
});
