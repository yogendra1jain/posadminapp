import React, { PureComponent } from 'react';
import {
  PieChart, Pie, Sector, Tooltip, Cell, Legend
} from 'recharts';
import _get from 'lodash/get';
import _isArray from 'lodash/isArray';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index, name
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default class PaymentMethodPie extends PureComponent {
  render() {
    return (
      <PieChart width={200} height={200}>
        <Pie
          data={_get(this.props, 'data', [])}
          cx={100}
          cy={100}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={90}
          fill="#8884d8"
          dataKey="value"
        >
          {
            _get(this.props, 'data', []).map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          }
          <Tooltip />
        </Pie>
      </PieChart>
    );
  }
}
