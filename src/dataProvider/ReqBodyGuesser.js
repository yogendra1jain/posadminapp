import {
    APPLICATION_BFF_URL
} from "../global/UrlConstants";
import _get from 'lodash/get';

const reqObjMaker = (url, reqBody) => {
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

const ReqBodyGuesser = (obj) => {
    const {
        params,
        url
    } = obj;
    let reqBody = {};
    const retailerId = localStorage.getItem('retailerId')
    switch (url) {
        // For Products ******************************************************************************************
        case 'Search/Products':
            const {
                page, perPage
            } = params.pagination;
            const {
                field, order
            } = params.sort;
            reqBody = {
                filters: [{
                    field: 'retailerId',
                    value: retailerId
                }],
                limit: perPage,
                offset: (page - 1) * perPage,
                text: _get(params, 'filter.text', '')
            }
            return reqObjMaker(url, reqBody);
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

        //For Category ******************************************************************************************
        case 'Category/Level1ByRetailerId':
            return reqObjMaker(url, params)
        case 'Category/GetChildren':
            return reqObjMaker(url, params)

        //For Customers ******************************************************************************************
        case 'Customer/All':
            return reqObjMaker(url, {
                id: retailerId
            })
        case 'Customer/Get':
            return reqObjMaker(url, params)
        case 'Customer/Create':
            reqBody = params.data
            reqBody.phoneNumber.countryCode = 1
            reqBody.retailerId = retailerId
            return reqObjMaker(url, reqBody)
        case 'Customer/Update':
            return reqObjMaker(url, params.data)

        //For ZipCode ******************************************************************************************
        case 'Reference/GetZipCodeData':
            return reqObjMaker(url, params)

        //For Image ******************************************************************************************
        case 'Upload/File':
            const formData = new FormData();
            formData.append("file", params.file);
            return formObjectMaker(url, formData);

        //For Stores ******************************************************************************************
        case 'Store/ByRetailerId':
            return reqObjMaker(url, { id: retailerId })
        case 'Store/Get':
            return reqObjMaker(url, params)
        //For Vendors ******************************************************************************************
        case 'Vendor/ByRetailerId':
            debugger;
            return reqObjMaker(url, { id: retailerId })
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
        case 'VendorProduct/GetByRetailerId':
            return reqObjMaker(url, { id: retailerId })
        case 'VendorProduct/Get':
            return reqObjMaker(url, params)
        case 'VendorProduct/Save':
        return reqObjMaker(url, params.data)

        default:
            break;

        //For PaymentMethods ******************************************************************************************
        case 'Store/AvailablePaymentMethods':
            return reqObjMaker(url, {})
    }
}

export default ReqBodyGuesser;