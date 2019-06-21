import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  BooleanInput,
  ReferenceField,
  ReferenceInput,
  TextField,
  SelectInput,
  required
} from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";

const OperatorEditTitle = ({ record }) => {
  return <span>Edit {record.person.firstName}</span>;
};

const roleChoices = [
  { id: "cashier", name: "Budtender" },
  { id: "manager", name: "Manager" }
];

export const styles = {
  width: { width: "5em" },
  timezone: { width: "10em" },
  widthFormGroup: { display: "inline-block" },
  height: { width: "5em" },
  heightFormGroup: { display: "inline-block", marginLeft: 32 }
};

const OperatorEdit = ({ classes, ...props }) => {
  return (
    <Edit title={<OperatorEditTitle />} {...props}>
      <SimpleForm defaultValue={{ countryCode: "1" }} redirect="list">
        {props.permissions !== "1" ? (
          <ReferenceField label="Store" source="storeId" reference="Store">
            <TextField source="name" />
          </ReferenceField>
        ) : (
          <ReferenceInput
            source="storeId"
            reference="Store"
            validate={required()}
          >
            <SelectInput optionText="name" />
          </ReferenceInput>
        )}
        <TextInput
          validate={required()}
          label="First Name"
          source="person.firstName"
          formClassName={classes.widthFormGroup}
        />
        <TextInput
          validate={required()}
          label="Last Name"
          formClassName={classes.heightFormGroup}
          source="person.lastName"
        />
        <div style={{ width: 400, margin: "1em" }} />

        <NumberInput
          validate={required()}
          label="Phone Number"
          formClassName={classes.widthFormGroup}
          source="phoneNumber.phoneNumber"
        />
        <TextInput
          validate={required()}
          source="email"
          formClassName={classes.heightFormGroup}
        />
        <div style={{ width: 400, margin: "1em" }} />

        <SelectInput
          validate={required()}
          choices={roleChoices}
          source="role"
          formClassName={classes.widthFormGroup}
        />
        <NumberInput
          validate={required()}
          source="loginPin"
          formClassName={classes.heightFormGroup}
        />

        <BooleanInput
          validate={required()}
          source="active"
          defaultValue={true}
        />
      </SimpleForm>
    </Edit>
  );
};

export default withStyles(styles)(OperatorEdit);
