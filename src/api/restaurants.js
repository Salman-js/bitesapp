import axios from 'axios';
import { URI } from './constants';

export async function getRestaurants() {
  return axios
    .get(`${URI}/restaurants`, {
      params: { _sort: 'name' },
    })
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
}

export async function getFeaturedRestaurants() {
  return axios
    .get(`${URI}/restaurants?type=featured`, {
      params: { _sort: 'id' },
    })
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
}
