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
import { uploadDocument,ProductDataSave } from '../../actions/products';
import Alert from 'react-s-alert';
import {RECEIVE_PRODUCT_DATA, RECEIVED_DOCUMENT_UPLOAD_SUCCESS_RESPONSE} from '../../constants/products';



class ProductContainer extends React.Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.files = [];
        this.fileNames=[];
        this.productInfo = {};
        this.fileUploadUrl = '';
        this.fileData = {};
        this.imagePreviewUrl = '';
        this.redirectToSearch = false;
        this.categories = {
            data:[
            {displayText:'Cat1', value:1},
            {displayText:'Cat2', value:2},
            {displayText:'Cat3', value:3},
            {displayText:'Cat4', value:4},
        ]};
        this.fileUrl = '';
        this.hexToBase64 = this.hexToBase64.bind(this);
        this.onSave = this.onSave.bind(this);
        this.method = 'POST';
    }


    componentDidMount() {
        if(!_isEmpty(this.props.selectedProduct)){
            this.productInfo = this.props.selectedProduct;
            this.method = 'PUT';
            this.imagePreviewUrl = this.productInfo.image;
        }
        this.forceUpdate();
    }
    hexToBase64(str) {
        return btoa(String.fromCharCode.apply(null, str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")));
    }    

    handleInputChange(event) {
        let name = event.target.name;
        let value = event.target.value;
        _set(this.productInfo,name,value);
        this.forceUpdate();
    }
    handleSelectChange = (id, name) => {
        _set(this.productInfo,name,id);
        this.forceUpdate();
    }
    handleFileChange(event) {  
        // event.preventDefault();

        // let reader = new FileReader();
        let file = event.target.files[0];
        this.fileNames = (<li> {file.name} </li>)
        // reader.onloadend = () => {
        //   this.fileData = {
        //     file: file,
        //     imagePreviewUrl: reader.result
        //   };  
        //   this.imagePreviewUrl ='data:image/jpeg;base64,' + this.hexToBase64(this.fileData.imagePreviewUrl);
        // }
        // reader.readAsDataURL(file)    
        // this.files = event.target.files;
        // let fileNames = [];
        // this.fileNames = [];
        // Array.prototype.forEach.call(this.files, function(file, index) { fileNames.push(<li key={index}>{file.name}</li>) });
        // this.fileNames = fileNames;

        const { dispatch, productsReducer } = this.props;
        let fileUrl = 'http://13.127.202.129:3005/media-service/pos/media'
        dispatch(uploadDocument(file, fileUrl, productsReducer));
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
            Alert.success(msg||'successfully subimetted', {
                position: 'bottom-right',
                effect: 'slide',
                timeout: 3000,
                html: true
            });
        }

    }
    onSave () {
        let url = `${process.env.APPLICATION_BFF_URL}/products`;;
        const { dispatch, productsReducer } = this.props;
        let data = {};
        data = this.productInfo;
        data.retailer = localStorage.getItem('retailerID');
        data.imageLink = this.imagePreviewUrl;
        dispatch(ProductDataSave(data, productsReducer, url, this.method));
       
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.type === RECEIVED_DOCUMENT_UPLOAD_SUCCESS_RESPONSE){
            if(nextProps.fileData && !_isEmpty(nextProps.fileData)){
                this.imagePreviewUrl = nextProps.fileData.message.absoluteURL;
            }else{
                this.showAlert(true,'something went wrong.');
            }
        }
    
        if(nextProps.type===RECEIVE_PRODUCT_DATA ){
            if( nextProps.status === 200){
                this.redirectToSearch = true;
                
                this.showAlert(false, _get(nextProps.productData,'message','Submitted Successfully'));
    
            }else{
                if(nextProps.status !== 200 && nextProps.status !== '')
                    this.showAlert(true, nextProps.productData.message);
                this.redirectToSearch = false
            }
        }
            
        
      
        this.forceUpdate();
               
    }
    handleCancel = () => {
        this.redirectToSearch = true;
        this.forceUpdate();
    }

    render() {
        
        if(this.redirectToSearch){
            return(
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
                <div className="strainTitle">{this.method=='PUT'?'Update Product': 'Create Product'}</div>
                <Row className="d-flex">
                    <div className="col-sm-6 col-md-4 form-d">
                        <label className="control-label">Product Name</label>
                        <GenericInput
                            htmlFor="name" displayName="Product Name"
                            inputName="name" defaultValue={_get(this.productInfo,'name','')}
                            onChange={this.handleInputChange} errorCheck={false}
                            className="text-input error"
                        />
                    </div>
                    <div className="col-sm-6 col-md-4 form-d">
                        <label className="control-label">SKU</label>
                        <GenericInput
                            htmlFor="sku" displayName="SKU"
                            inputName="sku" defaultValue={_get(this.productInfo,'sku','')}
                            onChange={this.handleInputChange} errorCheck={false}
                            className="text-input error"
                        />
                    </div>
                
                
                    <div className="col-sm-6 col-md-4 form-d">
                        <label className="control-label">Price</label>
                        <GenericInput
                            htmlFor="costPrice" displayName="Price" type="number"
                            inputName="costPrice" defaultValue={_get(this.productInfo,'costPrice','')}
                            onChange={this.handleInputChange} errorCheck={false}
                            className="text-input error"
                        />
                    </div>
                    <div className="col-sm-6 col-md-4 form-d">
                        <label className="control-label">Product Detail</label>
                        <GenericInput
                            htmlFor="description" displayName="Product Description"
                            inputName="description" defaultValue={_get(this.productInfo,'description','')}
                            onChange={this.handleInputChange} errorCheck={false}
                            className="text-input error"
                        />
                    </div>

                    <div className="col-sm-6 col-md-4 form-d">
                        <label className="control-label">POS Price</label>
                        <GenericInput
                            htmlFor="sellingPrice" displayName="POS Price" type="number"
                            inputName="sellingPrice" defaultValue={_get(this.productInfo,'sellingPrice','')}
                            onChange={this.handleInputChange} errorCheck={false}
                            className="text-input error"
                        />
                    </div>
                    <div className="col-sm-6 col-md-4 form-d">
                        <label className="control-label">Categories</label>
                        <AutoComplete
                            type="multi"
                            data={_get(this.categories,'data',[])}
                            name="categories"
                            value={_get(this.productInfo,'categories','')}
                            changeHandler={(id, name) => { this.handleSelectChange(id, "categories") }}
                        />
                    </div>
                
                      
                        <div className="col-sm-6 col-md-4 form-d">
                            <div className="row">
                                <div className="col-sm-12">
                                    <label className="control-label">Upload Images</label>
                                    <div className="" style={{marginTop: "5px", float:"left", marginRight: "15px"}}>
                                    {/* <input type="file" id="files" className="hidden"/> */}
                                        <label className="btn btn-default" for="files">Select file</label>
                                        <input type="file"  title=" " className="hidden" id="files" name="images" multiple={false} onChange={this.handleFileChange}/>
                                    </div>
                                    <div className="pull-left" style={{marginTop:"5px", padding:"5px 0 0"}}>
                                        <ul>{this.fileNames}</ul>
                                    </div>
                                </div>    
                            </div>
                            {this.imagePreviewUrl!=='' &&
                            <div className="row" style={{marginTop: "10px"}}>
                                <div className="col-sm-12">
                                    <img style={{width:'100%', maxWidth:"500px", height:'350px'}} src={this.imagePreviewUrl} />
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
                            <SaveButton buttonDisplayText={'Save'} Class_Name={"btn-info"} handlerSearch={this.onSave}/>
                            <SaveButton buttonDisplayText={'Cancel'} Class_Name={""} handlerSearch={this.handleCancel}/>
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
    let { type, productData, selectedProduct, fileData } = productsReducer || '';
    
    let { retailerId, userId } = userRolesReducer['userRolesData'] ? userRolesReducer['userRolesData'] : {};



    return {
        status,
        isFetching,
        retailerId,        
        userId,
        type,
        productData,
        selectedProduct,
        fileData

    }
}

export default connect(mapStateToProps)(ProductContainer);
