import React, {Fragment} from "react";
import _find from "lodash/find";
import _get from "lodash/get";
import {
  TextField,
  Datagrid,
  List,
  FunctionField,
  Filter,
  SelectInput,
  Responsive,
  TextInput,
  ExportButton,
  // withDataProvider,
  crudUpdateMany
} from "react-admin";
import { connect } from 'react-redux';
import Button from "@material-ui/core/Button";
import DineroPrice from "../global/components/DineroPrice";
import MedicalIcon from "@material-ui/icons/Healing";
import RecIcon from "@material-ui/icons/Spa";
import NonCannaIcon from "@material-ui/icons/ShoppingCart";
import Avatar from "@material-ui/core/Avatar";

const filterChoices = [
  { id: "1", name: "Mapped Products" },
  { id: "2", name: "Not Mapped Products" }
];

const ListActions = (props) => {
  const { 
    currentSort,
    exporter,
    filterValues,
    resource,
    total
  } = props
  return (
    <div>
      <ExportButton
        disabled={total === 0}
        resource={resource}
        sort={currentSort}
        filter={filterValues}
        exporter={exporter}
      />
    </div>
  );
};

const mapProductsWithStore = (props) => {
  // props.dataProvider("CREATE", "MapProductWithStore", {
  //   storeId: localStorage.getItem("storeId"),
  //   productIds: _get(props,'selectedIds', [])
  // }).then(data => {
  //   console.log(data)
  // })
  //   .catch(err => {
  //     console.log(err)
  //   })
  const { basePath, crudUpdateMany, resource, selectedIds } = props;
  crudUpdateMany(resource, selectedIds, { storeId: localStorage.getItem("storeId") }, basePath);
}

const BulkActionButtons = (props) => {
  return (
  <Fragment>
    {_get(props,'filterValues.productType', 0) == 2 ? <Button onClick={() => mapProductsWithStore(props)}>Map Products</Button> : false }
  </Fragment>
  
)};

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

const StoreProductFilter = props => {
  return (
    <Filter {...props}>
      <TextInput label="Search" source="q" alwaysOn />
      <SelectInput
        choices={filterChoices}
        label="Product Type"
        source="productType"
        alwaysOn
        allowEmpty={false}
      />
    </Filter>
  );
};

const Title = () => <span>Store Products</span>

class StoreProductList extends React.Component {
  render() {
    return (
      <List
        {...this.props}
        title={<Title />}
        actions={<ListActions {...this.props} />}
        filters={<StoreProductFilter />}
        bulkActionButtons={<BulkActionButtons {...this.props} />}
        filterDefaultValues={{ productType : 1 }}
      >
        <Responsive
          // small={<MobileGrid />}
          medium={
            <Datagrid>
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
            </Datagrid>
          }
        />
      </List>
    )
  }
}

export default connect(undefined, { crudUpdateMany })(StoreProductList)