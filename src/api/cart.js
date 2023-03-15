import axios from 'axios';

export async function orderCart(order) {
  return axios
    .post('https://75b9-2a0d-5600-44-4000-00-3401.ap.ngrok.io/orders', order)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
}
