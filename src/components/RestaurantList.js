import React, {useEffect} from 'react';
import {connect} from 'react-redux';

export const RestaurantList = ({loadRestaurants, restaurants}) => {
  useEffect(() => {
    loadRestaurants();
  }, [loadRestaurants]);

  return (
    <ul>
      {restaurants.map(restaurant => (
        <li key={restaurant.id}>{restaurant.name}</li>
      ))}
    </ul>
  );
};

const mapStateToProps = state => ({
  restaurant: state.restaurants.records,
});

export default connect(mapStateToProps)(RestaurantList);

/* 

This time, in addition to the default export, we also do a named 
export of the component. This is because later our default export 
will be the RestaurantList connected to Redux, but we will also 
want access to the unconnected component for testing.


*/
