import React from "react";
import {
  ReferenceInput,
  NumberInput,
  AutocompleteInput,
  ArrayInput,
  Create,
  SimpleFormIterator,
  TextInput,
  required
} from "react-admin";
import { SimpleForm } from "react-admin";
import { FormDataConsumer } from "ra-core";
import { parse } from "query-string";
import NewPackageCreate from "./NewPackageCreate";
import PackageSplitCreate from './PackageSplitCreate';



const PackageCreate = props => {
  const { sourcePackageId: sourcePackageId } = parse(props.location.search);
  console.log(sourcePackageId, "sourcePackageId_stringsourcePackageId_string")
  return (
    <React.Fragment>
      {
        sourcePackageId ? <PackageSplitCreate {...props} sourcePackageId={sourcePackageId} /> : <NewPackageCreate {...props} />
      }
    </React.Fragment>

  );
};

export default PackageCreate;
