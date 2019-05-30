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
            return 'Product/Create'
        case 'Search/Products/UPDATE':
            return 'Product/Update'
        case 'Search/Products/DELETE':
            return ''
        case 'Search/Products/DELETE_MANY':
            return ''
        case 'Search/Products/GET_MANY':
            return 'Product/GetByIds'
        case 'MetricCategory/GET_LIST':
            return 'Get/Metrc/Categories'
        case 'UOM/GET_LIST':
            return 'Get/Metrc/UnitOfMeasure'

        //For Category ******************************************************************************************
        case 'Level1ByRetailerId/GET_LIST':
            return 'Category/Level1ByRetailerId'
        case 'GetChildren/GET_LIST':
            return 'Category/GetChildren'
        case 'Category/GET_MANY':
        return 'Category/GetByIds'

        //For Customers ******************************************************************************************
        case 'Customers/GET_LIST':
            return 'Search/Customers'

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

        case 'Store/CREATE':
            return 'Store/Create'
        case 'Store/UPDATE':
            return 'Store/Update'

        //For PaymentMethods ******************************************************************************************
        // case 'PaymentMethods/GET_ONE':
        //     return 'Store/AvailablePaymentMethods'

        //For Vendors ******************************************************************************************
        case 'vendors/GET_LIST':
            return 'Vendor/ByRetailerId'
        case 'vendors/GET_ONE':
            return 'Vendor/Get'
        case 'vendors/CREATE':
            return 'Vendor/Create'
        case 'vendors/UPDATE':
            return 'Vendor/Update'
        case 'vendors/DELETE':
            return ''
        case 'vendors/DELETE_MANY':
            return ''
        case 'vendors/GET_MANY':
            return 'Vendor/GetByIds'
        //For Vendors Products ******************************************************************************************
        case 'VendorProduct/GetByRetailerId/GET_LIST':
            return 'VendorProduct/GetByRetailerId'
        case 'VendorProduct/GetByRetailerId/GET_ONE':
            return 'VendorProduct/Get'
        case 'VendorProduct/GetByRetailerId/CREATE':
            return 'VendorProduct/Save'
        case 'VendorProduct/GetByRetailerId/UPDATE':
            return 'VendorProduct/Save'
        case 'VendorProduct/GetByRetailerId/DELETE':
            return ''
        case 'VendorProduct/GetByRetailerId/DELETE_MANY':
            return ''

        //For Strains ******************************************************************************************
        case 'Strain/GET_LIST':
            return 'Get/Strain/RetailerId/Paginated'
        case 'Strain/CREATE':
            return 'Add/Strain'
        case 'Strain/GET_ONE':
            return 'Get/Strain/StrainId';
        case 'Strain/UPDATE':
            return 'Update/Strain'
        case 'Strain/GET_MANY':
            return 'Get/Strain/StrainIds'
        //For Employee ******************************************************************************************
        case 'employees/GET_LIST':
            return 'Employee/ByStore'
        case 'employees/GET_ONE':
            return 'Vendor/Get'
        case 'employees/CREATE':
            return 'Vendor/Create'
        case 'employees/UPDATE':
            return 'Vendor/Update'
        case 'employees/DELETE':
            return ''
        case 'employees/DELETE_MANY':
            return ''
        case 'employees/GET_MANY':
            return 'Vendor/GetByIds'
        //For Package Pending ******************************************************************************************
        case 'packagePending/GET_LIST':
            return 'incomingpackage'
        case 'packagePending/GET_ONE':
        return 'incomingpackage/getOne'
            return 'Vendor/Get'
        case 'packagePending/CREATE':
            return 'Vendor/Create'
        case 'packagePending/UPDATE':
            return 'Vendor/Update'
        case 'packagePending/DELETE':
            return ''
        case 'packagePending/DELETE_MANY':
            return ''
        case 'packagePending/GET_MANY':
            return 'Vendor/GetByIds'


        //For Package       ******************************************************************************************
        case 'Package/GET_LIST':
            return 'Package/Get/ByRetailer'
        
        //For Reports       ******************************************************************************************
        // Sale Report **********************************************************************
        case 'SaleReport/GET_LIST':
            return 'Reports/SalesReport/ByStore'
        default:
            break;
    }
}

export default UrlGuesser;