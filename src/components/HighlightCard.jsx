import React from 'react';
import { CardContent, Typography, Card } from '@material-ui/core';
import { Skeleton } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';

import CountUp from 'react-countup';
import Fade from '@mui/material/Fade';

const useStyles = makeStyles({
  wrapper: (props) => {
    if (props.color === 'danger') return { borderLeft: '5px solid #c9302c' };
    if (props.color === 'success') return { borderLeft: '5px solid #28a745' };
    else return { borderLeft: '5px solid gray' };
  },
  title: (props) => {
    if (props.color === 'danger')
      return { color: '#c9302c', fontSize: 18, marginBottom: 5 };
    if (props.color === 'success')
      return { color: '#28a745', fontSize: 18, marginBottom: 5 };
    else return { color: 'gray', fontSize: 18, marginBottom: 5 };
  },
  count: { fontWeight: 'bold', fontSize: 18 },
});

export default function HighlightCard({ title, count, color, isLoading }) {
  const classes = useStyles({ color });
  return (
    <Card className={classes.wrapper}>
      <CardContent>
        <Typography variant="body2" component="p" className={classes.title}>
          {title}
        </Typography>
        {!count && isLoading ? (
          <Skeleton
            animation="wave"
            height="50px"
            width="80%"
            style={{ marginBottom: 6 }}
          />
        ) : (
          <Fade in={true}>
            <Typography
              variant="body2"
              component="span"
              className={classes.count}
            >
              <CountUp end={count} separator="," duration={2} />
            </Typography>
          </Fade>
        )}
      </CardContent>
    </Card>
  );
}
