import React, { PureComponent } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const data = [
  {
    name: 'Page A', LowVelocity: 4000, amt: 2400,
  },
  {
    name: 'Page B', LowVelocity: 3000, amt: 2210,
  },
  {
    name: 'Page C', LowVelocity: 2000, amt: 2290,
  },
  {
    name: 'Page D', LowVelocity: 2780, amt: 2000,
  },
  {
    name: 'Page E', LowVelocity: 1890, amt: 2181,
  },
  {
    name: 'Page F', LowVelocity: 2390, amt: 2500,
  },
  {
    name: 'Page G', LowVelocity: 3490, amt: 2100,
  },
];

export default class LowVelocityChart extends PureComponent {

  render() {
    return (
      <BarChart
        width={600}
        height={300}
        data={data}
        margin={{
          top: 30, right: 0, left: 0, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="LowVelocity" fill="#82ca9d" />
      </BarChart>
    );
  }
}
