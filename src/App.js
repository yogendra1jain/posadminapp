// in src/App.js
import React from 'react';
import { Admin, Resource,ListGuesser, } from 'react-admin';

import authProvider from './authProvider';
import dataProvider from './dataProvider';
import products from './products';

const App = () => (
  <div>
      <Admin dataProvider={dataProvider} authProvider={authProvider}>
        <Resource name="Products" {...products} />
        {/* <Resource name="users" list={UserList} /> */}
      </Admin>
      </div>
  );
export default App