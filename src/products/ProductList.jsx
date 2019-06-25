import {
  ShowButton,
  FunctionField,
  Datagrid,
  EditButton,
  Filter,
  List,
  TextField,
  TextInput,
  SelectInput,
  Responsive
} from "react-admin";
import React from "react";
import DineroPrice from "../global/components/DineroPrice";
import _get from "lodash/get";
import MobileGrid from "./MobileGrid";
import Avatar from "@material-ui/core/Avatar";
import SyncIcon from "@material-ui/icons/Sync";
import MedicalIcon from "@material-ui/icons/Healing";
import RecIcon from "@material-ui/icons/Spa";
import NonCannaIcon from "@material-ui/icons/ShoppingCart";

const ProductListTitle = ({ record }) => {
  return <span>Product List</span>;
};

const productTypeChoices = [
  { id: "1", name: "Cannabis" },
  { id: "2", name: "Medical Cannabis" },
  { id: "3", name: "Non Cannabis" }
];

const ProductField = ({ record = {} }) => (
  <div style={{ display: "flex", flexWrap: "nowrap", alignItems: "center" }}>
    <Avatar
      src={`${record.image}?size=${25}x${25}`}
      size={25}
      style={{ width: 25, height: 25 }}
    />{" "}
    &nbsp;{record.name}
  </div>
);

const ProductFilter = props => {
  return (
    <Filter {...props}>
      <TextInput label="Search" source="q" alwaysOn />
      <SelectInput
        choices={productTypeChoices}
        label="Product Type"
        source="productType"
        allowEmpty={false}
      />
    </Filter>
  );
};

class ProductList extends React.Component {
  render() {
    return (
      <List
        {...this.props}
        title={<ProductListTitle />}
        filters={<ProductFilter />}
      // filterDefaultValues={{ productType: "1" }}
      >
        <Responsive
          small={<MobileGrid />}
          medium={
            <Datagrid>
              {/* <TextField label="Name" source="name" /> */}
              <ProductField label="Product" />
              <TextField label="SKU" source="sku" />
              <DineroPrice label="Cost Price" source="costPrice.amount" />
              <DineroPrice label="Sale Price" source="salePrice.amount" />

              <FunctionField
                text-align="left"
                label="Product Type"
                render={record =>
                  _get(record, "productType", 0) === 1 ? (
                    <RecIcon style={{ color: "grey" }} titleAccess="Cannabis" />
                  ) : _get(record, "productType", 0) === 2 ? (
                    <MedicalIcon
                      style={{ color: "grey" }}
                      titleAccess="Medical Only"
                    />
                  ) : (
                        <NonCannaIcon
                          style={{ color: "grey" }}
                          titleAccess="Non Cannabis"
                        />
                      )
                }
              />
              <EditButton />
              <ShowButton label="View" />
            </Datagrid>
          }
        />
      </List>
    );
  }
}

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
