const ResBodyGuesser = (obj) => {
    const {
        response,
        url,
        params,
        type
    } = obj;

    let { json } = response
    if (type == 'CREATE' ||type=='UPDATE' ) {
        return {
            data: {
                ...params.data,
                id: json.id
            }
        }
    }
    if (type == 'GET_ONE') {
        if (json.id == null) {
            json.id = "uuid";
        }
        return {
            data: json
        };
    }

    switch (url) {

        // For Products ******************************************************************************************
        case 'Search/Products':
            return {
                data: json.products,
                total: json.total,
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
        case 'Customer/All':
            return {
                data: json,
                total: json.length,
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
        case 'Store/AvailablePaymentMethods':
            return (url, params)
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