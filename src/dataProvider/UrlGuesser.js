const UrlGuesser = (obj) => {
    const {
        resource,
        type
    } = obj;
    switch (`${resource}/${type}`) {
        //For Products ******************************************************************************************
        case 'Products/GET_LIST':
            return 'Search/Products'
        case 'Products/GET_ONE':
            return 'Product/Get'
        case 'Products/CREATE':
            return 'Product/Create'
        case 'Products/UPDATE':
            return 'Product/Update'
        case 'Products/DELETE':
            return ''
        case 'Products/DELETE_MANY':
            return ''
        case 'Products/GET_MANY':
            return 'Product/GetByIds'
        case 'MetrcItemTypes/GET_LIST':
            return 'Get/Metrc/ItemTypes'
        case 'MetrcCategory/GET_LIST':
            return 'Get/Metrc/Categories/ByItemType'
        case 'UOM/GET_LIST':
            return 'Get/Metrc/UnitOfMeasure'

        //For Unfinished Products ******************************************************************************************
        case 'UnfinishedProducts/GET_LIST':
            return 'Search/Products'
        case 'UnfinishedProducts/GET_ONE':
            return 'Product/Get'
        case 'UnfinishedProducts/UPDATE':
            return 'Product/Import/Update'
        case 'UnfinishedProducts/GET_MANY':
            return 'Product/GetByIds'

        //For Category ******************************************************************************************
        case 'Level1ByRetailerId/GET_LIST':
            return 'Category/Level1ByRetailerId'
        case 'GetChildren/GET_LIST':
            return 'Category/GetChildren'
        case 'Category/GET_MANY':
            return 'Category/GetByIds'
        case 'Category/CREATE':
            return 'Category/Save'
        case 'Category/GET_LIST':
            return 'Category/AllByRetailerId'
        case 'Category/GET_ONE':
            return 'Category/Get'
        case 'Category/UPDATE':
            return 'Category/Save'

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

        case 'Sync/Metrc/IncomingTransfers/GET_ONE':
            return 'Sync/Metrc/IncomingTransfers';
        //For Image ******************************************************************************************
        case 'IMAGE/GET_ONE':
            return 'Upload/File'

        //For Stores ******************************************************************************************
        case 'Store/GET_LIST':
            return 'Search/Stores'

        case 'Store/GET_ONE':
            return 'Store/Get'
        case 'Store/GET_MANY':
            return 'Store/Get'
        case 'Store/CREATE':
            return 'Store/Create'
        case 'Store/UPDATE':
            return 'Store/Update'
        case "facility/GET_LIST":
            return 'Get/FacilitiesRetailer/ByRetailerId'

        //For PaymentMethods ******************************************************************************************
        // case 'PaymentMethods/GET_ONE':
        //     return 'Store/AvailablePaymentMethods'

        //For Vendors ******************************************************************************************
        case 'vendors/GET_LIST':
            return 'Search/Vendors'
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
        case 'VendorProducts/GET_LIST':
            return 'Search/VendorProducts'
        case 'VendorProducts/GET_ONE':
            return 'VendorProduct/Get'
        case 'VendorProducts/GET_MANY':
            return 'VendorProduct/Get'
        case 'VendorProducts/CREATE':
            return 'VendorProduct/Save'
        case 'VendorProducts/UPDATE':
            return 'VendorProduct/Save'
        case 'VendorProducts/DELETE':
            return ''
        case 'VendorProducts/DELETE_MANY':
            return ''

        //For Strains ******************************************************************************************
        case 'Strains/GET_LIST':
            return 'Search/Strains'
        case 'Strains/CREATE':
            return 'Add/Strain'
        case 'Strains/GET_ONE':
            return 'Get/Strain/StrainId';
        case 'Strains/UPDATE':
            return 'Update/Strain'
        case 'Strains/GET_MANY':
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
        case 'PackagePending/GET_LIST':
            return 'Search/IncomingPackages'
        case 'PackagePending/GET_ONE':
            return 'Get/Metrc/Package/ByLabel'
        case 'PackagePending/CREATE':
            return 'Vendor/Create'
        case 'PackagePending/UPDATE':
            return 'PackagePending/UPDATE'
        case 'PackagePending/DELETE':
            return ''
        case 'PackagePending/DELETE_MANY':
            return ''
        case 'PackagePending/GET_MANY':
            return 'Vendor/GetByIds'


        //For Package       ******************************************************************************************
        case 'Package/GET_LIST':
            return 'Search/Packages'
        case 'Package/GET_ONE':
            return 'Package/Get'
        case 'Package/GET_MANY':
            return 'Package/GetMany'
        case 'Package/CREATE':
            return 'Package/Create'

        //For Reports       ******************************************************************************************
        // Sale Report **********************************************************************
        case 'SaleReport/GET_LIST':
            return 'Reports/SalesReport/ByStore'

        //For Tax       ******************************************************************************************
        case 'Tax/GET_LIST':
            return 'Search/Taxes'
        case 'Tax/CREATE':
            return 'Create/Tax';
        case 'Tax/GET_ONE':
            return 'Get/Tax/Id';
        case 'Tax/UPDATE':
            return 'Update/Tax';

        //For Requisition       ******************************************************************************************
        case 'Requisition/GET_LIST':
            return 'Requisition/GetByCriteria'

        //For Purchase Orders       ******************************************************************************************
        case 'PurchaseOrders/GET_LIST':
            return 'PurchaseOrder/GetByCriteria'

        //For Inventory       ******************************************************************************************
        case 'Inventory/GET_LIST':
            return 'Search/Inventory'
       
        case 'Inventory/GET_ONE':
            return 'Inventory/Get'
        case 'Inventory/Update':
                return 'Store/Inventory/Update'
            //For Sale History       ******************************************************************************************'
        case 'SaleHistory/GET_LIST':
            return 'Sale/ByStore'
        case 'SaleHistory/GET_ONE':
            return 'Sale/Get'
        //For Terminal       ******************************************************************************************
        case 'Terminal/GET_LIST':
            return 'Search/Terminals'
        case 'Terminal/GET_ONE':
            return 'Terminal/Get'
        case 'Terminal/CREATE':
            return 'Terminal/Create'
        case 'Terminal/UPDATE':
            return 'Terminal/Update'
        //For Operator       ******************************************************************************************
        case 'Operator/GET_LIST':
            return 'Search/Operators'
        case 'Operator/GET_ONE':
            return 'Operator/Get'
        case 'Operator/CREATE':
            return 'Operator/Create'
        case 'Operator/UPDATE':
            return 'Operator/Update'

        //For Rooms       ******************************************************************************************
        case 'Rooms/GET_LIST':
            let url 
            localStorage.getItem('storeId') ? 
            url = 'Get/InventoryLocations/StoreId' : 
            url = 'Get/InventoryLocations/RetailerId' 
            return 'Search/InventoryLocations' 

        case 'Rooms/CREATE':
            return 'Create/InventoryLocation'
        case 'Rooms/GET_ONE':
            return 'Get/InventoryLocation/Id';
        case 'Rooms/UPDATE':
            return 'Update/InventoryLocation';
        default:
            break;
    }
}

export default UrlGuesser;