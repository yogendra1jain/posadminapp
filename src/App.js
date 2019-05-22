// in src/App.js
import React from 'react';
import { Admin, Resource,ListGuesser, } from 'react-admin';

import jsonServerProvider from 'ra-data-json-server';
import { PostList } from './posts';
import { UserList } from './users';
import { PostEdit } from './editPost';
import authProvider from './authProvider';
import dataProvider from './dataProvider';
import products from './products';


// const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com');

const App = () => (
  <div>
      <Admin dataProvider={dataProvider} authProvider={authProvider}>
      <Resource name="Products" {...products} />
      {/* <Resource name="users" list={UserList} /> */}
      </Admin>
      </div>
  );
export default App