const UrlGuesser = (obj) => {
    const {
        resource,
        type
    } = obj;
    switch (`${resource}/${type}`) {

        //For Products ******************************************************************************************
        case 'Search/Products/GET_LIST':
            return 'Search/Products'
        case 'Search/Products/GET_ONE':
            return 'Product/Get'
        case 'Search/Products/CREATE':
            return ''
        case 'Search/Products/UPDATE':
            return ''
        case 'Search/Products/DELETE':
            return ''
        case 'Search/Products/DELETE_MANY':
            return ''

        //For Category ******************************************************************************************
        case 'Level1ByRetailerId/GET_LIST':
            return 'Category/Level1ByRetailerId'
        case 'GetChildren/GET_LIST':
            return 'Category/GetChildren'

        //For Customers ******************************************************************************************
        case 'Customers/GET_LIST':
            return 'Customer/All'

        case 'Customers/GET_ONE':
            return 'Customer/Get'

        case 'Customers/CREATE':
            return 'Customer/Create'

        case 'Customers/UPDATE':
            return 'Customer/Update'

        case 'Customers/DELETE':
            return ''

        case 'Customers/DELETE_MANY':
            return ''

        //For ZipCode ******************************************************************************************
        case 'Reference/GetZipCodeData/GET_ONE':
            return 'Reference/GetZipCodeData'

        //For Image ******************************************************************************************
        case 'IMAGE/GET_ONE':
            return 'Upload/File'

        //For Stores ******************************************************************************************
        case 'Store/GET_LIST':
            return 'Store/ByRetailerId'
        
        case 'Store/GET_ONE':
            return 'Store/Get'

        //For PaymentMethods ******************************************************************************************
        case 'PaymentMethods/GET_MANY':
            debugger
            return 'Store/AvailablePaymentMethods'

        default:
            break;
    }
}

export default UrlGuesser;