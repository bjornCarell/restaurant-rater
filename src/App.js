import React from 'react';
import {Provider} from 'react-redux';
import store from './store';
import RestaurantScreen from './components/RestaurantScreen';

const App = () => (
  <div>
    <Provider store={store}>
      <RestaurantScreen />
    </Provider>
  </div>
);

export default App;
