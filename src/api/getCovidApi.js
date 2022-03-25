import axiosClient from './axiosClient';

const getCovidApi = {
  getCountries: () => {
    const url = '/countries';
    return axiosClient.get(url);
  },

  getReportByCountry: (country) => {
    const url = country ? `/dayone/country/${country}` : `/summary`;
    return axiosClient.get(url);
  },
};

export default getCovidApi;
