import { createSelector } from 'reselect';
import { getProductReducer } from './common';
import _get from 'lodash/get';
import map from 'lodash/map';
import moment from "moment";

const vendorProductDetails = state => _get(getProductReducer(state), 'vendorProductsData', [])

const mapVendorProductDetails = data => (
    map(data, mapData)
)

const mapData = data => ({
    id: _get(data, 'id', ''),
    vendorId: _get(data, 'vendorId', ''),
    vendorName: _get(data, 'vendorName', ''),
    posProductId: _get(data, 'posProductId', ''),
    productName: _get(data, 'productName', ''),
    retailerId: _get(data, 'retailerId', ''),
    sku: _get(data, 'sku', ''),
    combinedPrice: `${_get(data, 'price.currencyCode', '')} ${_get(data, 'price.price', 0)}`,
    price: _get(data, 'price', ''),
    defaultOrderQty: _get(data, 'defaultOrderQty', ''),
    conversionFactor: _get(data, 'conversionFactor', ''),
})

const VendorProductsSel = createSelector(
    vendorProductDetails,
    mapVendorProductDetails
)

export { VendorProductsSel };