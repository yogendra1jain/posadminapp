import React, { PureComponent } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const data = [
  {
    name: 'Page A', HighVelocity: 2400, amt: 2400,
  },
  {
    name: 'Page B', HighVelocity: 1398, amt: 2210,
  },
  {
    name: 'Page C', HighVelocity: 9800, amt: 2290,
  },
  {
    name: 'Page D', HighVelocity: 3908, amt: 2000,
  },
  {
    name: 'Page E', HighVelocity: 4800, amt: 2181,
  },
  {
    name: 'Page F', HighVelocity: 3800, amt: 2500,
  },
  {
    name: 'Page G', HighVelocity: 4300, amt: 2100,
  },
];

export default class HighVelocityChart extends PureComponent {

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
        <Bar dataKey= "HighVelocity" fill="#8884d8" />
      </BarChart>
    );
  }
}
