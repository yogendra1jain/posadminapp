import React from 'react';
import FormControl from "react-bootstrap/lib/FormControl";
import "bootstrap/dist/css/bootstrap.css";
import SaveButton from '../../components/common/SaveButton.jsx'
import AutoCompletePosition from '../../components/Elements/AutoCompletePosition.jsx';
import connect from 'react-redux/lib/connect/connect';
import _get from 'lodash/get';
import _set from 'lodash/set';
import _isEmpty from 'lodash/isEmpty';
import _find from 'lodash/find';
import Row from "react-bootstrap/lib/Row";
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import 'react-drawer/lib/react-drawer.css';
import { fetchProductLookupData } from '../../actions/products';



class AddEditInventoryContainer extends React.Component {
    constructor(props) {
        super(props);   
        this.selectedInventory = {};
        this.storeList = [];
        this.products = [];
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.saveInventory = this.saveInventory.bind(this); 
        
        if(!this.props.isAdmin){
            let url = '';
           if(localStorage.getItem('role')==='Store Manager'){
                url = '/product/'+localStorage.getItem('storeID');
            }
            const { dispatch, productsReducer } = this.props;        
            dispatch(fetchProductLookupData(productsReducer, url)); 
        }
        

    }
    shouldComponentUpdate(props){
        if(!props.open){
            return false;
        }else{
            return true;
        }
    }
    saveInventory () {
        this.props.saveInventory(this.selectedInventory);
    }
    handleSelectChange (id, name) {
        _set(this.selectedInventory,name,id);
        if(name==='store'){
            let url = '';
            if(localStorage.getItem('role')==='Admin'){
                url = '/products/'+localStorage.getItem('retailerID');
            }else if(localStorage.getItem('role')==='Store Manager'){
                url = '/product/'+localStorage.getItem('storeID');
            }
            const { dispatch, productsReducer } = this.props;        
            dispatch(fetchProductLookupData(productsReducer, url)); 
        }
        this.forceUpdate();
    }
   

    handleInputChange (event) {
        _set(this.selectedInventory, event.target.name, event.target.value);
        this.forceUpdate();
    }

    componentWillReceiveProps(props) {
       
        // if(!_isEmpty(props.storeData)){
        //     this.storeList = [];
        //      props.storeData.stores.map((store, index)=>{
        //          this.storeList.push({displayText: store.storeName, value: store.id});
        //      });
        // }
     
        if(!_isEmpty(props.productData)){
             this.products   = [];
             props.productData.map(product=>{
             this.products.push({displayText:product.name , value: product.id})                       
                        
         });
        }
     
        this.forceUpdate();
     }

     handleCancel=()=>{
         this.props.onClose();
     }

    render() {
        this.storeList = this.props.storeList;
        // if(this.props.isUpdate){
            this.selectedInventory = this.props.selectedInventory;
        // }
        return(
            <div className="inventory-drawer">

            <Row className="d-flex">
                {
                    this.props.isAdmin ?
                    !this.props.isUpdate ?
                    <div className="col-sm-6 col-md-4 form-d" > 
                    <label class="control-label">Store</label>
                    <AutoCompletePosition
                            type="single"
                            data={this.storeList ? this.storeList : []}
                            value={this.selectedInventory.store ? this.selectedInventory.store : ''}
                            name="store"
                            placeholder="Select Store"
                            changeHandler={
                                (id) => {
                                    this.handleSelectChange(id, "store")
                                }
                            }
                        />
                    </div>
                    :
                    <fieldset className="col-md-4 col-sm-6 form-d" disabled={true}>
                    
                    <label class="control-label">Store</label>
                    <FormControl
                            type="text"
                            name="store"                                                                    
                            value={this.selectedInventory && this.selectedInventory.store ? this.selectedInventory.store : ''}
                            placeholder="Store"
                            // onChange = {this.handleInputChange}
                        >
                        </FormControl>
                    
                    </fieldset>
                    :
                    ''
                }
                
                {!this.props.isUpdate ?
                <div className="col-sm-6 col-md-4 form-d"> 
                <label class="control-label">Product</label>
            <AutoCompletePosition
                        type="single"
                        data={this.products ? this.products : []}
                        value={this.selectedInventory.product ? this.selectedInventory.product : ''}
                        name="product"
                        placeholder="Select Product"
                        changeHandler={
                            (id) => {
                                this.handleSelectChange(id, "product")
                            }
                        }
                    />
                </div>
                :
                <fieldset className="col-sm-6 col-md-4 form-d" disabled={true}>
               <label class="control-label">Product</label>
                <FormControl
                        type="text"
                        name="product"                                                                    
                        value={this.selectedInventory && this.selectedInventory.product ? this.selectedInventory.product : ''}
                        placeholder="Store"
                        // onChange = {this.handleInputChange}
                    >
                    </FormControl>
                
                </fieldset>
                }
                <div className="col-sm-6 col-md-4 form-d">
                <label class="control-label">Quantity</label>
                <FormControl
                        type="number"
                        name="availableQuantity"                                            
                        value={this.selectedInventory && this.selectedInventory.availableQuantity ? this.selectedInventory.availableQuantity : ''}
                        placeholder="Quantity"
                        onChange = {this.handleInputChange}
                    >
                    </FormControl>
                </div>
               

               
                <div className="col-sm-6 col-md-4 form-btn-group-left" style={{paddingTop:"22px"}} >
                    <SaveButton Class_Name="btn-info" buttonDisplayText={'Save'} handlerSearch={this.saveInventory}/>
                    <SaveButton buttonDisplayText={'Cancel'} handlerSearch={this.handleCancel}/>
                </div>
            </Row>
        </div>
        )
    }

}


const mapStateToProps = state => {

    let { inventoriesReducer, userRolesReducer, storesReducer, productsReducer } = state

    let { status } = inventoriesReducer || '';
    let { isFetching } = inventoriesReducer || false;
    let { type, inventoryData, inventorySaveData } = inventoriesReducer || '';
    let { storeData } = storesReducer || {};
    let { productData } = productsReducer || '';

    
    let { retailerId, userId } = userRolesReducer['userRolesData'] ? userRolesReducer['userRolesData'] : {};



    return {
        status,
        isFetching,
        retailerId,        
        userId,
        type,
        inventoryData,
        storeData,
        productData,
        inventorySaveData


    }
}

export default connect(mapStateToProps)(AddEditInventoryContainer);