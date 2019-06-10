import {
  //   AutocompleteInput,
  //   BooleanField,
  //   DateField,
  //   DateInput,
  //   NullableBooleanInput,
  // NumberField,
  //   ReferenceInput,
  //   Responsive,
  //   SearchInput,
  ShowButton,
  FunctionField,
  Datagrid,
  EditButton,
  Filter,
  List,
  TextField,
  TextInput,
  SelectInput
} from "react-admin";
import React from "react";
import DineroPrice from "../global/components/DineroPrice";
import SyncIcon from "@material-ui/icons/Sync";
import _get from "lodash/get";
// import withStyles from "@material-ui/core/styles/withStyles";
// import Divider from "@material-ui/core/Divider";
// import Tabs from "@material-ui/core/Tabs";
// import Tab from "@material-ui/core/Tab";

// const datagridStyles = {
//   total: { fontWeight: "bold" }
// };

const ProductListTitle = ({ record }) => {
  return <span>Product List</span>;
};

const choices = [{ id: "0", name: "Pending Sync" }, { id: "1", name: "Live" }];

const ProductFilter = props => {
  return (
    <Filter {...props}>
      <TextInput label="Search" source="q" alwaysOn />
      <SelectInput
        choices={choices}
        label="Product Status"
        source="syncStatus"
        alwaysOn
        allowEmpty={false}
      />
    </Filter>
  );
};

const ProductList = props => (
  <List {...props} title={<ProductListTitle />} filters={<ProductFilter />} filterDefaultValues={{syncStatus: "1"}}>
    <Datagrid>
      <TextField label="Name" source="name" />
      <TextField label="METRC Id" source="metrcId" />
      <TextField label="SKU" source="sku" />
      {/* <DineroPrice label="Cost Price" source="costPrice.amount" /> */}
      <DineroPrice label="Sale Price" source="salePrice.amount" />

      <FunctionField
        text-align="left"
        label="Sync Status"
        render={record =>
          _get(record, "syncStatus", 0) === 0 ? (
            <SyncIcon style={{ color: "orange" }} />
          ) : (
            <SyncIcon style={{ color: "green" }} />
          )
        }
      />
      <EditButton />
      <ShowButton />
    </Datagrid>
  </List>
);

// class TabbedDatagrid extends React.Component {
//   tabs = [
//     { id: 1, name: "live" },
//     { id: 0, name: "pending" },
//     { id: 2, name: "imported" }
//   ];

//   state = { live: [], pending: [], imported: [] };

//   static getDerivedStateFromProps(props, state) {
//     if (props.ids !== state[props.filterValues.syncStatus]) {
//       return { ...state, [props.filterValues.syncStatus]: props.ids };
//     }
//     return null;
//   }

//   handleChange = (event, value) => {
//     const { filterValues, setFilters } = this.props;
//     setFilters({ ...filterValues, syncStatus: value });
//   };

//   render() {
//     const { classes, filterValues, ...props } = this.props;
//     return (
//       <React.Fragment>
//         <Tabs
//           fullWidth
//           centered
//           value={filterValues.syncStatus}
//           indicatorColor="primary"
//           onChange={this.handleChange}
//         >
//           {this.tabs.map(choice => (
//             <Tab key={choice.id} label={choice.name} value={choice.id} />
//           ))}
//         </Tabs>
//         <Divider />
//         <Responsive
//           medium={
//             <div>
//               {filterValues.syncStatus === "ordered" && (
//                 <Datagrid {...props} ids={this.state.ordered}>
//                   <DateField source="date" showTime />
//                   <TextField source="reference" />
//                   <NumberField
//                     source="total"
//                     options={{
//                       style: "currency",
//                       currency: "USD"
//                     }}
//                     className={classes.total}
//                   />
//                   <EditButton />
//                 </Datagrid>
//               )}
//               {filterValues.syncStatus === "delivered" && (
//                 <Datagrid {...props} ids={this.state.delivered}>
//                   <DateField source="date" showTime />
//                   <TextField source="reference" />
//                   <NumberField
//                     source="total"
//                     options={{
//                       style: "currency",
//                       currency: "USD"
//                     }}
//                     className={classes.total}
//                   />
//                   <BooleanField source="returned" />
//                   <EditButton />
//                 </Datagrid>
//               )}
//               {filterValues.syncStatus === "cancelled" && (
//                 <Datagrid {...props} ids={this.state.cancelled}>
//                   <DateField source="date" showTime />
//                   <TextField source="reference" />
//                   <NumberField
//                     source="total"
//                     options={{
//                       style: "currency",
//                       currency: "USD"
//                     }}
//                     className={classes.total}
//                   />
//                   <BooleanField source="returned" />
//                   <EditButton />
//                 </Datagrid>
//               )}
//             </div>
//           }
//         />
//       </React.Fragment>
//     );
//   }
// }

// const StyledTabbedDatagrid = withStyles(datagridStyles)(TabbedDatagrid);

// const ProductList = ({ classes, ...props }) => (
//   <List
//     {...props}
//     filterDefaultValues={{ syncStatus: 1 }}
//     perPage={25}
//     filters={<ProductFilter />}
//     title={<ProductListTitle />}
//   >
//     <StyledTabbedDatagrid />
//   </List>
// );

export default ProductList;
