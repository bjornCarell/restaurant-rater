import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import restaurantsReducer from '../restaurants/reducers';
import {loadRestaurants} from '../restaurants/actions';

describe('restaurants', () => {
  describe('initially', () => {
    it('does not have the loading flag set', () => {
      const initialState = {};

      const store = createStore(
        restaurantsReducer,
        initialState,
        applyMiddleware(thunk),
      );

      expect(store.getState().loading).toEqual(false);
    });
  });

  describe('loadRestaurants action', () => {
    describe('while loading', () => {
      // the stubbed API
      // the function passed to the promise never calls its arguments
      // so the promise never resolves or rejects, this is ok since
      // what we want to test is what happens before the promise resolves
      const api = {
        loadRestaurants: () => new Promise(() => {}),
      };

      const initialState = {};

      const store = createStore(
        restaurantsReducer,
        initialState,
        applyMiddleware(thunk.withExtraArgument(api)),
      );

      store.dispatch(loadRestaurants());
      expect(store.getState().loading).toEqual(true);
    });

    describe('when loading succeeds', () => {
      // hard coded records
      const records = [
        {id: 1, name: 'Sushi Place'},
        {id: 2, name: 'Pizza Place'},
      ];

      let store;

      beforeEach(() => {
        // ...we won't make an HTTP request directly in our Redux store.
        // Instead, we'll delegate to an API object that we pass in.
        // giving it a loadRestaurants method.
        const api = {
          loadRestaurants: () => Promise.resolve(records),
        };
        // We are stubbing out the API here in the test, so we just
        // implement that method to return a Promise that resolves to
        // our hard-coded records.

        const initialState = {
          records: [],
        };
        // We'll use a real Redux store to run our tests through. That
        // way we are testing our thunks, action creators, and reducers
        // in integration
        store = createStore(
          restaurantsReducer,
          initialState,
          applyMiddleware(thunk.withExtraArgument(api)),
        );
        // .withExtraArgument()
        // allows you to pass an additional argument at setup time that
        // will be available to all thunk functions. This allows us to
        // inject our API.

        return store.dispatch(loadRestaurants());
      });

      it('stores the restaurants', () => {
        expect(store.getState().records).toEqual(records);
      });

      it('clears the loading flag', () => {
        expect(store.getState().loading).toEqual(false);
      });
    });
  });
});

/* 
Our test interacts with the store the way the rest of our application does: by 
dispatching async actions and then observing state changes. Just like the rest 
of our application, our test doesn't know or care about the STORE_RESTAURANTS 
action type; it treats it as an implementation detail. This gives us greater 
flexibility to refactor our store; for example, we could change the way the 
actions that loadRestaurants dispatches are set up. Our tests would continue to 
pass as long as the action type and state stayed the same, which is fittingly 
exactly the contract that the rest of our application relies on as well.
*/

// https://outsidein.dev/react/3-vertical-slice.html#unit-testing-the-store
