// in src/App.js
import React from 'react';
import { Admin, Resource, ListGuesser,  EditGuesser, ShowGuesser, mergeTranslations } from 'react-admin';
import { reducer as tree } from 'ra-tree-ui-materialui';
import treeEnglishMessages from 'ra-tree-language-english';
import englishMessages from 'ra-language-english';

import authProvider from './authProvider';
import dataProvider from './dataProvider';
import products from './products';
import unfinishedProducts from './unfinishedProducts';
import customers from './customers';
import categories from './categories'
import vendors from './vendors';
import vendorProducts from './vendorProducts'
import stores from './stores';
// import employees from './employees';
import packagepending from './packagePending';
import Login from './global/components/LoginPage';
import strains from './strains';
import Layout from './layout/Layout';
import saleReport from './reports/saleReport';
import requisition from './requisition';
import packageIn from './package'
import purchaseOrders from './purchaseOrders';
import tax from './tax';
import routes from './routes';
import inventory from './inventory';
import terminals from './terminals'
import saleHistory from './saleHistory';
import operators from './operators';

const messages = {
  'en': mergeTranslations(englishMessages, treeEnglishMessages),
};
const i18nProvider = locale => messages[locale];


const App = () => (
  <div>
    <Admin
      dataProvider={dataProvider}
      i18nProvider={i18nProvider}
      authProvider={authProvider}
      customRoutes={routes}
      appLayout={Layout}
      loginPage={Login}
      customReducers={{ tree }}
    >
      {permissions => [
        <Resource name="Search/Products" {...products} options={{ label: 'Product List' }} />,
        <Resource name="Customers" {...customers}/>,
        <Resource name="Strain" {...strains} />,
        <Resource name="Package" {...packageIn} />,
        <Resource name="Store" list={stores.list} show={stores.show} create = {permissions == '1' ?stores.create:null} edit ={permissions=='1'?stores.edit:null} />, 
        <Resource name="Terminal" {...terminals}  />, 
        <Resource name="Operator" {...operators}  />, 

        <Resource name="PaymentMethods" />,
        <Resource name="vendors" {...vendors} options={{ label: 'Vendor List' }} />,
        <Resource name="VendorProduct/GetByRetailerId" {...vendorProducts} options={{ label: 'Product List' }} />,
        <Resource name="SaleReport" {...saleReport} />,
        // {/* <Resource name="employees"  {...employees} options={{ label: 'Employees' }} /> */ }
        <Resource name="packagePending"  {...packagepending} options={{ label: 'Package Pending' }} />,
        <Resource name="Category" {...categories} />,
        <Resource name="Tax" {...tax} />,
        <Resource name="Requisition" {...requisition} />,
        <Resource name="PurchaseOrders" {...purchaseOrders} />,
        <Resource name="Inventory" {...inventory}  />,
        <Resource name="UnfinishedProducts" {...unfinishedProducts} />,
        <Resource name="SaleHistory" {...saleHistory} />
      ]}

    </Admin>
  </div>
);
export default App