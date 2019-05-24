// in src/App.js
import React from 'react';
import { Admin, Resource,ListGuesser, } from 'react-admin';

import authProvider from './authProvider';
import dataProvider from './dataProvider';
import products from './products';
import customers from './customers';

const App = () => (
    <div>
      <Admin dataProvider={dataProvider} authProvider={authProvider}>
        <Resource name="Search/Products" {...products} options={{label:'Product List'}} />
        <Resource name="Customers" {...customers} />
      </Admin>
    </div>
  );
export default App