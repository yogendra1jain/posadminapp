import React, {Component} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import _get from 'lodash/get';

const columns = [{
    dataField: 'id',
    text: 'Product ID'
  }, {
    dataField: 'name',
    text: 'Product Name'
  }, {
    dataField: 'price',
    text: 'Product Price'
  }, {
    
}];

const rowEvents = {
    onClick: (e, row, rowIndex) => {
      
    }
  };

class TestTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [
                { 
                    id: 123,
                    name: 'Product 1',
                    price: 20
                },
                { 
                    id: 124,
                    name: 'Product 2',
                    price: 21
                },
                { 
                    id: 125,
                    name: 'Product 3',
                    price: 22
                }
            ]
        }
    }
    render() {
        return (
            <BootstrapTable
                keyField="id"
                data={ _get(this.state,'products',[]) }
                columns={ columns }
                cellEdit={ cellEditFactory({ mode: 'click' }) }
                rowEvents = {rowEvents}
            />
        )
    }
}

export default TestTable;