import {
    APPLICATION_BFF_URL
} from "../global/UrlConstants";
import _get from 'lodash/get';
import _set from 'lodash/set'
import { filter } from "async";
import moment from 'moment';

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

const makePaginationReqBody = (url, params) => {
    let page = _get(params, 'pagination.page', '');
    let perPage = _get(params, 'pagination.perPage', '');
    let field = _get(params, 'sort.field', '');
    let order = _get(params, 'sort.order', '');
    let reqBody = {
        filters: [{
            field: 'retailerId',
            value: localStorage.getItem('retailerId')
        }],
        limit: perPage,
        offset: (page - 1) * perPage,
        text: _get(params, 'filter.q', '')
    }
    return reqBody
}

const ReqBodyGuesser = (obj) => {
    const {
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
            return reqObjMaker(url, params.data)
        }
        return reqObjMaker(url, params.data)
    }
    switch (url) {
        // For Products ******************************************************************************************
        case 'Search/Products':
            let {
                page, perPage
            } = params.pagination;
            let {
                field, order
            } = params.sort;
            reqBody = makePaginationReqBody(url, params)
            return reqObjMaker(url, reqBody);
        case 'Product/Create':            
            reqBody = {
                ...params.data,
                image: _get(params.data,'newImage.newImage',''),
                retailerId: localStorage.getItem('retailerId'),
            }
            delete reqBody.newImage
            delete reqBody.cannabisProduct
            delete reqBody.medicalProduct
            return reqObjMaker(url, reqBody)
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
            reqBody.gender = parseInt(reqBody.gender)||0
            reqBody.customerType =  parseInt(reqBody.customerType)||0
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
            let req = formObjectMaker(url, formData);
            return req

        //For Stores ******************************************************************************************
        case 'Store/ByRetailerId':
            return reqObjMaker(url, { id: retailerId })

        case 'Store/Get':
            return reqObjMaker(url, params)

        case 'Store/Create':
            return reqObjMaker(url, { ...params.data, retailerId })

        case 'Store/Update':
            return reqObjMaker(url, params.data)

        //For Vendors ******************************************************************************************
        case 'Vendor/ByRetailerId':
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

        //For Strains ******************************************************************************************
        case 'Get/Strain/RetailerId/Paginated':
            reqBody.id = retailerId
            reqBody.page = params.pagination.page
            reqBody.sizePerPage = params.pagination.perPage
            return reqObjMaker(url, reqBody)
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
        case 'incomingpackage':
            return { url: "http://demo6234876.mockable.io/incomingpackage", options: {} }


        //For Package       ******************************************************************************************
        case 'Package/Get/ByRetailer':
            return reqObjMaker(url, { id: retailerId })

        //For Reports       ******************************************************************************************

        // Sale Report ***************
        case 'Reports/SalesReport/ByStore':
            let startDate = new Date(moment(_get(params,'filter.date','')))
            let endDate = moment(_get(params,'filter.date',''))
            endDate.endOf('day')
            reqBody.id = localStorage.getItem('storeId')
            reqBody.fromTimeStamp = {}
            reqBody.fromTimeStamp.seconds = parseInt(startDate / 1000)
            reqBody.toTimeStamp = {}
            reqBody.toTimeStamp.seconds = parseInt(endDate / 1000)
            return reqObjMaker(url, reqBody)
        default:
            break;

    }
}

export default ReqBodyGuesser;