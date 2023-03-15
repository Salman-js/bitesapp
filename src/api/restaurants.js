import axios from 'axios';

export async function getRestaurants() {
  return axios
    .get('https://75b9-2a0d-5600-44-4000-00-3401.ap.ngrok.io/restaurants', {
      params: { _sort: 'name' },
    })
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
}

export async function getFeaturedRestaurants() {
  return axios
    .get(
      'https://75b9-2a0d-5600-44-4000-00-3401.ap.ngrok.io/restaurants?type=featured',
      {
        params: { _sort: 'id' },
      }
    )
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
}
