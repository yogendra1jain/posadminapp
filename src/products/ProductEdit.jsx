
// import { TextField, BooleanField, ReferenceField, DateField, NumberField, Datagrid, List, } from 'react-admin';
// import React from 'react';
// export const ProductList = props => (
//     <List {...props}>
//         <Datagrid rowClick="edit">
//             <TextField source="sku" />
//             <TextField source="name" />
//             <TextField source="costPrice.amount" />
//             <TextField source="salePrice.amount" />
//             {/* <TextField source="id" />
//             <TextField source="name" />
//             <TextField source="description" />
//             <TextField source="category1" />
//             <TextField source="category2" />
//             <TextField source="category3" />
//             <TextField source="image" />
//             <BooleanField source="active" />
//             <TextField source="salePrice.currency" />
//             <TextField source="sku" />
//             <TextField source="upcCode" />
//             <BooleanField source="isTaxable" />
//             <ReferenceField source="retailerId" reference="retailers"><TextField source="id" /></ReferenceField>
//             <TextField source="costPrice.currency" />
//             <BooleanField source="discountable" />
//             <NumberField source="createdOn.seconds" />
//             <DateField source="dimensions" />
//             <TextField source="keywords" />
//             <DateField source="extendedSku" />
//             <TextField source="seasonality" />
//             <NumberField source="updatedOn.seconds" />
//             <TextField source="additionalUpcCodes" /> */}
//         </Datagrid>
//     </List>
// );


import React from 'react';
import {
    translate,
    AutocompleteInput,
    BooleanInput,
    DateInput,
    Edit,
    TextInput,
    LongTextInput,
    NumberInput,
    ReferenceInput,
    SelectInput,
    SimpleForm,
    FormDataConsumer,
    Query,
    Loading,
    Error
} from 'react-admin';
import withStyles from '@material-ui/core/styles/withStyles';
import { CustomerPriceInput } from './CustomPriceInput';
import dineroObj from '../Global/Conversion/dineroObj';
import splitDotWithInt from '../Global/Conversion/splitDotWithInt';
// import axiosFetcher from '../Global/DataFetcher/axiosFetcher';
import CategoryInput from './CategoryInput.jsx';


const OrderTitle = translate(({ record, translate }) => (
    <span>
        {translate('resources.commands.title', { reference: record.reference })}
    </span>
));

const editStyles = {
    root: { alignItems: 'flex-start' },
};
class ProductEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = { choices: [] };
    }
    componentDidMount() {
    }
    getL2Category = ({ formData, ...rest }) => {
        // axiosFetcher({
        //     method: 'POST',
        //     url: 'Customer/Create',
        //     reqObj: values,
        //     successCb: this.handleAddCustomerSuccess,
        //     errorCb: this.handleAddCustomerError
        // })
        return (<Query type="GET_ONE" resource="Category/GetChildren" payload={{ id: formData.category1 }}>
            {({ data, loading, error }) =>
                loading ? <Loading />
                    : error ? <Error />
                        : <div>User {data.username}</div>
            }
        </Query>
        )
    }
    fetchCategory = ({ data, loading, error })=> {
        debugger;
        console.log(data, loading, error)
        return (
            loading ? <Loading />
                : error ? <Error />
                    : <div>User {data.username}</div>
        )
    }
    render() {
        console.log(this.props);
        return (
            <Edit title={<OrderTitle />}     {...this.props}>
                <SimpleForm>
                    <TextInput source="name" options={{ fullWidth: true }} />
                    <TextInput source="sku" options={{ fullWidth: true }} />
                    <LongTextInput source="description" />
                    <NumberInput label="Cost Price" format={v => dineroObj(v).toUnit(2)} parse={v => splitDotWithInt(v)} source={'costPrice.amount'} />
                    <NumberInput label="Pos Price" format={v => dineroObj(v).toUnit(2)} parse={v => splitDotWithInt(v)} source={'salePrice.amount'} />
                    <CategoryInput source={'category1'} />
                </SimpleForm>
            </Edit>
        )
    }
}
ProductEdit = withStyles(editStyles)(ProductEdit);
export { ProductEdit };