import React, { FC } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const WheelChart:FC<any> = ({ref}) => {
  const data = {
    labels: [
      'Section 1', 'Section 2', 'Section 3', 'Section 4', 
      'Section 5', 'Section 6', 'Section 7', 'Section 8', 
      'Section 9', 'Section 10', 'Section 11', 'Section 12'
    ],
    datasets: [
      {
        label: 'Points Distribution',
        data: Array(12).fill(1), // Each section has equal weight
        backgroundColor: [
          '#ff6384', '#36a2eb', '#cc65fe', '#ffce56',
          '#e7e9ed', '#ff9f40', '#4bc0c0', '#9966ff',
          '#ff6384', '#36a2eb', '#cc65fe', '#ffce56',
        ],
        hoverBackgroundColor: [
          '#ff6384', '#36a2eb', '#cc65fe', '#ffce56',
          '#e7e9ed', '#ff9f40', '#4bc0c0', '#9966ff',
          '#ff6384', '#36a2eb', '#cc65fe', '#ffce56',
        ]
      },
    ],
  };

  const options: any = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
    },
  };

  return (
    <div className="flex justify-center items-center h-full" ref={ref}>
      <div className="w-full">
        <Pie data={data} options={options} width={'250px'} height={'250px'} />
      </div>
    </div>
  );
};

export default WheelChart;
