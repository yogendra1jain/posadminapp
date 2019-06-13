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
import { Typography } from "@material-ui/core";


const Aside = (props) => (
  <div style={{ width: 400, margin: '1em' }}>

    <div className="mt-10">
      <Typography variant="caption">Id</Typography>
      <Typography variant="h5">{props.id}</Typography>
    </div>
    <div className="mt-10">
      <Typography variant="caption">Label</Typography>
      <Typography variant="h5">{props.label}</Typography>
    </div>
    <div className="mt-10">
      <Typography variant="caption">Metrc Id</Typography>
      <Typography variant="h5">{props.metrcId}</Typography>
    </div>
    <div className="mt-10">
      <Typography variant="caption">Metrc Product</Typography>
      <Typography variant="h5">{props.metrcProduct}</Typography>
    </div>
    <div className="mt-10">
      <Typography variant="caption">Quantity</Typography>
      <Typography variant="h5">{props.quantity}</Typography>
    </div>
    <div className="mt-10">
      <Typography variant="caption">UOM</Typography>
      <Typography variant="h5">{props.uom}</Typography>
    </div>
    <div className="mt-10">
      <Typography variant="caption">Package Type</Typography>
      <Typography variant="h5">{props.packageType}</Typography>
    </div>
  </div>
);

class PackageSplitCreate extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.props.dataProvider('GET_ONE', 'Package', { id: this.props.sourcePackageId }).then((data) => {
      this.setState({ ...data.data })
    })

  }
  render() {
    return (
      <Create {...this.props}  aside={<Aside {...this.state} />}>
        <SimpleForm
        redirect="list"
          defaultValue={{ sourcePackageId: this.props.sourcePackageId }}
        >
          <TextField source="sourcePackageId" />
          <ArrayInput source="itemPackages" validate={required()}>
            <SimpleFormIterator>
              <TextInput source="label" />
              <NumberInput source="quantity" label="Quantity" />
            </SimpleFormIterator>
          </ArrayInput>
        </SimpleForm>
      </Create>
    );

  }
}



export default withDataProvider(PackageSplitCreate);
