// When performing outside-in TDD, our first step is to create an end-to-end test
// describing the feature we want users to be able to do.

const API_KEY = Cypress.env('API_KEY');

describe('Listing Restaurants', () => {
  it('shows restaurants from the server', () => {
    const sushiPlace = 'Sushi Place';
    const pizzaPlace = 'Pizza Place';

    // cy.server lets us stub calls to the backend
    // {force404: true} - So that our E2E test don't hit the real backend
    // https://outsidein.dev/react/3-vertical-slice.html#end-to-end-test
    cy.server({force404: true});

    // cy.route lets us stub a specific request, GET/POST/PUT, to the backend
    cy.route({
      method: 'GET',
      url: `https://outside-in-dev-api.herokuapp.com/${API_KEY}/restaurants`,
      response: [
        {id: 1, name: sushiPlace},
        {id: 2, name: pizzaPlace},
      ],
    });

    // we visit the root of our app to see if the restaurants names can be found
    // on the page. If they can, we know we have a successful response
    cy.visit('/');
    cy.contains(sushiPlace);
    cy.contains(pizzaPlace);
  });
});

// Generally you should check multiple behaviors per test in end-to-end tests. Why?
// End-to-end tests are slower, so the overhead of the repeating the steps would
// significantly slow down our suite as it grows.
