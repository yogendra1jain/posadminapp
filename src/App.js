// in src/App.js
import React from 'react';
import { Admin, Resource, ListGuesser,EditGuesser } from 'react-admin';

import authProvider from './authProvider';
import dataProvider from './dataProvider';
import products from './products';
import customers from './customers';
import vendors from './vendors';
import vendorProducts from './vendorProducts'

const App = () => (
  <div>
    <Admin dataProvider={dataProvider} authProvider={authProvider}>
      <Resource name="Search/Products" {...products} options={{ label: 'Product List' }} />
      <Resource name="Customers" {...customers} />
      <Resource name="vendors" {...vendors}  options={{ label: 'Vendor List' }} />
      <Resource name="VendorProduct/GetByRetailerId" {...vendorProducts} edit={EditGuesser}  options={{ label: 'Vendor Product List' }} />
    </Admin>
  </div>
);
export default App