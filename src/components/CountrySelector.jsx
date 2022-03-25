import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  NativeSelect,
  FormControl,
  InputLabel,
  Grid,
} from '@mui/material';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: `${theme.spacing(3)}px 0`,
    minWidth: 120,
  },
  label: {
    marginLeft: '-14px',
  },
}));

const CountrySelector = ({ handleChange, countries }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={2} mt={2}>
      <Grid item xs={4}>
        <FormControl fullWidth className={classes.formControl}>
          <InputLabel className={classes.label} shrink htmlFor="country">
            Country
          </InputLabel>
          <NativeSelect
            defaultValue={null}
            inputProps={{
              name: 'country',
              id: 'country',
            }}
            onChange={handleChange}
          >
            {countries &&
              countries.map((country, i) => (
                <option value={country.ISO2} key={i}>
                  {country.Country}
                </option>
              ))}
          </NativeSelect>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default CountrySelector;
