import React from 'react';
/* Lodash Imports */
import _get from 'lodash/get';
/* Material import */

/* Redux Imports */

/* Component Imports */
import DatePicker from 'react-datepicker';
import AutoComplete from '../../components/Elements/AutoComplete';
class From extends React.Component {

    constructor() {
        super();
        this.state = {

        }
    }
    dateSelectHandler = (type) => {
        return (date) => {
            this.setState({
                [type]: date
            });
            this.props.onDateSelect(type, date);
        }
    }
    storeSelectHandler = (id) => {
        this.setState({ selectedStore: id });
        this.props.onStoreSelect(id);
    }
    render() {
        const role = localStorage.getItem('role')
        return (
            <React.Fragment>
                <div>
                    <div>
                        <label>From: </label>
                    </div>
                    <DatePicker
                        selected={this.state.startDate}
                        selectsStart
                        showYearDropdown={true}
                        startDate={this.state.startDate}
                        onSelect={this.dateSelectHandler("startDate")}
                        className="form-control"
                    />
                </div>
                {this.props.doNotShowTo ? null : <div>
                    <div class="head-title">
                        <label>To: </label>
                    </div>
                    <DatePicker
                        selected={this.state.endDate}
                        selectsStart
                        showYearDropdown={true}
                        startDate={this.state.startDate}
                        onSelect={this.dateSelectHandler("endDate")}
                        className="form-control"
                    />
                </div>}
                {
                    role == 1 ? 
                    <div style={{ width: "25%" }}>
                        <label>Select Store</label>
                        <AutoComplete
                            type="single"
                            data={this.props.storeList}
                            name="stores"
                            value={_get(this.state, 'selectedStore', '')}
                            changeHandler={this.storeSelectHandler}
                        />
                    </div> : 
                    <div style={{ width: "25%", marginTop: "25px" }}>  
                        <label>Store Name: <span>{localStorage.getItem('storeName')}
                        </span></label>
                    </div>
                }
                
            </React.Fragment>

        );
    }
}

export default From;



//Using this component

/*<FromandToCalander
    doNotShowTo={true} //if you dont want TODate to be shown
    onDateSelect={this.onDateSelect}
    storeList={this.state.storeList} //pass store list in this format
    onStoreSelect={this.onStoreSelect}
/>*/



// implement this handler in your component
//  onDateSelect = (type, value) => {
//      this.setState({ [type]: value })
//  }
// onStoreSelect = (id) => {
//     this.setState({id})
//    }