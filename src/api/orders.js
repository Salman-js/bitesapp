import axios from 'axios';
import { URI } from './constants';

export async function getOrders() {
  return axios
    .get(`${URI}/orders`)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
}
