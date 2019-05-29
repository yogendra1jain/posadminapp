import React from 'react';
import {
    Filter,
    List,
    ReferenceInput,
    SelectInput,
    DataGrid,
    TextField
} from 'react-admin';
import CustomList from './CustomList';
import TextFieldMat from '@material-ui/core/TextField'
import axiosFetcher from '../../global/dataFetcher/axiosFetcher';
import AutoComplete from '../../global/components/AutoComplete';
import _get from 'lodash/get';
const SaleReportFilter = props => (
    <Filter {...props}>
        <ReferenceInput label="Select Store" reference="Store" alwaysOn>
            <SelectInput source="name" />
        </ReferenceInput>
    </Filter>
);

const defaultValues = {
    id: "90fcee1b-fef3-4af7-a686-80159751d127",
    fromTimeStamp: {
        seconds: 1557945000
    },
    toTimeStamp: {
        seconds: 1558031399
    }
}

class SaleReportList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            storeList:[]
        }
    }
    dateSelectHandler = (type) => {
        return (date) => {
            this.setState({
                [type]: date.target.value
            });
        }
    }
    componentDidMount() {
        axiosFetcher({
            method: 'POST',
            url: "Store/ByRetailerId",
            reqObj: {
                id: localStorage.getItem('retailerId')
            },
            dispatch: this.props.dispatch,
            identifier: "getStoreByRetailer_dashboard",
            successCb: (storeList) => {
                let storeListArr = storeList.map((store) => {
                    let displayObj = {
                        displayText: store.name,
                        value: store.id
                    }
                    return displayObj
                });
                this.setState({ storeList: storeListArr });

            },
            errorCb: () => console.log("err is here"),
            dontShowMessage: true
        })
    }
    storeSelectHandler = (id) => {
        this.setState({ selectedStore: id });
    }
    render() {
        return (
            <React.Fragment>
                <div>
                    <TextFieldMat
                        id="date"
                        label="Select Date"
                        type="date"
                        value={this.state.date}
                        onChange={this.dateSelectHandler("date")}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <AutoComplete
                        type="single"
                        data={this.state.storeList}
                        name="stores"
                        value={_get(this.state, 'selectedStore', '')}
                        changeHandler={this.storeSelectHandler}
                    />
                </div>
                {false ? <List
                    {...this.props}
                    filters={<SaleReportFilter />}
                    filterDefaultValues={defaultValues}
                >

                </List> : null}
            </React.Fragment>
        );
    }
}

export default SaleReportList;
