import React from 'react';
/* Lodash Imports */
import _get from 'lodash/get';
/* Material import */

/* Redux Imports */ 
import { getLevel1Categories, getAllByRetailerId } from '../../actions/categories';
import connect from 'react-redux/lib/connect/connect';
/* Component Imports */
import AddCategoryForm from './components/AddCategoryForm/AddCategoryForm'


class AddNewCategoryContainer extends React.Component {

    constructor(){
        super();
        this.state = {
            
        }
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
        this.props.dispatch(getAllByRetailerId('', '/Category/SaveAll', {...reqObj}))
        console.log(reqObj, 'mak')
      }
    
    }
    
    render() {
        return (
            <div>
              <AddCategoryForm submitForm = {this.submitCategories}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
  
}

export default connect(mapStateToProps)(AddNewCategoryContainer);