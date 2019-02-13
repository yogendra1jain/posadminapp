import React, { Children } from 'react';
/* Lodash Imports */
import _get from 'lodash/get';
import _set from 'lodash/set';
import _isEmpty from 'lodash/isEmpty';
/* Material import */
import Divider from '@material-ui/core/Divider';
/* Redux Imports */
import { getLevel1Categories, getAllByRetailerId } from '../../actions/categories';
import { fetchLevel1Category, fetchLevel2Category, fetchLevel3Category } from '../../actions/products';
import connect from 'react-redux/lib/connect/connect';
import {
  RECEIVE_PRODUCT_DATA,
  RECEIVED_DOCUMENT_UPLOAD_SUCCESS_RESPONSE,
  RECEIVE_LEVEL1_CATEGORY_DATA,
  RECEIVE_LEVEL2_CATEGORY_DATA,
  RECEIVE_LEVEL3_CATEGORY_DATA
} from '../../constants/products';
/* Component Imports */
import AddCategoryForm from './components/AddCategoryForm/AddCategoryForm'
import AutoCompletePosition from '../../components/Elements/AutoCompletePosition';
import { GenericInput } from '../../components/common/TextValidation.jsx';
import SaveButton from '../../components/common/SaveButton.jsx'

class AddNewCategoryContainer extends React.Component {

  constructor() {
    super();
    this.state = {
      level1Category: [],
      level2Category: [],
      level3Category: [],
      addNewlabel: 'New Root Category'
    }
    this.productInfo = {};
  }

  componentDidMount() {
    let url = '/Category/Level1ByRetailerId'
    let reqBody = {
      id: localStorage.getItem('retailerID')
    }
    this.props.dispatch(fetchLevel1Category('', url, reqBody))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.type === RECEIVE_LEVEL1_CATEGORY_DATA) {
      if (!_isEmpty(nextProps.level1CategoryData)) {
        let categoryList = [];
        _get(nextProps, 'level1CategoryData', []).map((category, index) => {
          categoryList.push({
            displayText: category.name,
            value: category.id
          });
        });
        this.setState({
          level1Category: categoryList,
        })
      }
    }

    if (nextProps.type === RECEIVE_LEVEL2_CATEGORY_DATA) {
      if (!_isEmpty(nextProps.level2CategoryData)) {
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

  submitCategories = (values) => {
    let retailerID = localStorage.getItem('retailerID')
    if (values) {
      let reqObj = {
        rootCategories: [{
          categoryType: 0,
          retailerId: retailerID,
          ...values
        }]
      }
      this.props.dispatch(getAllByRetailerId('', '/Category/SaveAll', { ...reqObj }))
      console.log(reqObj, 'mak')
    }

  }

  handleInputChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    _set(this.productInfo, name, value);
    this.forceUpdate();
  }

  handleSelectChange = (id, name) => {
    _set(this.productInfo, name, id);
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
      this.setState({
        addNewlabel: 'New Sub Category'
      })
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
      this.setState({
        addNewlabel: 'New Leaf Category'
      })
    }
    this.forceUpdate();
  }

  saveNewCategory = () => {
    let categoryName = this.productInfo.newCategory
    let retailerID = localStorage.getItem('retailerID')
    let reqObj = {}
    switch (this.state.addNewlabel) {
      case 'New Root Category':
        reqObj = {
          name : categoryName,
          categoryType : 0,
          retailerId : retailerID,
        }
        break;
      case 'New Sub Category':
        reqObj = {
          name : categoryName,
          parentCategoryId : this.productInfo.level1,
          categoryType : 1,
          retailerId : retailerID,
        }
        break;
      case 'New Leaf Category':
        reqObj = {
          name : categoryName,
          parentCategoryId : this.productInfo.level2,
          categoryType : 2,
          retailerId : retailerID,
        }
        break;
    }
    this.props.dispatch(getAllByRetailerId('', '/Category/Save', { ...reqObj }))
  }

  render() {
    return (
      <div className='flex-column'>
        <h3>Add New Category</h3>
        <div>
          <div className="col-sm-4 col-md-3 form-d">
            <label className="control-label">Select Root Cateogry</label>
            <AutoCompletePosition
              type="single"
              data={_get(this.state, 'level1Category', [])}
              name="level1Cat"
              value={_get(this.productInfo, 'level1', '')}
              changeHandler={(id, name) => { this.handleLevel1Category(id, 'level1') }}
            />
          </div>
          <div className="col-sm-4 col-md-3 form-d">
            <label className="control-label">Select Sub Cateogry</label>
            <AutoCompletePosition
              type="single"
              data={_get(this.state, 'level2Category', [])}
              name="level2Cat"
              value={_get(this.productInfo, 'level2', '')}
              changeHandler={(id, name) => { this.handleLevel2Category(id, 'level2') }}
            />
          </div>
          <div className="col-sm-4 col-md-3 form-d">
            <label className="control-label">{this.state.addNewlabel}</label>
            <GenericInput
              htmlFor="newCategory"
              displayName={this.state.addNewlabel}
              inputName="newCategory"
              defaultValue={_get(this.productInfo, 'newCategory', '')}
              onChange={this.handleInputChange}
              errorCheck={false}
              className="text-input error"
            />
          </div>
          <div className="col-sm-4 col-md-3">
            <div className="form-btn-group">
              <SaveButton buttonDisplayText={'Add New'} Class_Name={"btn-info"} handlerSearch={this.saveNewCategory} />
            </div>
          </div>
        </div>
        <Divider />
        <h3>Make New Category</h3>
        <AddCategoryForm submitForm={this.submitCategories} />
      </div>

    );
  }
}

const mapStateToProps = state => {
  let { productsReducer } = state
  let { type, level1CategoryData, level2CategoryData, level3CategoryData } = productsReducer || '';

  return {
    type,
    level1CategoryData,
    level2CategoryData,
    level3CategoryData
  }
}

export default connect(mapStateToProps)(AddNewCategoryContainer);