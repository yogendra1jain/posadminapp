import React from 'react';
/* Lodash Imports */
import _get from 'lodash/get';
/* Data Fetch */
import genericPostData from '../../Global/DataFetch/genericPostData'

import connect from 'react-redux/lib/connect/connect';
/* Component Import */
import LevelCategories from './components/LevelCategories'


class CategoriesContainer extends React.Component {

    constructor(){
        super();
        this.state = {
            
        }
    }

    componentDidMount(){
      debugger
      let retailerId = localStorage.getItem('retailerID');
      genericPostData({
        dispatch: this.props.dispatch,
        reqObj: {id: retailerId},
        url: '/Category/Level1ByRetailerId',
        constants: { init: 'GET_ALL_CATEGORIES_BY_RETAILER', success: 'GET_ALL_CATEGORIES_BY_RETAILER_SUCCESS', error: 'GET_ALL_CATEGORIES_BY_RETAILER_ERROR' },
        successCb: () => {debugger}
    })
    }
    
    render() {
        return (
            <div>
              <LevelCategories />
            </div>
        );
    }
}

const mapStateToProps = state => {

}

export default connect(mapStateToProps)(CategoriesContainer);