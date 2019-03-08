import React from 'react';
/* Lodash Imports */
import _get from 'lodash/get';
/* Data Fetch */
import genericPostData from '../../Global/DataFetch/genericPostData'
import { getLevel1Categories, getAllByRetailerId } from '../../actions/categories'

import connect from 'react-redux/lib/connect/connect';
/* Component Import */
import LevelCategories from './components/LevelCategories'


class CategoriesContainer extends React.Component {

  constructor() {
    super();
    this.state = {
      
    }
  }

  componentDidMount() {
    let reqObj = {
      id: localStorage.getItem('retailerID')
    }

    // this.props.dispatch(getLevel1Categories('', '/Category/Level1ByRetailerId', reqObj))

    this.props.dispatch(getAllByRetailerId('', '/Category/GroupedCategoriesByRetailerId', reqObj))
  }

  render() {
    return (
      <div>
        <LevelCategories
          categoriesTree={this.props.rootCategories}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  let { categoriesReducer } = state
  let rootCategories = categoriesReducer.allCategories || []
  
  return (
    categoriesReducer,
    rootCategories
  )
}

export default connect(mapStateToProps)(CategoriesContainer);