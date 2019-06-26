import React from "react";
import {
  ReferenceInput,
  NumberInput,
  AutocompleteInput,
  ArrayInput,
  Create,
  SimpleFormIterator,
  TextInput,
  required,
  FormDataConsumer,
  SimpleForm,
  withDataProvider,
  TextField
} from "react-admin";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { qtyValidation } from "./validations";

const Aside = props => (
  <div style={{ width: 400, margin: "1em" }}>
    <Card>
      <CardContent>
        <Typography>Source Package Details</Typography>
        <div style={{ width: 400, margin: "1em" }} />
        <div className="mt-10">
          <Typography variant="caption">Label</Typography>
          <Typography>{props.label}</Typography>
        </div>
        <div className="mt-10">
          <Typography variant="caption">Metrc Id</Typography>
          <Typography>{props.metrcId}</Typography>
        </div>
        <div className="mt-10">
          <Typography variant="caption">Product</Typography>
          <Typography>{props.metrcProduct}</Typography>
        </div>
        <div className="mt-10">
          <Typography variant="caption">Quantity</Typography>
          <Typography>{props.quantity}</Typography>
        </div>
        <div className="mt-10">
          <Typography variant="caption">UOM</Typography>
          <Typography>{props.uom}</Typography>
        </div>
        <div className="mt-10">
          <Typography variant="caption">Package Type</Typography>
          <Typography>{props.packageType}</Typography>
        </div>
      </CardContent>
    </Card>
  </div>
);

class PackageSplitCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props
      .dataProvider("GET_ONE", "Package", { id: this.props.sourcePackageId })
      .then(data => {
        this.setState({ ...data.data });
      });
  }
  render() {
    return (
      <Create {...this.props} aside={<Aside {...this.state} />}>
        <SimpleForm
          redirect="list"
          defaultValue={{ sourcePackageId: this.props.sourcePackageId }}
        >
          {/* <TextField source="sourcePackageId" /> */}
          <ArrayInput
            label="Create New Packages"
            source="itemPackages"
            validate={required()}
          >
            <SimpleFormIterator>
              <TextInput label="METRC Tag (Label)" source="label" validate={required()} />
              {this.state.uom=="Each"? <NumberInput
                source="quantity"
                label="Quantity"
                parse={val=>val<=0?1:parseInt(val)}
                validate={[required(),(values,allData)=>qtyValidation(values,allData,this.state.quantity)]}
              />: <NumberInput
              source="quantity"
              label="Quantity"
              parse={val=>val<=0?0:val}
              validate={[required(),(values,allData)=>qtyValidation(values,allData,this.state.quantity)]}
              />}
            </SimpleFormIterator>
          </ArrayInput>
        </SimpleForm>
      </Create>
    );
  }
}

export default withDataProvider(PackageSplitCreate);
