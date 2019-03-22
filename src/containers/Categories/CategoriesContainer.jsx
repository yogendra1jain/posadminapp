import React from 'react';
/* Lodash Imports */
import _get from 'lodash/get';
/* Data Fetch */
import genericPostData from '../../Global/DataFetch/genericPostData'
import { getLevel1Categories, getAllByRetailerId } from '../../actions/categories'
/* Redux Imports */
import connect from 'react-redux/lib/connect/connect';
/* Component Import */
import LevelCategories from './components/LevelCategories'
import EditCategoriesDialogue from './components/EditCategoriesDialogue'

class CategoriesContainer extends React.Component {

  constructor() {
    super();
    this.state = {
      open: false,
      level: '',
      categoryData: ''
    }
  }

  componentDidMount() {
    this.handleCategoryFetch()
  }

  handleCategoryFetch = () => {
    let reqObj = {
      id: localStorage.getItem('retailerID')
    }
    this.props.dispatch(getAllByRetailerId('', '/Category/GroupedCategoriesByRetailerId', reqObj))
  }

  handleClickOpen = (level, categoryData, event) => {
    this.setState({ open: true, level, categoryData, event});
  };

  handleClose = () => {
    this.setState({ open: false, level: '', categoryData: '', event: '' });
  };

  render() {
    return (
      <div>
        <LevelCategories
          categoriesTree={this.props.rootCategories}
          handleClickOpen={this.handleClickOpen}
        />
        <EditCategoriesDialogue
          open={this.state.open}
          handleClose={this.handleClose}
          handleCategoryFetch={this.handleCategoryFetch}
          level={this.state.level}
          categoryData={this.state.categoryData}
          dispatch={this.props.dispatch}
          event={this.state.event}
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