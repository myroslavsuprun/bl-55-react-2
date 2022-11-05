import axios from 'axios';

const API_KEY = '563492ad6f917000010000010732609acd92409abbdaf7d1d1322729';
axios.defaults.baseURL = 'https://api.pexels.com/v1/';
axios.defaults.headers.common['authorization'] = API_KEY;

axios.defaults.params = {
  orientation: 'landscape',
  per_page: 15,
};

export const getImages = async (query, page) => {
  const { data } = await axios.get(`search?query=${query}&page=${page}`);
  return data;
};
