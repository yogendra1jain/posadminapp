import React from "react";
import thunk from 'redux-thunk';
import ReactDom from "react-dom";
import { Switch } from "react-router-dom";
import Provider from 'react-redux/lib/components/Provider';
import { createLogger } from 'redux-logger/src/index';
import createStore from 'redux/lib/createStore';
import applyMiddleware from 'redux/lib/applyMiddleware';
import Router from 'react-router-dom/HashRouter';
import Route from 'react-router-dom/Route';
import Link from 'react-router-dom/Link';

import reducer from './reducers';

import MainLayout from './MainLayout.jsx'
import EmptyLayout from './EmptyLayout.jsx';

import LoginContainer from "./containers/LoginContainer/LoginContainer.jsx"
import ProductContainer from "./containers/Products/product.jsx";
import ProductListContainer from './containers/Products/productList.jsx';
import ChartsContainer from './containers/Products/ProductReports.jsx'
import InventoryListContainer from './containers/Inventory/inventory.jsx';
import StoreListContainer from './containers/Store/store.jsx';
import AddEditStoreContainer from './containers/Store/addEditStoreContainer.jsx';
import AddEditStaffContainer from './containers/Staff/staffContainer.jsx';
import StaffListContainer from './containers/Staff/staffList.jsx';
import PosList from './containers/posContainer/posList.jsx';
import AddEditPosContainer from './containers/posContainer/addEditPos.jsx';
import RulesCreateContainer from './containers/RulesContainer/rulesCreateContainer.jsx';
import "./assets/stylesheets/reset.css";
import fetchMiddleware from './middlewares/fetchMiddleware.jsx';
import Favicon from 'react-favicon';

// import StoreContainer from './containers/StoreContainer.jsx';

import "./assets/stylesheets/main.css";
import customerChartsContainer from "./containers/Products/CustomerReports.jsx";
import inventoryChartsContainer from './containers/Products/InventoryReports.jsx';
import sessionManageContainer from './containers/SessionContainer/sessionManagementContainer.jsx';
import CustomerListContainer from './containers/Customer/CustomerList';
import AddCustomerContainer from './containers/Customer/AddEditCustomer/AddEditCustomer';
import VendorListContainer from './containers/Vendor/VendorList';
import AddVendorContainer from './containers/Vendor/AddEditVendor/AddEditVendor';
import VendorProductsContainer from './containers/VendorProducts/VendorProducts.jsx';
import AddEditVendorProduct from './containers/VendorProducts/AddEditVendorProduct/AddEditVendorProduct.jsx';
import RequisitionContainer from './containers/RequisitionContainer/RequisitionContainer.jsx';
import PurchaseOrderContainer from './containers/PurchaseOrders/PurchaseOrderContainer.jsx';
import AddEditPurchaseOrder from './containers/PurchaseOrders/AddEditPurchaseOrder/AddEdit.jsx';
import ReviewPurchaseOrderContainer from './containers/PurchaseOrders/AddEditPurchaseOrder/ReviewPurchaseOrder.jsx';

const middleware = [ thunk, fetchMiddleware]
if (process.env.NODE_ENV !== 'production') {
  console.log('ENV URL', process.env.REACT_APP_API_HOST);
  middleware.push(createLogger())
}

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)
function RouteWithLayout({layout, component, ...rest}){
  return (
    <Route {...rest} render={(props) =>
      React.createElement( layout, props, React.createElement(component, props))
    }/>
  );
}


// @todo: drive url routes from a config file for central control
ReactDom.render(
//   <div>
//     <Favicon url="/src/assets/images/favicon.ico" />
   
  <Provider store={store}>
    <Router>
    <Switch>


        <RouteWithLayout layout={EmptyLayout} exact path="/" component={LoginContainer}/>
        {/* <RouteWithLayout layout={EmptyLayout} exact path="/store" component={StoreContainer}/> */}
        <RouteWithLayout layout={MainLayout} exact path="/products" component={ProductListContainer}/>
        {/* <RouteWithLayout layout={MainLayout} exact path="/productReports" component={ChartsContainer}/> */}
        {/* <RouteWithLayout layout={MainLayout} exact path="/customerReport" component={customerChartsContainer}/> */}
        <RouteWithLayout layout={MainLayout} exact path="/product" component={ProductContainer}/>
        <RouteWithLayout layout={MainLayout} exact path="/inventories" component={InventoryListContainer}/>
        <RouteWithLayout layout={MainLayout} exact path="/stores" component={StoreListContainer}/>
        <RouteWithLayout layout={MainLayout} exact path="/addEditStore" component={AddEditStoreContainer}/>
        <RouteWithLayout layout={MainLayout} exact path="/staff" component={AddEditStaffContainer}/>
        <RouteWithLayout layout={MainLayout} exact path="/staffs" component={StaffListContainer}/>
        <RouteWithLayout layout={MainLayout} exact path="/posList" component={PosList}/>
        <RouteWithLayout layout={MainLayout} exact path="/addEditPos" component={AddEditPosContainer}/>
        {/* <RouteWithLayout layout={MainLayout} exact path="/inventoryReport" component={inventoryChartsContainer}/> */}
        {/* <RouteWithLayout layout={MainLayout} exact path="/rules" component={RulesCreateContainer}/> */}
        <RouteWithLayout layout={MainLayout} exact path="/session" component={sessionManageContainer}/>
        <RouteWithLayout layout={MainLayout} exact path="/customers/add" component={AddCustomerContainer}/>
        <RouteWithLayout layout={MainLayout} exact path="/customers" component={CustomerListContainer}/>

        <RouteWithLayout layout={MainLayout} exact path="/vendors/add" component={AddVendorContainer}/>
        <RouteWithLayout layout={MainLayout} exact path="/vendors" component={VendorListContainer}/>
        <RouteWithLayout layout={MainLayout} exact path="/vendorproducts" component={VendorProductsContainer}/>
        <RouteWithLayout layout={MainLayout} exact path="/vendorproducts/add" component={AddEditVendorProduct}/>
        <RouteWithLayout layout={MainLayout} exact path="/requisitions" component={RequisitionContainer}/>
        <RouteWithLayout layout={MainLayout} exact path="/purchaseorders" component={PurchaseOrderContainer}/>
        <RouteWithLayout layout={MainLayout} exact path="/purchaseorders/add" component={AddEditPurchaseOrder}/>
        <RouteWithLayout layout={MainLayout} exact path="/purchaseorders/review/:id" component={ReviewPurchaseOrderContainer}/>

      </Switch>    
                   
     
    </Router>
  </Provider>,
//   </div>,
  document.getElementById('root')
)
