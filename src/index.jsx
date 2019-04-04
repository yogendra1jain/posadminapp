import React from "react";
import thunk from 'redux-thunk';
import ReactDom from "react-dom";
import { Switch } from "react-router-dom";
import Provider from 'react-redux/lib/components/Provider';
import { createLogger } from 'redux-logger/src/index';
import createStore from 'redux/lib/createStore';
import compose from 'redux/lib/compose';
import applyMiddleware from 'redux/lib/applyMiddleware';
import Router from 'react-router-dom/HashRouter';
import Route from 'react-router-dom/Route';
import Link from 'react-router-dom/Link';
import JssProvider from 'react-jss/lib/JssProvider';
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
import { createGenerateClassName } from '@material-ui/core/styles';
import "./assets/stylesheets/main.css";
import customerChartsContainer from "./containers/Products/CustomerReports.jsx";
import inventoryChartsContainer from './containers/Products/InventoryReports.jsx';
import sessionManageContainer from './containers/SessionContainer/sessionManagementContainer.jsx';
import CustomerListContainer from './containers/Customer/CustomerList';
import AddCustomerContainer from './containers/Customer/AddEditCustomer/AddEditCustomer';
import VendorListContainer from './containers/Vendor/VendorList';
import AddVendorContainer from './containers/Vendor/AddEditVendor/AddEditVendor';
import VendorProductsContainer from './containers/VendorProducts/VendorProducts.jsx';
import EmployeePayrollDeductDetails from './containers/Reports/EmployeePayrollDeductDetails.jsx';
import EmployeePayrollDeductSummary from './containers/Reports/EmployeePayrollDeductSummary.jsx';
import EmployeeDiscountReport from './containers/Reports/EmployeeDiscountReport.jsx';
import EmployeeDetailsReport from './containers/Reports/EmployeeDetailsList.jsx';
import AddEditVendorProduct from './containers/VendorProducts/AddEditVendorProduct/AddEditVendorProduct.jsx';
import RequisitionContainer from './containers/RequisitionContainer/RequisitionContainer.jsx';
import PurchaseOrderContainer from './containers/PurchaseOrders/PurchaseOrderContainer.jsx';
import AddEditPurchaseOrder from './containers/PurchaseOrders/AddEditPurchaseOrder/AddEdit.jsx';
import ReviewPurchaseOrderContainer from './containers/PurchaseOrders/AddEditPurchaseOrder/ReviewPurchaseOrder.jsx';
import RecieptAddEdit from './containers/PurchaseOrders/RecieptAddEdit.jsx';
import ZReportContainer from './containers/Reports/ZReport.jsx';
import EmployeesContainer from './containers/EmployeesContainer/EmployeesContainer.jsx';
import AddEditEmployee from './containers/EmployeesContainer/AddEditEmployee.jsx';
import SaleDataReport from './containers/Reports/SaleDataReport.jsx';
import RetailerContainer from './containers/Retailer/RetailerContainer.jsx';
import AddEditRetailerContainer from './containers/Retailer/AddEditRetailer/AddEditRetailerContainer.jsx'
import CategoriesContainer from './containers/Categories/CategoriesContainer'
import AddNewCategoryContainer from './containers/Categories/AddNewCategoryContainer';
import ResetPassword from './containers/Staff/ResetPassword';
import ProductOverRideContainer from './containers/ProductOverride/ProductOverrideContainers';
import ProductOverRideComponent from './containers/ProductOverride/ProductOverRideComponent';
import RewardPointsRule from './containers/RewardPointsRule/RewardPointsRuleContainer';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './Global/MaterialUiSettings/theme';
import AddFreedomPayConfigForm from './containers/posContainer/fpConfigForm';
import DashboardContainer from "./containers/Dashboard/DashboardContainer";

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: true,
  productionPrefix: 'c',
});



const middleware = [thunk, fetchMiddleware]
if (process.env.NODE_ENV !== 'production') {
  console.log('ENV URL', process.env.REACT_APP_API_HOST);
  middleware.push(createLogger())
}
let store;
if(process.env.NODE_ENV !== 'production') {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  store = createStore(
    reducer,
    composeEnhancers(
      applyMiddleware(...middleware)
    )
  )
} else {
  store = createStore(
    reducer,
    applyMiddleware(...middleware)
  )
}

function RouteWithLayout({ layout, component, ...rest }) {
  return (
    <Route {...rest} render={(props) =>
      React.createElement(layout, props, React.createElement(component, props))
    } />
  );
}


// @todo: drive url routes from a config file for central control
ReactDom.render(
  //   <div>
  //     <Favicon url="/src/assets/images/favicon.ico" />
  <JssProvider generateClassName={generateClassName}>
    <MuiThemeProvider theme={theme}>

      <Provider store={store}>
        <Router>
          <Switch>


            <RouteWithLayout layout={EmptyLayout} exact path="/" component={LoginContainer} />
            {/* <RouteWithLayout layout={EmptyLayout} exact path="/store" component={StoreContainer}/> */}
            <RouteWithLayout layout={MainLayout} exact path="/products" component={ProductListContainer} />
            {/* <RouteWithLayout layout={MainLayout} exact path="/productReports" component={ChartsContainer}/> */}
            {/* <RouteWithLayout layout={MainLayout} exact path="/customerReport" component={customerChartsContainer}/> */}
            <RouteWithLayout layout={MainLayout} exact path="/product" component={ProductContainer} />
            <RouteWithLayout layout={MainLayout} exact path="/inventories" component={InventoryListContainer} />
            <RouteWithLayout layout={MainLayout} exact path="/stores" component={StoreListContainer} />
            <RouteWithLayout layout={MainLayout} exact path="/addEditStore" component={AddEditStoreContainer} />
            <RouteWithLayout layout={MainLayout} exact path="/staff" component={AddEditStaffContainer} />
            <RouteWithLayout layout={MainLayout} exact path="/staffs" component={StaffListContainer} />
            <RouteWithLayout layout={MainLayout} exact path="/posList" component={PosList} />
            <RouteWithLayout layout={MainLayout} exact path="/addEditPos" component={AddEditPosContainer} />
            <RouteWithLayout layout={MainLayout} exact path="/inventoryReport" component={inventoryChartsContainer} />
            {/* <RouteWithLayout layout={MainLayout} exact path="/rules" component={RulesCreateContainer}/> */}
            <RouteWithLayout layout={MainLayout} exact path="/session" component={sessionManageContainer} />
            <RouteWithLayout layout={MainLayout} exact path="/customers/add" component={AddCustomerContainer} />
            <RouteWithLayout layout={MainLayout} exact path="/customers" component={CustomerListContainer} />

            <RouteWithLayout layout={MainLayout} exact path="/categories" component={CategoriesContainer} />
            <RouteWithLayout layout={MainLayout} exact path="/categories/add" component={AddNewCategoryContainer} />
            <RouteWithLayout layout={MainLayout} exact path="/vendorproducts" component={VendorProductsContainer} />

            <RouteWithLayout layout={MainLayout} exact path="/vendorproducts/add" component={AddEditVendorProduct} />
            <RouteWithLayout layout={MainLayout} exact path="/requisitions" component={RequisitionContainer} />
            <RouteWithLayout layout={MainLayout} exact path="/purchaseorders" component={PurchaseOrderContainer} />
            <RouteWithLayout layout={MainLayout} exact path="/purchaseorders/add" component={AddEditPurchaseOrder} />
            <RouteWithLayout layout={MainLayout} exact path="/purchaseorders/review/:id" component={ReviewPurchaseOrderContainer} />
            <RouteWithLayout layout={MainLayout} exact path="/purchaseorders/reciept/:id" component={RecieptAddEdit} />
            <RouteWithLayout layout={MainLayout} exact path="/vendors/add" component={AddVendorContainer} />
            <RouteWithLayout layout={MainLayout} exact path="/vendors" component={VendorListContainer} />
            <RouteWithLayout layout={MainLayout} exact path="/employee_payroll_deduct_details" component={EmployeePayrollDeductDetails} />
            <RouteWithLayout layout={MainLayout} exact path="/employee_payroll_deduct_summary" component={EmployeePayrollDeductSummary} />
            <RouteWithLayout layout={MainLayout} exact path="/employee_discount_report" component={EmployeeDiscountReport} />
            <RouteWithLayout layout={MainLayout} exact path="/employee_details_report" component={EmployeeDetailsReport} />
            <RouteWithLayout layout={MainLayout} exact path="/z_report" component={ZReportContainer} />
            <RouteWithLayout layout={MainLayout} exact path="/employees" component={EmployeesContainer} />
            <RouteWithLayout layout={MainLayout} exact path="/employees/add" component={AddEditEmployee} />
            <RouteWithLayout layout={MainLayout} exact path="/sale_report" component={SaleDataReport} />
            <RouteWithLayout layout={MainLayout} exact path="/retailers" component={RetailerContainer} />
            <RouteWithLayout layout={MainLayout} exact path="/retailers/add" component={AddEditRetailerContainer} />
            <RouteWithLayout layout={MainLayout} exact path='/staff/resetPassword' component={ResetPassword} />
            <RouteWithLayout layout={MainLayout} exact path='/storeProducts' component={ProductOverRideContainer} />
            <RouteWithLayout layout={MainLayout} exact path='/productOverride' component={ProductOverRideComponent} />
            <RouteWithLayout layout={MainLayout} exact path='/rewardPointsRule' component={RewardPointsRule} />
            <RouteWithLayout layout={MainLayout} exact path='/freedompayconfig' component={AddFreedomPayConfigForm} />

            <RouteWithLayout layout={MainLayout} exact path='/dashboard' component={DashboardContainer} />
          </Switch>
        </Router>
      </Provider>
    </MuiThemeProvider>
  </JssProvider>,
  //   </div>,
  document.getElementById('root')
)
