import {
    APPLICATION_BFF_URL
} from "../global/UrlConstants";
import _get from 'lodash/get';
import _set from 'lodash/set'
import { filter } from "async";
import moment from 'moment';
import _isEmpty from 'lodash/isEmpty';

const reqObjMaker = (url, reqBody, ) => {
    return {
        url: `${APPLICATION_BFF_URL}${url}`,
        options: {
            body: JSON.stringify(reqBody),
            method: 'POST'
        }
    }
}
const formObjectMaker = (url, reqBody) => {
    return {
        url: `${APPLICATION_BFF_URL}${url}`,
        options: {
            body: reqBody,
            method: 'POST'
        }
    }
}

const makePaginationReqBody = (url, params, admin) => {
    let page = _get(params, 'pagination.page', '');
    let perPage = _get(params, 'pagination.perPage', '');
    let reqBody = {
        filters: [{
            field: admin ? admin : 'retailerId',
            value: admin ? localStorage.getItem('storeId') : localStorage.getItem('retailerId')
        }],
        limit: perPage,
        offset: (page - 1) * perPage,
        text: _get(params, 'filter.q', '')
    }
    return reqBody
}


const ReqBodyGuesser = (obj) => {
    let {
        params,
        url,
        type
    } = obj;
    let reqBody = {};
    const retailerId = localStorage.getItem('retailerId')
    if (type == 'GET_ONE') {
        if (url == 'Upload/File') {
            const formData = new FormData();
            formData.append("file", params.file);
            let req = formObjectMaker(url, formData);
            return req
        }
        return reqObjMaker(url, params)
    } else if (type == 'UPDATE') {
        if (url == 'Product/Update') {
            if (_get(params, 'data.newImage.newImage')) {
                _set(params, 'data.image', _get(params, 'data.newImage.newImage'));
            }
        }
        if (url == 'Store/Update') {
            if (_get(params, 'data.newImage.newImage')) {
                _set(params, 'data.image', _get(params, 'data.newImage.newImage'));
            }
        }
        if (url == 'PackagePending/UPDATE') {
            url = 'Package/Split';
            params.data.sourcePackageId = params.data.id
            reqBody = {
                ...params.data,
                retailerId: localStorage.getItem('retailerId'),
            }
            return reqObjMaker(url, reqBody)
        }

        return reqObjMaker(url, params.data)

    }
    switch (url) {
        // For Products ******************************************************************************************
        case 'Search/Products':
            reqBody = makePaginationReqBody(url, params)
            if (_get(params, 'filter.productType')) {
                reqBody.filters.push({
                    field: 'productType',
                    value: _get(params, 'filter.productType')
                })
            }
            // if(_get(params,'filter.undefined')) {
            //     reqBody.filters.push({
            //         field: 'syncStatus',
            //         value: _get(params, 'filter.undefined')
            //     })
            // }
            return reqObjMaker(url, reqBody);
        case 'Product/Create':
            reqBody = {
                ...params.data,
                image: _get(params.data, 'newImage.newImage', ''),
                retailerId: localStorage.getItem('retailerId'),
            }
            delete reqBody.newImage
            delete reqBody.cannabisProduct
            delete reqBody.medicalProduct
            return reqObjMaker(url, reqBody)
        case 'Product/Import/Update':
            return reqObjMaker(url, params)
        case 'Product/Get':
            return reqObjMaker(url, params)
        case 'Search/Products/DELETE':
            return ''
        case 'Search/Products/DELETE_MANY':
            return ''
        case 'Search/Products/GET_LIST':
            return 'Search/Products'
        case 'Search/Products/GET_ONE':
            return ''
        case 'Product/GetByIds':
            return reqObjMaker(url, params)
        case 'Get/Metrc/ItemTypes':
            return reqObjMaker(url, { id: retailerId })
        case 'Get/Metrc/Categories/ByItemType':
            return reqObjMaker(url, params)
        case 'Get/Metrc/UnitOfMeasure':
            return reqObjMaker(url, { id: retailerId })
        //For Category ******************************************************************************************
        case 'Category/Level1ByRetailerId':
            return reqObjMaker(url, params)
        case 'Category/GetChildren':
            return reqObjMaker(url, params)
        case 'Category/GetByIds':
            return reqObjMaker(url, params)
        case 'Category/AllByRetailerId':
            return reqObjMaker(url, { id: retailerId })
        case 'Category/Save':
            reqBody = params.data
            reqBody.retailerId = retailerId
            return reqObjMaker(url, params.data)

        //For Customers ******************************************************************************************
        case 'Search/Customers':
            reqBody = makePaginationReqBody(url, params)
            return reqObjMaker(url, reqBody);
        case 'Customer/Get':
            return reqObjMaker(url, params)
        case 'Customer/Create':
            reqBody = params.data
            reqBody.phoneNumber.countryCode = 1
            reqBody.retailerId = retailerId
            reqBody.gender = parseInt(reqBody.gender) || 0
            reqBody.customerType = parseInt(reqBody.customerType) || 0
            return reqObjMaker(url, reqBody)
        case 'Customer/Update':
            return reqObjMaker(url, params.data)

        //For ZipCode ******************************************************************************************
        case 'Reference/GetZipCodeData':
            return reqObjMaker(url, params)
        case 'Sync/Metrc/IncomingTransfers':
            return reqObjMaker(url, params)
        //For Image ******************************************************************************************
        case 'Upload/File':
            const formData = new FormData();
            formData.append("file", params.file);
            let req = formObjectMaker(url, formData);
            return req

        //For Stores ******************************************************************************************
        case 'Search/Stores':
            reqBody = makePaginationReqBody(url, params)
            return reqObjMaker(url, reqBody)

        case 'Store/Get':
            if (Array.isArray(params.ids)) {
                return reqObjMaker(url, { id: params.ids[0] })
            } else {
                return reqObjMaker(url, params)
            }

        case 'Store/Create':
            let data = { ...params.data };
            data.image = _get(params, 'data.newImage.newImage', '');
            // data.operatingHoursStart = _get(params, 'data.operatingHoursStart').getHours() + ':' + _get(params, 'data.operatingHoursStart').getMinutes();
            // data.operatingHoursEnd = _get(params, 'data.operatingHoursEnd').getHours() + ':' + _get(params, 'data.operatingHoursEnd').getMinutes();
            return reqObjMaker(url, { ...data, retailerId })

        case 'Store/Update':
            return reqObjMaker(url, params.data)

        //For Vendors ******************************************************************************************
        case 'Search/Vendors':
            reqBody = makePaginationReqBody(url, params)
            return reqObjMaker(url, reqBody)
        case 'Vendor/Get':
            return reqObjMaker(url, params)
        case 'Vendor/Update':
            return reqObjMaker(url, params.data)
        case 'Vendor/Create':
            reqBody = params.data
            reqBody.retailerId = retailerId
            return reqObjMaker(url, params.data)
        case 'Vendor/GetByIds':
            return reqObjMaker(url, params)
        //For Vendors Products ******************************************************************************************
        case 'Search/VendorProducts':
            reqBody = makePaginationReqBody(url, params)
            return reqObjMaker(url, reqBody)
        case 'VendorProduct/Get':
            if (Array.isArray(params.ids)) {
                let reqBody = {
                    id: params.ids[0]
                }
                return reqObjMaker(url, reqBody)
            } else {
                return reqObjMaker(url, params)
            }
        case 'VendorProduct/Save':
            reqBody = {
                ...params.data,
                retailerId: localStorage.getItem('retailerId'),
            }
            return reqObjMaker(url, reqBody)
        // return reqObjMaker(url, params.data)

        //For Strains ******************************************************************************************
        case 'Search/Strains':
            reqBody = makePaginationReqBody(url, params);
            if (_get(params, 'filter.syncStatus')) {
                reqBody.filters.push({
                    field: 'syncStatus',
                    value: _get(params, 'filter.syncStatus')
                })
            }
            return reqObjMaker(url, reqBody);
        case 'Get/Strain/StrainIds':
            return reqObjMaker(url, params)
        case 'Add/Strain':
            reqBody = {
                ...params.data,
                retailerId
            }
            return reqObjMaker(url, reqBody)


        //For PaymentMethods ******************************************************************************************
        // case 'Store/AvailablePaymentMethods':
        //     return reqObjMaker(url, {})

        //For Employee ******************************************************************************************
        case 'Employee/ByStore':
            return reqObjMaker(url, {
                active: true, storeId: "90fce   e1b-fef3-4af7-a686-80159751d127"
            })
        //For Package Pending ******************************************************************************************
        case 'Search/IncomingPackages':
            reqBody = makePaginationReqBody(url, params);
            if (localStorage.getItem('role') != "1") {
                reqBody.filters.push({
                    field: 'storeId',
                    value: _get(params, 'filter.storeId') || localStorage.getItem('storeId')
                })
            }
            return reqObjMaker(url, reqBody);



        //For Package       ******************************************************************************************
        case 'Search/Packages':
            reqBody = makePaginationReqBody(url, params)
            reqBody = makePaginationReqBody(url, params);
            if (_get(params, 'filter.posProductId')) {
                reqBody.filters.push({
                    field: 'posProductId',
                    value: _get(params, 'filter.posProductId')
                })
            }
            if (_get(params, 'filter.storeId') || localStorage.getItem('storeId')) {
                reqBody.filters.push({
                    field: 'storeId',
                    value: _get(params, 'filter.storeId') || localStorage.getItem('storeId')
                })
            }
            if (_get(params, 'filter.syncStatus')) {
                reqBody.filters.push({
                    field: 'syncStatus',
                    value: _get(params, 'filter.syncStatus')
                })
            }

            return reqObjMaker(url, reqBody);
        case 'Package/Get':
            return reqObjMaker(url, params);
        case 'Package/GetMany':
            return reqObjMaker(url, params)
        case 'Package/Create':
            if (_get(params, 'data.sourcePackageId')) {
                url = 'Package/Split'
            }
            reqBody = {
                ...params.data,
                retailerId: localStorage.getItem('retailerId'),
            }
            return reqObjMaker(url, reqBody)


        //For Reports       ******************************************************************************************

        // Sale Report ***************
        case 'Reports/SalesReport/ByStore':
            let startDate = new Date(moment(_get(params, 'filter.date', '')))
            let endDate = moment(_get(params, 'filter.date', ''))
            endDate.endOf('day')
            reqBody.id = localStorage.getItem('storeId') ? localStorage.getItem('storeId') : _get(params, 'filter.storeId', '')
            reqBody.fromTimeStamp = {}
            reqBody.fromTimeStamp.seconds = parseInt(startDate / 1000)
            reqBody.toTimeStamp = {}
            reqBody.toTimeStamp.seconds = parseInt(endDate / 1000);
            return reqObjMaker(url, reqBody)

        //For Tax       ******************************************************************************************
        case 'Search/Taxes':
            reqBody = localStorage.getItem('storeId') ? makePaginationReqBody(url, params, 'storeId') : makePaginationReqBody(url, params)
            return reqObjMaker(url, reqBody)
        case 'Create/Tax':
            reqBody = {
                ...params.data,
                retailerId
            }
            return reqObjMaker(url, reqBody)
        case 'Get/Tax/Id':
            return reqObjMaker(url, params)
        case 'Update/Tax':
            return reqObjMaker(url, params)

        //For Requisition       ******************************************************************************************
        case 'Requisition/GetByCriteria':
            return reqObjMaker(url, { retailerId, statuses: [0] })
        //For Purchase Orders       ******************************************************************************************
        case 'PurchaseOrder/GetByCriteria':
            return reqObjMaker(url, { retailerId })
        //For Inventory       ******************************************************************************************
        case 'Search/Inventory':
            let reqObj = makePaginationReqBody(url, params)
            reqObj.filters.push({ 'field': 'productType', 'value': '3' })
            reqBody = {
                request: reqObj,
                storeId: localStorage.getItem('storeId')
            }
            return reqObjMaker(url, reqBody);

        //For Sale History       ******************************************************************************************
        case 'Sale/ByStore':
            return reqObjMaker(url, { id: localStorage.getItem('storeId') })
        case 'Sale/Get':
            return reqObjMaker(url, params)
        case 'Sale/Employee/ByStoreId':
            return reqObjMaker(url, { id: localStorage.getItem('storeId') })

        //For Terminal       ******************************************************************************************
        case 'Search/Terminals':
            reqBody = localStorage.getItem('storeId') ? makePaginationReqBody(url, params, 'storeId') : makePaginationReqBody(url, params)
            reqBody.filters.push({
                field: 'storeId',
                value: _get(params, 'filter.storeId')
            })
            return reqObjMaker(url, reqBody)
        case 'Terminal/Create':
            reqBody = params.data
            reqBody.retailerId = retailerId
            return reqObjMaker(url, params.data)
        //For Operator       ******************************************************************************************
        case 'Search/Operators':
            reqBody = localStorage.getItem('storeId') ? makePaginationReqBody(url, params, 'storeId') : makePaginationReqBody(url, params)
            reqBody.filters.push({
                field: 'storeId',
                value: _get(params, 'filter.storeId')
            })
            return reqObjMaker(url, reqBody)
        case 'Operator/Create':
            reqBody = params.data
            reqBody.retailerId = retailerId
            return reqObjMaker(url, params.data)

        //For Rooms       ******************************************************************************************
        case 'Search/InventoryLocations':
            reqBody = localStorage.getItem('storeId') ? makePaginationReqBody(url, params, 'storeId') : makePaginationReqBody(url, params)
            if (_get(params, 'filter.storeId')) {
                reqBody.filters.push({
                    field: 'storeId',
                    value: _get(params, 'filter.storeId')
                })
            }
            return reqObjMaker(url, reqBody)
        case 'Create/InventoryLocation':
            localStorage.getItem('storeId') ?
                reqBody = {
                    ...params.data,
                    storeId: localStorage.getItem('storeId'),
                    retailerId
                } : reqBody = {
                    ...params.data,
                    retailerId
                }
            return reqObjMaker(url, reqBody)
        case 'Get/InventoryLocation/Id':
            return reqObjMaker(url, params)
        case 'Update/InventoryLocation':
            return reqObjMaker(url, params)
        default:
            break;

    }
}

export default ReqBodyGuesser;