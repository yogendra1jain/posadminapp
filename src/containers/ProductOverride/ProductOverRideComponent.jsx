import React, { Component } from 'react';
import { connect } from 'react-redux';
import _isEmpty from 'lodash/isEmpty';
import _cloneDeep from 'lodash/cloneDeep';
import _get from 'lodash/get';
import _set from 'lodash/set';
import SaveButton from '../../components/common/SaveButton';
import Checkbox from '@material-ui/core/Checkbox';
import { saveProductOverride } from '../../actions/poductOverride';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from 'react-s-alert';
import Redirect from "react-router/Redirect";
import splitDot from '../../Global/splitDot';

class ProductOverRideComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedProducts: [],
            storeId: '',
            active: true,
            clickedSaveButton: ''
        }
    }

    _isMounted = false

    showAlert(error, msg) {
        if (error) {
            Alert.error(msg || '', {
                position: 'bottom-right',
                effect: 'slide',
                timeout: 5000,
                html: true
            });
            this.forceUpdate();
        } else {
            Alert.success(msg || 'successfully saved.', {
                position: 'bottom-right',
                effect: 'slide',
                timeout: 3000,
                html: true
            });
        }
    }

    handleChangeInput = (e, index, type) => {
        let value = _get(e, 'target.value', '');
        let selectedProducts = _cloneDeep(this.state.selectedProducts);
        if (type == 'costPrice') {
            _set(selectedProducts[index], 'costPrice', value);
        } else if (type == 'salePrice') {
            _set(selectedProducts[index], 'salePrice', value);
        }
        this.setState({ selectedProducts });
    }

    handleCheckBoxChange = (index) => {
        let selectedProducts = _cloneDeep(this.state.selectedProducts);
        _set(selectedProducts[index], 'active', !selectedProducts[index].active)
        this.setState({ selectedProducts })
    }

    handleProductOverride = (index) => {
        this.setState({ clickedSaveButton: index })
        let productToSave = this.state.selectedProducts[index]
        let reqObj = {
            storeId: this.state.storeId,
            productId: productToSave.id,
            costPrice: {
                curreny: "USD",
                amount: splitDot(productToSave.costPrice)
            },
            salePrice: {
                currency: "USD",
                amount: splitDot(productToSave.salePrice)
            },
            active: productToSave.active
        }

        let url = '/Store/ProductOverride'
        this.props.dispatch(saveProductOverride('', url, reqObj))
    }

    mapPropsWithState = () => {
        if (this._isMounted) {
            if (!_isEmpty(this.props.selectedProducts)) {
                if (Array.isArray(this.props.selectedProducts)) {
                    this.setState({ selectedProducts: this.props.selectedProducts })
                }
            }

            if (this.props.selectedStoreId !== '') {
                this.setState({ storeId: this.props.selectedStoreId })
            }
        }
    }

    handleCancel = () => {
        this.props.history.push('/storeProducts');
    }

    componentDidMount() {
        this._isMounted = true
        this.mapPropsWithState();
        if (_isEmpty(this.props.selectedProducts)) {
            this.props.history.push('/storeProducts')
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.type == 'RECEIVE_PRODUCT_OVERRIDE') {
            this.showAlert(false, 'Product Overrided Successfully!');
        } else if (nextProps.type == 'RECEIVE_PRODUCT_OVERRIDE_ERROR') {
            this.showAlert(true, 'Some Error Occured!');
        }
    }

    render() {
        let showSelectedProducts = () => {
            let rows = []
            if (!_isEmpty(this.state.selectedProducts)) {
                _get(this.state, 'selectedProducts', []).map((product, index) => {
                    rows.push(
                        <div className={'box-conversion-row'} style={{ border: 'solid 1px #ddd' }}>
                            <div className='box-conversion-item'>
                                <span className='box-conversion-data'>{product.name}</span>
                            </div>
                            <div className='box-conversion-item'>
                                <span className='box-conversion-data'>{product.sku}</span>
                            </div>
                            <div className='box-conversion-item'>
                                <input style={{ width: '100px' }} className='box-conversion-data' onChange={(e) => this.handleChangeInput(e, index, 'costPrice')} value={product.costPrice} />
                            </div>
                            <div className='box-conversion-item'>
                                <input style={{ width: '100px' }} className='box-conversion-data' onChange={(e) => this.handleChangeInput(e, index, 'salePrice')} value={product.salePrice} />
                            </div>
                            <div className='box-conversion-item' style={{ 'align-items': 'flex-start' }}>
                                <Checkbox
                                    checked={product.active}
                                    onChange={() => this.handleCheckBoxChange(index)}
                                    value="active"
                                />
                            </div>
                            <div className='box-conversion-item'>
                                {this.state.clickedSaveButton == index && this.props.isFetching ? <CircularProgress disableShrink /> :
                                    <SaveButton buttonDisplayText={'Save'} Class_Name={"btn-info"} handlerSearch={() => this.handleProductOverride(index)} />
                                }
                            </div>

                        </div>
                    )
                })
            }
            return (
                <div className='box-conversion-container'>
                    <div className='panel-container'>
                        <span className='panel-heading'>Selected Product List </span>
                        <div>
                            <SaveButton buttonDisplayText={'Close'} Class_Name={"btn-info"} handlerSearch={this.handleCancel} />
                        </div>
                    </div>
                    <div className="box-conversion-row">
                        <div className="box-conversion-item">
                            <label className='box-conversion-data'>Product Name</label>
                        </div>
                        <div className="box-conversion-item">
                            <label className='box-conversion-data'>SKU</label>
                        </div>
                        <div className="box-conversion-item">
                            <label className='box-conversion-data'>Cost Price</label>
                        </div>
                        <div className="box-conversion-item">
                            <label className='box-conversion-data'>Sale Price</label>
                        </div>
                        <div className='box-conversion-item'>
                            <label className='box-conversion-data'>Active</label>
                        </div>
                        <div className='box-conversion-item'></div>
                    </div>
                    {rows}
                </div>
            )
        }

        return (
            <div>
                {showSelectedProducts()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { productOverride } = state
    const { productOverrideData, status, type, isFetching, error } = productOverride
    const { selectedProducts, selectedStoreId } = productOverrideData

    return {
        selectedProducts,
        selectedStoreId,
        status,
        type,
        isFetching,
        error
    }
}

export default connect(mapStateToProps)(ProductOverRideComponent);