import React from 'react';
import { Grid, Box } from '@mui/material';
import HighlightCard from './HighlightCard';

const Summary = ({ summary, isLoading }) => {
  return (
    <Grid container spacing={2} mt={4}>
      {summary.map(({ title, count, color }, i) => (
        <Grid item xs={4} key={i}>
          <Box sx={{ minWidth: 275 }}>
            <HighlightCard
              title={title}
              count={count}
              color={color}
              isLoading={isLoading}
            />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default Summary;
