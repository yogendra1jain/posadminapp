import React, { Component } from 'react';
import AutoComplete from '../../components/Elements/AutoComplete';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _set from 'lodash/set';
import SaveButton from '../../components/common/SaveButton';
import { mapProductsWithStore, fetchStore } from '../../actions/store';

class AddProducts extends Component {
  constructor() {
        super();
        this.state = {
            productList: []
        };
        this.selectedProducts = []
    }

    componentWillReceiveProps(nextProps) {
        if(!_isEmpty(nextProps.productData)) {
            let productList =  []
            nextProps.productData.map(product => {
                productList.push({
                    displayText: product.name,
                    value: product.id
                })
            })
            this.setState({productList})
        }
    }

    handleSelectChange = (id, name) => {
        this.selectedProducts.push(id)
        console.log(this.selectedProducts, 'this.selectedProducts')
    }

    mapProductsWithStore = () => {
        let reqObj = {
            storeId: this.props.storeId,
            productIds: this.selectedProducts
        }
        let url = '/Store/MapProducts/'
        this.props.dispatch(mapProductsWithStore('', url, reqObj))
        const { dispatch } = this.props;
        let reqBody = {
            id: localStorage.getItem('retailerID')
        }
        let storeUrl = '/Store/ByRetailerId'
        dispatch(fetchStore('', storeUrl, reqBody));
    }

    render() {
        return (
            <div style={{height: '300px'}}>
                <AutoComplete
                    type="multi"
                    data={_get(this,'state.productList',[])}
                    name="product"
                    placeholder="Select Product"
                    // options={this.selectedProducts}
                    changeHandler={(id) => { this.handleSelectChange(id, 'product') }}
                />
                <div className="form-btn-group" style={{marginTop: '20px'}}>
                    <SaveButton buttonDisplayText={'Add Products'} handlerSearch={this.mapProductsWithStore} />
                    <SaveButton buttonDisplayText={'Cancel'} handlerSearch={this.props.onClose} />
                </div>
            </div>
            
        );
    }
}

export default AddProducts;
 