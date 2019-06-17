import React from "react";
import {
  List,
  Datagrid,
  TextField,
  withDataProvider,
  EditButton,
  FormDataConsumer,
  Filter,
  TextInput,
  ReferenceInput,
  SelectInput,
  CardActions,
  CreateButton,
  Link,
  ShowButton,
  Responsive
} from "react-admin";
import InfoOutline from "@material-ui/icons/InfoOutline";
import moment from "moment";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import uuidv1 from "uuid/v1";
import MobileGrid from "./MobileGrid";

const PendingPackageTitle = () => {
  return <span>Shipped Packages</span>;
};

const ListActionButton = ({
  basePath,
  data,
  resource,
  syncClick,
  lastSynched,
  disable
}) => {
  return (
    <div>
      <Typography>{`Last Synced: ${moment(
        lastSynched * 1
      ).fromNow()}`}</Typography>
      <Button
        disabled={disable}
        color="primary"
        variant="contained"
        onClick={syncClick}
      >
        synchronize
      </Button>
    </div>
  );
};
const PackageFilter = ({ permissions, ...props }) => {
  return (
    <Filter {...props}>
      <TextInput label="Search" source="q" alwaysOn />
      {permissions === "1" ? (
        <ReferenceInput
          label="Select Store"
          reference="Store"
          alwaysOn
          allowEmpty={false}
          source="storeId"
        >
          <SelectInput source="name" />
        </ReferenceInput>
      ) : null}
    </Filter>
  );
};
const MyEditButton = ({ record, ...props }) => (
  <EditButton
    {...props}
    component={Link}
    to={{
      pathname: props.basePath + "/" + record.packageLabel,
      state: { record: { storeId: localStorage.getItem("storeId") } }
    }}
  />
);
const MyShowButton = ({ record, ...props }) => (
  <ShowButton
    {...props}
    component={Link}
    to={{
      pathname: props.basePath + "/" + record.id + "/show",
      search: `?storeId=${localStorage.getItem("storeId")}`
    }}
  />
);

const FilterActions = ({ permissions, basePath, ...rest }) => {
  debugger;
  return (
    <CardActions>
      {localStorage.getItem('role') === "1" ? <CreateButton {...rest} basePath={basePath}
        to={{
          pathname: "/Package/create",
        }} /> :
        <CreateButton
          {...rest}
          basePath={basePath}
          to={{
            pathname: "/Package/create",
            search: `?storeId=${localStorage.getItem("storeId")}`
            // state: { record: { storeId: storeId } }
          }}
        />
      }

    </CardActions>
  );
}
class PackagePendingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { lastSynched: null, disable: false, key: uuidv1() };
  }
  setTimOutCb = () => {
    this.setState({ disable: false, key: uuidv1() });
  };
  syncClick = props => {
    this.setState({ disable: true });
    setTimeout(this.setTimOutCb, 60 * 1000);
    this.props
      .dataProvider("GET_ONE", "Sync/Metrc/IncomingTransfers", {
        id: localStorage.getItem("retailerId")
      })
      .then(data => {
        localStorage.setItem("lastSynched", Date.now());
        this.setState({ lastSynched: Date.now(), key: uuidv1() });
      });
  };
  componentDidMount() {
    this.setState({ lastSynched: localStorage.getItem("incomingPkgSyncTime") });
  }

  render() {
    let { permissions } = this.props;
    return (
      <div className="flex-column">
        <List
          {...this.props}
          key={this.state.key}
          title={<PendingPackageTitle />}
          actions={<FilterActions />}
          filters={<PackageFilter permissions={permissions} />}
          actions={
            <ListActionButton
              disable={this.state.disable}
              lastSynched={this.state.lastSynched}
              syncClick={this.syncClick}
            />
          }
        >
            <Responsive
              small={<MobileGrid />}
              medium={<Datagrid>
                <TextField label="Manifest" source="manifestNumber" />
                <TextField label="Label" source="packageLabel" />
                <TextField label="METRC Product" source="productName" />
                <TextField label="Category" source="productCategoryName" />
                <TextField label="Shipment Status" source="shipmentPackageState" />
                <TextField label="Quantity" source="shippedQuantity" />
                <TextField
                  label="UOM"
                  source="shippedUnitOfMeasureName"
                  defaultValue={0}
                />
                <MyEditButton />
              </Datagrid>}/>
        </List>
      </div>
          );
        }
      }
      
      export default withDataProvider(PackagePendingList);
      
      
