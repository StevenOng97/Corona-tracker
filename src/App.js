import './reset.scss';
import './main.scss';
import getCovidApi from './api/getCovidApi';
import { useReducer, useEffect, useState, useCallback, useMemo } from 'react';
import { Typography, Container } from '@mui/material';

import moment from 'moment';
import 'moment/locale/vi';
import CountrySelector from './components/CountrySelector';
import Summary from './components/Summary';
import Chart from './components/Chart';
import { makeStyles } from '@material-ui/core/styles';

moment.locale('en');

const useStyles = makeStyles((theme) => ({
  dangerColor: {
    color: 'red',
    margin: 0
  }
}));

const initialState = {
  countries: [],
  countriesError: null,
  data: [],
  dataError: null,
  isLoading: false,
};

const GET_COUNTRIES = 'GET_COUNTRIES';
const GET_COUNTRIES_SUCCESS = 'GET_COUNTRIES_SUCCESS';
const GET_COUNTRIES_FAILURE = 'GET_COUNTRIES_FAILURE';

const GET_DATA = 'GET_DATA';
const GET_DATA_SUCCESS = 'GET_DATA_SUCCESS';
const GET_DATA_FAILURE = 'GET_DATA_FAILURE';

const getCountries = async () => {
  const countries = await getCovidApi.getCountries();
  const data = countries.sort((a, b) => a.Country.localeCompare(b.Country));
  return data;
};

const getData = async (country) => {
  const data = await getCovidApi.getReportByCountry(country);
  return data;
};

const reducer = (state, action) => {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        isLoading: true,
        countries: [],
      };
    case GET_COUNTRIES_SUCCESS:
      const allCountry = { Country: 'Global', ISO2: null };
      return {
        ...state,
        isLoading: false,
        countries: [allCountry].concat(action.payload),
      };
    case GET_COUNTRIES_FAILURE:
      return {
        ...state,
        isLoading: false,
        countriesError: 'Something went wrong, please try again!',
      };
    case GET_DATA:
      return {
        ...state,
        isLoading: true,
        data: [],
      };
    case GET_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case GET_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        dataError: 'Something went wrong, please try again!',
      };
    default:
      throw new Error('Invalid action.');
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [selectedCountry, setSelectedCountry] = useState(null);
  useEffect(() => {
    const fetchCountries = async () => {
      dispatch({ type: GET_COUNTRIES });
      try {
        const payload = await getCountries();
        dispatch({ type: GET_COUNTRIES_SUCCESS, payload });
      } catch (err) {
        dispatch({ type: GET_COUNTRIES_FAILURE });
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const countryId = selectedCountry ? selectedCountry : '';

    const fetchData = async () => {
      dispatch({ type: GET_DATA });

      const finalCountry =
        state.countries.find((country) => country.ISO2 === countryId) || '';

      try {
        const data = await getData(finalCountry.Slug);
        const payload = data.Global ? data.Global : data.pop();
        dispatch({ type: GET_DATA_SUCCESS, payload });
      } catch (err) {
        dispatch({ type: GET_DATA_SUCCESS });
      }
    };

    fetchData();
  }, [selectedCountry]);

  const handleChange = useCallback((e) => {
    const query = e.target.value === 'Global' ? null : e.target.value;
    setSelectedCountry(query);
  }, []);

  const summary = useMemo(() => {
    if (state.data) {
      const recovered = state.data.TotalRecovered || state.data.Recovered || 0;
      const confirmed = state.data.TotalConfirmed || state.data.Confirmed;
      const deaths = state.data.TotalDeaths || state.data.Deaths;
      return [
        {
          title: 'Confirmed',
          count: confirmed,
          color: 'danger',
        },
        {
          title: 'Recovered',
          count: recovered,
          color: 'success',
        },
        {
          title: 'Deaths',
          count: deaths,
          color: 'secondary',
        },
      ];
    }
    return [];
  }, [state.data]);

  const classes = useStyles();

  return (
    <div className="App">
      <Container sx={{ my: 2 }}>
        <Typography variant="h3" component="h3">
          Corona Tracker
        </Typography>
        <Typography mt={2}>{moment().format('LLL')}</Typography>
        <CountrySelector
          handleChange={handleChange}
          countries={state.countries}
        />

        <Summary summary={summary} isLoading={state.isLoading} />
        <Chart data={summary} />
        {summary.length === 0 && (
          <Typography variant="h4" class={classes.dangerColor}>
            No Information For This Country
          </Typography>
        )}
      </Container>
    </div>
  );
}

export default App;
