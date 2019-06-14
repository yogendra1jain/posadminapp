
import React from "react";

//lodash imports
import _find from "lodash/find";
import _get from "lodash/get";

//React admin imports
import {
  TextField,
  Datagrid,
  List,
  EditButton,
  ShowButton,
  FunctionField,
  Filter,
  ReferenceInput,
  SelectInput,
  CardActions,
  CreateButton,
  BooleanField,
  Link,
  EmailField,
  NumberField,
  ReferenceField
} from "react-admin";


const SampleList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
      </Datagrid>
    </List>
  )
}

export default SampleList
