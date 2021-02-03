import axios from 'axios';
const API_KEY = process.env.REACT_APP_API_KEY;

const client = axios.create({
  baseURL: `https://outside-in-dev-api.herokuapp.com/${API_KEY}`,
});

const api = {
  loadRestaurants() {
    return client.get('/restaurants').then(response => response.data);
  },
};

export default api;
