import React from 'react';
import {queryByText, render} from '@testing-library/react';
import {RestaurantList} from '../RestaurantList';

describe('RestaurantList', () => {
  const restaurants = [
    {id: 1, name: 'Sushi Place'},
    {id: 2, name: 'Pizza Place'},
  ];

  let loadRestaurants;
  let context;

  const renderWithProps = (propsOverrides = {}) => {
    const props = {
      loadRestaurants: jest.fn().mockName('loadRestaurants'),
      loading: false,
      restaurants,
      ...propsOverrides,
    };
    // we don't want to connect to our real Redux store
    // so we create a mock function - loadRestaurants
    // that is passed in the way Redux dispatch function is
    // then we can run expectations on those mock functions
    loadRestaurants = props.loadRestaurants;

    // render the Component and pass props to it as we would
    // do in produciont code
    context = render(<RestaurantList {...props} />);
  };

  // Although not all of these variables are needed for both tests, it's okay
  // to set them up for both. This sets up a component in a good default state,
  // so each test can stay focused on what it wants to assert.

  it('loads restaurants on first render', () => {
    renderWithProps();
    // loadRestaurants passed to props and called inside useEffect
    expect(loadRestaurants).toHaveBeenCalled();
  });

  it('displays the loading indicator while loading', () => {
    renderWithProps({loading: true});
    const {queryByTestId} = context;
    expect(queryByTestId('loading-indicator')).not.toBeNull();
  });

  describe('when loading succeeds', () => {
    beforeEach(() => {
      renderWithProps();
    });

    it('does not display the loading indictor while not loading', () => {
      const {queryByTestId} = context;
      expect(queryByTestId('loading-indicator')).toBeNull();
    });

    it('displays the restaurants', () => {
      const {queryByText} = context;
      // queryByText finds an element containing the passed-in text.
      // If found, queryByText returns a reference to the element;
      // if not found, it returns null
      expect(queryByText('Sushi Place')).not.toBeNull();
      expect(queryByText('Pizza Place')).not.toBeNull();
    });

    it('does not display the error message', () => {
      const {queryByText} = context;
      expect(queryByText('Restaurants could not be loaded.')).toBeNull();
    });
  });

  describe('when loading fails', () => {
    beforeEach(() => {
      renderWithProps({loadError: true});
    });

    it('displays the error message', () => {
      const {queryByText} = context;
      expect(queryByText('Restaurants could not be loaded.')).not.toBeNull();
    });
  });
});

// Why two it blocks?
// There is a common testing principle to check one behavior per
// test in unit tests. In our first test we checked the loading
// behavior, and in this test we are checking the
// restaurant-display behavior - "run one expectation per test"

// In the TDD cycle, whenever the tests go green, look for opportunities to refactor,
