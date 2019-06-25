import React from "react";
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
  TextInput
} from "react-admin";
import Button from "@material-ui/core/Button";
import DineroPrice from "../global/components/DineroPrice";
import MedicalIcon from "@material-ui/icons/Healing";
import RecIcon from "@material-ui/icons/Spa";
import NonCannaIcon from "@material-ui/icons/ShoppingCart";
import Avatar from "@material-ui/core/Avatar";

const filterChoices = [
  { id: "1", name: "Not Mapped Products" },
  { id: "2", name: "Mapped Products" }
];

const ListActions = (props) => {
  return (
    <div>
      <Button
        color="primary"
        variant="contained"
        onClick={
          () => {
            props.history.push({
              pathname: '/Products',
              search: 'isMap=true'
            })
          }
        }
      > Map Products
      </Button>
    </div>
  );
};

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

class SampleList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showMasterProducts: false
    }
  }

  render() {
    return (
      <List
        {...this.props}
        actions={<ListActions {...this.props} />}
        filters={<StoreProductFilter />}
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
              {/* {this.props.location.search == '?isMap=true' ? null : <EditButton />}
              {this.props.location.search == '?isMap=true' ? null : <ShowButton label="View" />} */}
            </Datagrid>
          }
        />
      </List>
    )
  }
}

export default SampleList