import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
  baseURL: 'https://api.covid19api.com',
  headers: {
    'content-type': 'application/json'
  },
  paramsSerializer: params => queryString.stringify(params)
})

axiosClient.interceptors.request.use(async (config) => config);

axiosClient.interceptors.response.use((response) => {
  if (response && response.data) {
    return response.data;
  }

  return response;
}, (error) => {
  const errorMessage = error.response.data.error;
  throw (errorMessage || error);
})

export default axiosClient;

