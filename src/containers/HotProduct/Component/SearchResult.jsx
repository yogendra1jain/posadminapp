import React from 'react';
/* Lodash Imports */
import _get from 'lodash/get';
/* Material import */

/* Redux Imports */

/* Component Imports */
import DineroInit from "../../../Global/Components/DineroInit";
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';


class SearchResult extends React.Component {

    constructor() {
        super();
        this.state = {

        }
    }

    productResultMapper = () => {
        return this.props.searchResult.map((product,index) => {
            return(<div className='offline-transaction'>
                <div className='hot-product-container fwidth flex-column'>
                    <div className='hot-product-cardShadow flex-column flex-wrap'>
                        <div className='hot-product-summary-area flex-row flex-wrap fwidth'>
                            <div className='hot-product-each-detail flex-column align-center'>
                                <span className='hot-product-summary-title'>Product Name</span>
                                <span className='hot-product-summary-money'>{_get(product,'name')}</span>
                            </div>
                            <div className='hot-product-each-detail flex-column align-center'>
                                <span className='hot-product-summary-title'>SKU</span>
                                <span className='hot-product-summary-money'>{_get(product,'sku')}</span>
                            </div>
                            <div className='hot-product-each-detail flex-column align-center'>
                                <span className='hot-product-summary-title'>Price</span>
                                <span className='hot-product-summary-money'>{DineroInit(_get(product, 'salePrice.amount')).toFormat('$0,0.00')}</span>
                            </div>
                            <div className='hot-product-each-detail flex-column align-center'>
                                <ArrowForwardIos
                                    onClick={() => this.props.addToHotProductList(product,index)}
                                    style={{ color: '#ff000096', fontSize: '3em' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
        })
    }

    render() {
        return (
            <div>
                {
                    this.productResultMapper()
                }
            </div>
        );
    }
}

export default SearchResult;