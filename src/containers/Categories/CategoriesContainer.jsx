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
      categoriesTree: [
        {
          id: 12345,
          name: 'Mens',
          categoryType: 'level1',
          children: [
            {
              id: 120,
              name: 'Pants',
              categoryType: 'level2',
            },
            {
              id: 121,
              name: 'Shirts',
              categoryType: 'level2',
            },
          ],
          retailerId: 213456,
        },
        {
          id: 12236,
          name: 'Womens',
          categoryType: 'level1',
          children: [
            {
              id: 122,
              name: 'Jewel',
              categoryType: 'level2',
              children: [
                {
                  id: 122,
                  name: 'Jewel',
                  categoryType: 'level2',
                },
                {
                  id: 123,
                  name: 'Bracelets',
                  categoryType: 'level2',
                },
              ],
            },
            {
              id: 123,
              name: 'Bracelets',
              categoryType: 'level2',
            },
          ],
          retailerId: 213456,
        }
      ]
    }
  }

  componentWillReceiveProps(props) {
    let { categoriesTree } = this.state
    let { allCategories, level1Data } = props || []
    if (level1Data.length != 0) {

    }
    if (allCategories.length != 0 && categoriesTree.length != 0) {

    }
  }

  componentDidMount() {
    let reqObj = {
      id: localStorage.getItem('retailerID')
    }
    //   genericPostData({
    //     dispatch: this.props.dispatch,
    //     reqObj: {id: retailerId},
    //     url: '/Category/Level1ByRetailerId',
    //     constants: { init: 'GET_ALL_CATEGORIES_BY_RETAILER', success: 'GET_ALL_CATEGORIES_BY_RETAILER_SUCCESS', error: 'GET_ALL_CATEGORIES_BY_RETAILER_ERROR' },
    //     successCb: () => {debugger}
    // })
    this.props.dispatch(getLevel1Categories('', '/Category/Level1ByRetailerId', reqObj))
    this.props.dispatch(getAllByRetailerId('', '/Category/AllByRetailerId', reqObj))
  }

  render() {
    return (
      <div>
        <LevelCategories
          categoriesTree={this.state.categoriesTree}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  let { categoriesReducer } = state
  let { allCategories, level1Data } = categoriesReducer || []
  return (
    allCategories,
    level1Data,
    categoriesReducer
  )
}

export default connect(mapStateToProps)(CategoriesContainer);