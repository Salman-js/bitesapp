import axios from 'axios';

export async function getRestaurants() {
  return axios
    .get('https://6cd7-2605-6440-4011-4000-00-12b9.ngrok.io/restaurants', {
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
      'https://6cd7-2605-6440-4011-4000-00-12b9.ngrok.io/restaurants?type=featured',
      {
        params: { _sort: 'id' },
      }
    )
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
}
