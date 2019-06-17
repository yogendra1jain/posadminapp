import _get from 'lodash/get'
import _isEmpty from 'lodash/isEmpty';
import Dinero from 'dinero.js';
import moment from 'moment';
import map from 'lodash/map';
import { uuidv1 } from 'uuid/v1';

const DineroInit = (amount, currency, precision) => (
    Dinero({ amount: parseInt(amount) || 0, currency: currency || 'USD', precision: precision || 2 })
)

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
        if (url == 'Package/Create') {
            if (_get(params, 'data.sourcePackageId'))
                return {
                    data: {
                        id: params.data.sourcePackageId,
                        ...params.data
                    }
                }
        }
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
        if (url == 'Package/Get') {
            return {
                data: {
                    ...json.package
                }
            }
        }
        if (url == 'Get/Tax/Id') {
            return {
                data: {
                    ...json.tax,
                    appliedTo: _get(json, 'tax.appliedTo', 0)
                }
            }
        }

        if (url == 'Sale/Get') {
            let saleData = {};
            let { sale } = json
            saleData = {
                ...sale.sale,
                customer: sale.customer,
                operator: sale.operator,
                store: sale.store,
                terminal: sale.terminal
            }
            return {
                data: {
                    ...saleData,
                    id: _get(sale, 'sale.id', '')
                }
            }
        }

        return {
            data: json
        };

    }
    if (type == 'GET_MANY') {
        if (url == 'VendorProduct/Get' || url == 'Store/Get') {
            return {
                data: [json]
            }
        }
        if (url == "Package/GetMany") {
            return {
                data: _get(json, 'packages', [])
            }
        }

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
        case 'Search/Products/GET_LIST':
            return 'Search/Products'
        case 'Search/Products/GET_ONE':
            return ''
        case 'Get/Metrc/ItemTypes':
            let MetrcItemTypes = _get(json, 'metrcItemTypes', []).map(item => {
                let UpdatedItem = { ...item }
                UpdatedItem.id = Math.floor((Math.random() * 100000) + 1)
                return UpdatedItem
            })
            return {
                data: MetrcItemTypes,
                total: !_isEmpty(json.metrcItemTypes) ? json.metrcItemTypes.length : 0
            }
        case 'Get/Metrc/Categories/ByItemType':
            let MetrcCategoryByItemTypes = _get(json, 'metrcCategories', []).map(item => {
                let UpdatedItem = { ...item }
                UpdatedItem.id = Math.floor((Math.random() * 100000) + 1)
                return UpdatedItem
            })
            return {
                data: MetrcCategoryByItemTypes,
                total: !_isEmpty(json.metrcCategories) ? json.metrcCategories.length : 0
            }
        case 'Get/Metrc/UnitOfMeasure':
            let MetrcUOM = _get(json, 'metrcUnitOfMeasures', []).map(item => {
                let UpdatedItem = { ...item }
                UpdatedItem.id = Math.floor((Math.random() * 100000) + 1)
                return UpdatedItem
            })
            return {
                data: MetrcUOM,
                total: !_isEmpty(json.metrcUnitOfMeasures) ? json.metrcUnitOfMeasures.length : 0
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

        case 'Category/AllByRetailerId':
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
        case 'Search/Stores':
            return {
                data: _get(json, 'stores', []),
                total: json.total || 0,
            };
        case 'Store/Get':
            return (url, params)
        //For PaymentMethods ******************************************************************************************
        // case 'Store/AvailablePaymentMethods':
        //     return (url, params)
        //For Vendors ******************************************************************************************
        case 'Search/Vendors':
            return {
                data: _get(json, 'vendors',[]),
                total: json.total || 0,
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
        case 'Search/VendorProducts':
            return {
                data: _get(json, 'vendorProducts', []),
                total: json.total || 0,
            };

        //For Strains ******************************************************************************************
        case 'Search/Strains':
            return {
                data: _get(json, 'strains', []),
                total: _get(json, 'total', 0),
            };
        //For Employee ******************************************************************************************
        case 'Employee/ByStore':
            return {
                data: json,
                total: json.length,
            };
        //For Package Pending ******************************************************************************************
        case 'Search/IncomingPackages':
            let metrcPackages = json.incomingPackages || [];
            // let incomingPkgSyncTime = json.lastSynced.seconds * 1000;
            // localStorage.setItem('incomingPkgSyncTime', incomingPkgSyncTime)
            metrcPackages = metrcPackages.map((p) => {
                let obj = { ...p };
                obj.id = p.packageLabel;
                return obj;
            })
            return {
                data: metrcPackages,
                total: _get(json, 'total', 0),
            };
        case "incomingpackage/getOne":
            return {

            }



        //For Package       ******************************************************************************************
        case 'Search/Packages':
            return {
                data: _get(json, 'packages', []),
                total: _get(json, 'total', 0) || 0,
            }
        case 'Package/GetMany':
            return {
                data: _get(json, 'packages', [])
            }

        //For Reports       ******************************************************************************************
        case 'Reports/SalesReport/ByStore':
            let saleReportData = []
            json && json.map(report => {
                let paymentMethod1 = ''
                let paymentMethod2 = ''
                let paymentMethod3 = ''
                _get(report, 'payments', []).map(payment => {
                    let isCash = ('paymentMethod' in payment)
                    if (!isCash) {
                        paymentMethod1 = 'CASH'
                    }
                    if (payment.paymentMethod == 1) {
                        paymentMethod2 = 'CARD - FREEDOM PAY'
                    }
                    if (payment.paymentMethod == 2) {
                        paymentMethod3 = 'GIFT CARD'
                    }
                })
                let isSaleTypeExist = _get(report, 'saleItem.saleType')
                let isProduct = false
                let isGiftCard = false
                if (isSaleTypeExist) {
                    if (_get(report, 'saleItem.saleType', 0) == 1) {
                        isGiftCard = true
                    } else if (_get(report, 'saleItem.saleType', 0) == 0) {
                        isProduct = true
                    }
                } else {
                    isProduct = true
                }
                let isMiscDoesNotExist = !('misc' in _get(report, 'product', {}))
                let tempStore = {}
                tempStore.date = moment(_get(report, 'saleTransactionDetail.saleTimeStamp.seconds', 0) * 1000).format("MM/DD/YYYY h:mm a")
                tempStore.orderId = _get(report, 'saleTransactionDetail.id', '')
                tempStore.staffName = _get(report, 'staff.person.firstName', '') + ' ' + _get(report, 'staff.person.lastName', '')
                tempStore.customerName = _get(report, 'customer.customer.firstName', '') + ' ' + _get(report, 'customer.customer.lastName', '')
                tempStore.customerId = _get(report, 'customer.id', '')
                tempStore.employeeCode = _get(report, 'customer.employeeId', '')
                tempStore.sku = _get(report, 'product.sku', '')
                tempStore.barCode = _get(report, 'product.upcCode', '')
                tempStore.productName = isProduct ? _get(report, 'saleItem.product.name', '') : 'Gift Card'
                tempStore.staffNote = _get(report, 'saleTransactionDetail.saleComment', '')
                tempStore.group = _get(report, 'group.name', '')
                tempStore.category = _get(report, 'category.name', '')
                tempStore.subCategory = _get(report, 'subCategory.name', '')
                tempStore.itemType = isGiftCard ? 'Gift Card' : isMiscDoesNotExist ? 'Product' : 'Miscellaneous Product'
                tempStore.priceRetailUnit = DineroInit(_get(report, 'product.salePrice.amount', 0)).toFormat('$0,0.00')
                tempStore.costPrice = DineroInit(_get(report, 'product.costPrice.amount', 0)).toFormat('$0,0.00')
                tempStore.quantity = _get(report, 'saleItem.qty', 1)
                tempStore.totalRetailSales = DineroInit(_get(report, 'saleItem.itemRegularTotal.amount', 0)).toFormat('$0,0.00')

                tempStore.preTaxSales = DineroInit(_get(report, 'saleItem.itemSubTotal.amount', 0)).toFormat('$0,0.00')
                tempStore.tax = DineroInit(_get(report, 'saleItem.itemTaxAmount.amount', 0)).toFormat('$0,0.00')
                tempStore.totalSales = DineroInit(_get(report, 'saleItem.itemEffectiveTotal.amount', 0)).toFormat('$0,0.00')
                tempStore.employeeDiscountAmount = DineroInit(_get(report, 'saleItem.employeeDiscountTotal.amount', 0)).toFormat('$0,0.00')
                tempStore.itemDiscountAmount = DineroInit(_get(report, 'saleItem.itemDiscountTotal.amount', 0)).toFormat('$0,0.00')
                tempStore.cartDiscountAmount = DineroInit(_get(report, 'saleItem.cartDiscountTotal.amount', 0)).toFormat('$0,0.00')
                tempStore.totalItemDiscount = DineroInit(_get(report, 'saleItem.employeeDiscountTotal.amount', 0) + _get(report, 'saleItem.itemDiscountTotal.amount', 0) + _get(report, 'saleItem.cartDiscountTotal.amount', 0)).toFormat('$0,0.00')
                tempStore.paymentMethod1 = paymentMethod1
                tempStore.paymentMethod2 = paymentMethod2
                tempStore.paymentMethod3 = paymentMethod3
                tempStore.itemVendorNo = _get(report, 'vendorProduct.sku', '')
                tempStore.vendorName = _get(report, 'vendor.name', '')
                tempStore.id = Math.floor((Math.random() * 100000) + 1);
                saleReportData.push(tempStore)
            })
            return {
                data: saleReportData || [],
                total: _get(saleReportData, 'length', 0)
            }

        //For Tax       ******************************************************************************************
        case 'Search/Taxes':
            return {
                data: _get(json,'taxes',[]),
                total: json.total || 0
            }

        //For Requisition       ******************************************************************************************
        case 'Requisition/GetByCriteria':
            return {
                data: json || [],
                total: _get(json, 'length', 0)
            }

        //For Purchase Orders       ******************************************************************************************
        case 'PurchaseOrder/GetByCriteria':
            return {
                data: json || [],
                total: json ? json.length : 0
            }
        //For Inventory       ******************************************************************************************
        case 'Search/Inventory':

            return {

                data: json.products.map(p => ({ ...p, id: p.product.id })) || [],
                total: json.total || 0
            }


        //For Sale History       ******************************************************************************************
        case 'Sale/ByStore':
            return {
                data: json.sales || [],
                total: json ? json.sales.length : 0
            }

        //For Terminal       ******************************************************************************************
        case 'Search/Terminals':
            return {
                data: _get(json, 'terminals', []),
                total: json.total || 0,
            };
        //For Operator       ******************************************************************************************
        case 'Search/Operators':
            return {
                data: _get(json, 'operators', []),
                total: json.total || 0,
            };
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