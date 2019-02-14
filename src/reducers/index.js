import combineReducers from 'redux/lib/combineReducers';
import _get from 'lodash/get';
import { reducer as formReducer } from 'redux-form'
import userRoleReducer, { userRolesData as userRolesReducer } from './userRoles';
import storeReducer, { storesData as storesReducer } from './store';
import customerReducer, { customerData as customersReducer } from './customer';
import vendorReducer, { vendorData as vendorsReducer } from './vendor';
import productReducer, { productData as productsReducer } from './products';
import reportReducer, { reportsData as reportsReducer } from './reports';
import inventoryReducer, {inventoryData as inventoriesReducer } from './inventory';
import staffReducer, { staffsData as staffsReducer } from './staff';
import ruleReducer, { rulesData as rulesReducer } from './rules';
import posReducer, { posTerminalData as posTerminalReducer } from './posTerminal';
import sessionReducer, { sessionsData as sessionsReducer } from './session';
import { categoriesData as categoriesReducer } from './categories'
import purchaseOrderReducer, { purchaseOrderData as purchaseOrdersReducer } from './purchaseOrder';
import commonData from './common';


const commonReducer = (state = 'initialState', action) => {
  switch (action.type) {
    default:
      return state
  }
}

const commonReducer1 = (state = 'initialState1', action) => {
  switch (action.type) {
    default:
      return state
  }
}




const rootReducer = combineReducers({
  commonReducer,  
  commonReducer1,  
  userRoleReducer,
  userRolesReducer, 
  productReducer,
  productsReducer,
  storeReducer,
  storesReducer,
  commonData,
  customerReducer,
  customersReducer,
  vendorReducer,
  vendorsReducer,
  reportReducer,
  reportsReducer,
  inventoryReducer,
  inventoriesReducer,
  staffReducer,
  staffsReducer,
  ruleReducer,
  rulesReducer,
  posReducer,
  posTerminalReducer,
  sessionReducer,
  sessionsReducer,
  categoriesReducer,
  form: formReducer,
  purchaseOrderReducer,
  purchaseOrdersReducer,
})

export default rootReducer;
