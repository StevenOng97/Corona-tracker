import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as Chartjs, registerables } from 'chart.js';

import styles from './Chart.scss';

Chartjs.register(...registerables);

const Chart = ({ data }) => {
  const labelArray = data.map((x) => x.title);
  const countArray = data.map((x) => x.count);

  const barChart =
    data.length > 0 ? (
      <Bar
        data={{
          labels: labelArray,
          datasets: [
            {
              label: 'People',
              backgroundColor: ['#c9302c', '#28a745', 'gray'],
              data: countArray,
            },
          ],
        }}
        options={{
          aspectRatio: 2,
          legend: {
            position: 'bottom',
          },
        }}
      />
    ) : null;
  return <div className={styles.container}>{barChart}</div>;
};

export default Chart;
