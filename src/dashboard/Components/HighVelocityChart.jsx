import React, { PureComponent } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import _get from 'lodash/get'

export default class HighVelocityChart extends PureComponent {

  handleData = () => {
    let data = _get(this.props, 'highVelocityOrders', []);
    let array = [];
    (data || []).map((data) => {
      array.push(
        {name: data.product.name, HighVelocity: data.velocity}
      )
    })
    
    return array

  }

  render() {
    return (
      <BarChart
        width={600}
        height={300}
        data={this.handleData()}
        margin={{
          top: 30, right: 0, left: 0, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="HighVelocity" fill="#8884d8" />
      </BarChart>
    );
  }
}
