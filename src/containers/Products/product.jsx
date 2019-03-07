import React from 'react';
import Redirect from "react-router/Redirect";
import SaveButton from '../../components/common/SaveButton.jsx'
import AutoComplete from '../../components/Elements/AutoComplete.jsx';
import connect from 'react-redux/lib/connect/connect';
import _get from 'lodash/get';
import _set from 'lodash/set';
import _isEmpty from 'lodash/isEmpty';
import Row from "react-bootstrap/lib/Row";
import { GenericInput } from '../../components/common/TextValidation.jsx';
import {
    uploadDocument,
    ProductDataSave,
    fetchLevel1Category,
    fetchLevel2Category,
    fetchLevel3Category
} from '../../actions/products';
import Alert from 'react-s-alert';
import {
    RECEIVE_PRODUCT_DATA,
    RECEIVED_DOCUMENT_UPLOAD_SUCCESS_RESPONSE,
    RECEIVE_LEVEL1_CATEGORY_DATA,
    RECEIVE_LEVEL2_CATEGORY_DATA,
    RECEIVE_LEVEL3_CATEGORY_DATA
} from '../../constants/products';
import AutoCompletePosition from '../../components/Elements/AutoCompletePosition';
import Input from 'material-ui/Input/Input';
import Checkbox from '@material-ui/core/Checkbox';



class ProductContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isUpdating: false,
            level1Category: [],
            level2Category: [],
            level3Category: [],
            selectedCategory: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.files = [];
        this.fileNames = [];
        this.productInfo = {};
        this.fileUploadUrl = '';
        this.fileData = {};
        this.imagePreviewUrl = '';
        this.redirectToSearch = false;
        this.fileUrl = '';
        this.hexToBase64 = this.hexToBase64.bind(this);
        this.onSave = this.onSave.bind(this);
        this.method = 'POST';
    }


    componentDidMount() {
        if (!_isEmpty(this.props.selectedProduct)) {
            this.setState({ isUpdating: true})
            this.productInfo = this.props.selectedProduct;
            this.method = 'POST';
            this.imagePreviewUrl = this.productInfo.image;
            let category2ReqBody = {id: this.productInfo.category1}
            let category3ReqBody = {id: this.productInfo.category2}
            let url = '/Category/GetChildren'
            this.props.dispatch(fetchLevel2Category('', url, category2ReqBody))
            this.props.dispatch(fetchLevel3Category('', url, category3ReqBody))
        }
        let url = '/Category/Level1ByRetailerId'
        let reqBody = {
            id: localStorage.getItem('retailerID')
        }
        this.props.dispatch(fetchLevel1Category('', url, reqBody))
        this.forceUpdate();
    }
    hexToBase64(str) {
        return btoa(String.fromCharCode.apply(null, str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")));
    }

    handleInputChange(event) {
        let name = event.target.name;
        let value = event.target.value;
        _set(this.productInfo, name, value);
        this.forceUpdate();
    }

    handleSelectChange = (id, name) => {
        _set(this.productInfo, name, id);
        this.forceUpdate();
    }

    handleCheckboxChange = (event, e) => {
        _set(this.productInfo, event.target.name, event.target.checked);
        this.forceUpdate();
    }

    handleLevel1Category = (id, name) => {
        _set(this.productInfo, name, id);
        this.setState({ level3Category: [] })
        let url = '/Category/GetChildren'
        let reqBody = {
            id
        }
        if (id !== null) {
            this.props.dispatch(fetchLevel2Category('', url, reqBody))
        }
        this.forceUpdate();
    }

    handleLevel2Category = (id, name) => {
        _set(this.productInfo, name, id);
        let url = '/Category/GetChildren'
        let reqBody = {
            id
        }
        if (id !== null) {
            this.props.dispatch(fetchLevel3Category('', url, reqBody))
        }
        this.forceUpdate();
    }

    handleFileChange(event) {
        event.preventDefault();
        console.log(event.target.files[0], 'vfyufyfyfy')
        let reader = new FileReader();
        let file = event.target.files[0];
        this.fileNames = (<li> {file.name} </li>)
        reader.onloadend = () => {
            this.fileData = {
                file: file,
                imagePreviewUrl: reader.result
            };
            this.imagePreviewUrl = 'data:image/jpeg;base64,' + this.hexToBase64(this.fileData.imagePreviewUrl);
        }
        reader.readAsDataURL(file)
        this.files = event.target.files;
        let fileNames = [];
        this.fileNames = [];
        Array.prototype.forEach.call(this.files, function (file, index) { fileNames.push(<li key={index}>{file.name}</li>) });
        this.fileNames = fileNames;

        const { dispatch, productsReducer } = this.props;
        let fileUrl = `${process.env.MEDIA_SERVICE_ADDRESS}`
        dispatch(uploadDocument(file, fileUrl, productsReducer));

        // this.props.dispatch(uploadDocument('', '', file))
        //     .then((data) => {
        //         console.log('csv data saved successfully.', data);
        //     }, (err) => {
        //         console.log('err while saving csv data', err);

        //     })
        this.forceUpdate();
    }

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
            Alert.success(msg || 'successfully subimetted', {
                position: 'bottom-right',
                effect: 'slide',
                timeout: 3000,
                html: true
            });
        }

    }
    onSave() {
        let url = ''
        if (this.state.isUpdating) {
            url = `${process.env.APPLICATION_BFF_URL}/Product/Update`;
        } else {
            url = `${process.env.APPLICATION_BFF_URL}/Product/Create`;
        }
        const { dispatch, productsReducer } = this.props;
        let data = {};
        data = this.productInfo;
        if (data.isTaxable) {

        }
        else {
            _set(data, 'isTaxable', false)
        }
        if (data.active) {

        }
        else {
            _set(data, 'active', false)
        }
        _set(data, 'upcCode', Number(_get(data, 'upcCode', '0')))
        console.log(data, 'data is here')
        let salePrice = parseFloat(this.productInfo.sellingPrice)
        let costPrice = parseFloat(this.productInfo.costPrice)
        data.salePrice = {}
        data.salePrice.currencyCode = '$'
        data.salePrice.price = salePrice
        data.costPrice = {}
        data.costPrice.currencyCode = '$'
        data.costPrice.price = costPrice
        data.retailerId = localStorage.getItem('retailerID');
        data.image = this.imagePreviewUrl;
        if (this.state.isUpdating) {
            data.id = this.productInfo.id
        }
        delete data['price']
        dispatch(ProductDataSave(data, productsReducer, url));
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.type === RECEIVED_DOCUMENT_UPLOAD_SUCCESS_RESPONSE) {
            if (nextProps.fileData && !_isEmpty(nextProps.fileData)) {
                this.imagePreviewUrl = nextProps.fileData.message.absoluteURL;
            } else {
                this.showAlert(true, 'something went wrong.');
            }
        }

        if (nextProps.type === RECEIVE_PRODUCT_DATA) {
            if (nextProps.status === 200) {
                this.redirectToSearch = true;

                this.showAlert(false, _get(nextProps.productData, 'message', 'Product Added Successfully'));

            } else {
                if (nextProps.status !== 200 && nextProps.status !== '')
                    this.showAlert(true, nextProps.productData.message);
                this.redirectToSearch = false
            }
        }

        if (nextProps.type === RECEIVE_LEVEL1_CATEGORY_DATA) {
            if (!_isEmpty(nextProps.level1CategoryData)) {
                let categoryList = [];
                _get(nextProps, 'level1CategoryData', []).map((category, index) => {
                    categoryList.push({
                        displayText: category.name,
                        value: category.id
                    });
                });
                this.setState({ level1Category: categoryList })
            }
        }

        if (nextProps.type === RECEIVE_LEVEL2_CATEGORY_DATA) {
            if (!_isEmpty(nextProps.level2CategoryData)) {
                debugger
                let categoryList = [];
                _get(nextProps, 'level2CategoryData', []).map((category, index) => {
                    categoryList.push({
                        displayText: category.name,
                        value: category.id
                    });
                });
                this.setState({ level2Category: categoryList })
            }
        }

        if (nextProps.type === RECEIVE_LEVEL3_CATEGORY_DATA) {
            if (!_isEmpty(nextProps.level3CategoryData)) {
                debugger
                let categoryList = [];
                _get(nextProps, 'level3CategoryData', []).map((category, index) => {
                    categoryList.push({
                        displayText: category.name,
                        value: category.id
                    });
                });
                this.setState({ level3Category: categoryList })
            }
        }
        this.forceUpdate();
    }
    handleCancel = () => {
        this.redirectToSearch = true;
        this.forceUpdate();
    }
    render() {
        if (this.redirectToSearch) {
            return (
                <Redirect push to="/products" />
            )
        }
        if (_get(this, 'props.isFetching')) {
            return (<div className='loader-wrapper-main'>
                <div className="spinner">
                    <div className="rect1"></div>
                    <div className="rect2"></div>
                    <div className="rect3"></div>
                    <div className="rect4"></div>
                    <div className="rect5"></div>
                </div>
            </div>);
        }
        return (
            <div className="strainBlock">
                {/* <span className="glyphicon glyphicon-remove drawer-close" onClick={this.closeDrawer}></span> */}
                <div className="strainTitle">{this.method == 'PUT' ? 'Update Product' : 'Create Product'}</div>
                <Row className="d-flex">
                    <div className="col-sm-6 col-md-4 form-d">
                        <label className="control-label">Product Name</label>
                        <GenericInput
                            htmlFor="name" displayName="Product Name"
                            inputName="name" defaultValue={_get(this.productInfo, 'name', '')}
                            onChange={this.handleInputChange} errorCheck={false}
                            className="text-input error"
                        />
                    </div>
                    <div className="col-sm-6 col-md-4 form-d">
                        <label className="control-label">SKU</label>
                        <GenericInput
                            htmlFor="sku" displayName="SKU"
                            inputName="sku" defaultValue={_get(this.productInfo, 'sku', '')}
                            onChange={this.handleInputChange} errorCheck={false}
                            className="text-input error"
                        />
                    </div>


                    {/* <div className="col-sm-6 col-md-4 form-d">
                        <label className="control-label">Price</label>
                        <GenericInput
                            htmlFor="price" displayName="Price" type="number"
                            inputName="price" defaultValue={_get(this.productInfo,'price','')}
                            onChange={this.handleInputChange} errorCheck={false}
                            className="text-input error"
                        />
                    </div> */}
                    <div className="col-sm-6 col-md-4 form-d">
                        <label className="control-label">Product Detail</label>
                        <Input
                            name="description"
                            multiline
                            label="Description"
                            onChange={this.handleInputChange}
                            value={_get(this.productInfo, 'description', '')}
                            multiline={true}
                        />
                        {/* <GenericInput
                            htmlFor="description" displayName="Product Description"
                            inputName="description" defaultValue={_get(this.productInfo,'description','')}
                            onChange={this.handleInputChange} errorCheck={false}
                            className="text-input error"
                        /> */}
                    </div>
                    <div className="col-sm-6 col-md-4 form-d">
                        <label className="control-label">Cost Price</label>
                        <GenericInput
                            htmlFor="costPrice" displayName="Cost Price" type="number"
                            inputName="costPrice" defaultValue={_get(this.productInfo, 'costPrice', '')}
                            onChange={this.handleInputChange} errorCheck={false}
                            className="text-input error"
                        />
                    </div>

                    <div className="col-sm-6 col-md-4 form-d">
                        <label className="control-label">POS Price</label>
                        <GenericInput
                            htmlFor="sellingPrice" displayName="POS Price" type="number"
                            inputName="sellingPrice" defaultValue={_get(this.productInfo, 'sellingPrice', '')}
                            onChange={this.handleInputChange} errorCheck={false}
                            className="text-input error"
                        />
                    </div>
                    <div className="col-sm-4 col-md-3 form-d">
                        <label className="control-label">Select Root Cateogry</label>
                        <AutoCompletePosition
                            type="single"
                            data={_get(this.state, 'level1Category', [])}
                            name="category1"
                            value={_get(this.productInfo, 'category1', '')}
                            changeHandler={(id, name) => { this.handleLevel1Category(id, 'category1') }}
                        />
                    </div>
                    <div className="col-sm-4 col-md-3 form-d">
                        <label className="control-label">Select Sub Cateogry</label>
                        <AutoCompletePosition
                            type="single"
                            data={_get(this.state, 'level2Category', [])}
                            name="category2"
                            value={_get(this.productInfo, 'category2', '')}
                            changeHandler={(id, name) => { this.handleLevel2Category(id, 'category2') }}
                        />
                    </div>
                    <div className="col-sm-4 col-md-3 form-d">
                        <label className="control-label">Select Leaf Cateogry</label>
                        <AutoCompletePosition
                            type="single"
                            data={_get(this.state, 'level3Category', [])}
                            name="category3"
                            value={_get(this.productInfo, 'category3', '')}
                            changeHandler={(id, name) => { this.handleSelectChange(id, 'category3') }}
                        />
                    </div>
                    <div className="col-sm-6 col-md-4 form-d">
                        <label className="control-label">UPC Code</label>
                        <GenericInput
                            htmlFor="upcCode" displayName="UPC Code"
                            inputName="upcCode" defaultValue={_get(this.productInfo, 'upcCode', '')}
                            onChange={this.handleInputChange} errorCheck={false}
                            className="text-input error"
                        />
                    </div>
                    <div className="col-sm-4 col-md-3 form-d">
                        <label className="control-label">Is Taxable</label>
                        <Checkbox
                            name="isTaxable"
                            onChange={(e) => this.handleCheckboxChange(e)}
                            value={_get(this.productInfo, 'isTaxable', '')}
                        />
                    </div>
                    <div className="col-sm-4 col-md-3 form-d">
                        <label className="control-label">Active</label>
                        <Checkbox
                            name="active"
                            onChange={(e) => this.handleCheckboxChange(e)}
                            value={_get(this.productInfo, 'active', '')}
                        />
                    </div>
                    <div className="col-sm-6 col-md-4 form-d">
                        <div className="row">
                            <div className="col-sm-12">
                                <label className="control-label">Upload Image</label>
                                <div className="" style={{ marginTop: "5px", float: "left", marginRight: "15px" }}>
                                    {/* <input type="file" id="files" className="hidden"/> */}
                                    <label className="btn btn-default" for="files">Select file</label>
                                    <input type="file" title=" " className="hidden" id="files" name="images" multiple={false} onChange={this.handleFileChange} />
                                </div>
                                <div className="pull-left" style={{ marginTop: "5px", padding: "5px 0 0" }}>
                                    <ul>{this.fileNames}</ul>
                                </div>
                            </div>
                        </div>
                        {this.imagePreviewUrl != '' &&
                            <div className="row" style={{ marginTop: "10px" }}>
                                <div className="col-sm-12">
                                    <img style={{ width: '100%', maxWidth: "500px", height: '350px' }} src={this.imagePreviewUrl} />
                                </div>
                            </div>
                        }

                    </div>
                    {/* <div className="col-sm-5">
                        <ul>{this.fileNames}</ul>
                        </div> */}
                    {/* <div className="col-sm-12" style={{marginBottom:"20px"}}>
                            <img src={this.imagePreviewUrl} />
                        </div> */}



                </Row>
                <Row>
                    <div className="col-sm-12">
                        <div className="form-btn-group">
                            <SaveButton buttonDisplayText={'Save'} Class_Name={"btn-info"} handlerSearch={this.onSave} />
                            <SaveButton buttonDisplayText={'Cancel'} Class_Name={""} handlerSearch={this.handleCancel} />
                        </div>
                    </div>
                </Row>

            </div>
        )

    }

}

const mapStateToProps = state => {

    let { productsReducer, userRolesReducer } = state

    let { status } = productsReducer || '';
    let { isFetching } = productsReducer || false;
    let { type, productData, selectedProduct, fileData, level1CategoryData, level2CategoryData, level3CategoryData } = productsReducer || '';

    let { retailerId, userId } = userRolesReducer['userRolesData'] ? userRolesReducer['userRolesData'] : {};



    return {
        status,
        isFetching,
        retailerId,
        userId,
        type,
        productData,
        selectedProduct,
        fileData,
        level1CategoryData,
        level2CategoryData,
        level3CategoryData
    }
}

export default connect(mapStateToProps)(ProductContainer);
