import _get from 'lodash/get'
import _isEmpty from 'lodash/isEmpty';

const ResBodyGuesser = (obj) => {
    const {
        response,
        url,
        params,
        type
    } = obj;

    let {
        json
    } = response
    if (type == 'CREATE' || type == 'UPDATE') {
        return {
            data: {
                ...params.data,
                id: json.id
            }
        }
    }
    if (type == 'GET_ONE') {
        //unused code to be removed
        if (json.id == null) {
            json.id = "uuid";
        }
        return {
            data: json
        };

    }
    if (type == 'GET_MANY') {
        return {
            data: json
        };
    }

    switch (url) {

        // For Products ******************************************************************************************
        case 'Search/Products':
            return {
                data: _get(json, 'products', []),
                total: json.total || 0,
            };
        case 'Product/Get':
            return (url, params)
        case 'Search/Products/DELETE':
            return ''
        case 'Search/Products/DELETE_MANY':
            return ''
        case 'Search/Products/GET_LIST':
            return 'Search/Products'
        case 'Search/Products/GET_ONE':
            return ''
        case 'Sync/Metrc/Categories':
            return {
                data: _get(json,'metrcCategories', []),
                total: json.metrcCategories.length
            }
        case 'Sync/Metrc/UnitOfMeasure':
            return {
                data: _get(json,'metrcUnitOfMeasures', []),
                total: json.metrcUnitOfMeasures.length
            }
        //For Category ******************************************************************************************
        case 'Category/Level1ByRetailerId':
            return {
                data: json,
                total: json.length,
            };
        case 'Category/GetChildren':
            return {
                data: json,
                total: json.length,
            };

        //For Customers ******************************************************************************************
        case 'Search/Customers':
            return {
                data: _get(json, 'customers', []),
                total: json.total || 0,
            };
        case 'Customer/Get':
            return (url, params)
        case 'Customer/Create':
            return
        case 'Customer/Update':
            return (url, params.data)

        //For ZipCode ******************************************************************************************
        case 'Reference/GetZipCodeData':
            return (url, params)

        //For Image ******************************************************************************************
        case 'Upload/File':
            return

        //For Stores ******************************************************************************************
        case 'Store/ByRetailerId':
            return {
                data: json,
                total: json.length,
            };
        case 'Store/Get':
            return (url, params)
        //For PaymentMethods ******************************************************************************************
        // case 'Store/AvailablePaymentMethods':
        //     return (url, params)
        //For Vendors ******************************************************************************************
        case 'Vendor/ByRetailerId':
            return {
                data: json,
                total: json.length,
            };

        //For Stores ******************************************************************************************
        case 'Store/ByRetailerId':
            return {
                data: json,
                total: json.length,
            };
        case 'Store/Get':
            return (url, params)
        //For PaymentMethods ******************************************************************************************
        // case 'Store/AvailablePaymentMethods':
        //     return (url, params)
        //For Vendors ******************************************************************************************
        case 'Vendor/ByRetailerId':
            return {
                data: json,
                total: json.length,
            };
        //For Vendor Products ******************************************************************************************
        case 'VendorProduct/GetByRetailerId':
            console.log(json, 'json')
            let newJson = json.splice(0, 10)
            return {
                data: newJson,
                total: 10,
            };

        //For Strains ******************************************************************************************
        case 'Get/Strain/RetailerId/Paginated':
            return {
                data: _get(json, 'result.strains', []),
                total: _get(json, 'result.count', 0),
            };
        //For Employee ******************************************************************************************
        case 'Employee/ByStore':
            return {
                data: json,
                total: json.length,
            };
        //For Package Pending ******************************************************************************************
        case 'incomingpackage':
            return {
                data: json,
                total: json.length,
            };
        case "incomingpackage/getOne":
            return {

            }



        //For Package       ******************************************************************************************
        case 'Package/Get/ByRetailer':
            return {
                data: _get(json, 'result.packages', []),
                total: _get(json, 'result.count', 0)
            }


        default:
            if (json.id == null) {
                json.id = "uuid";
            }
            return {
                data: json
            };

    }
}

export default ResBodyGuesser;