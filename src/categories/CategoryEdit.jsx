// /* eslint react/jsx-key: off */
// import React from "react";
// import { Edit, SimpleForm, TextField, TextInput, required } from "react-admin";

// const CategoryEdit = props => (
//   <Edit {...props}>
//     <SimpleForm>
//       <TextField source="id" />
//       <TextInput source="name" validate={[required()]} />
//     </SimpleForm>
//   </Edit>
// );

// export default CategoryEdit;

import React from "react";
import { change } from "redux-form";
import {
  Edit,
  SimpleForm,
  FormDataConsumer,
  SelectInput,
  Query,
  LinearProgress,
  TextField,
  TextInput,
  REDUX_FORM_NAME,
  required,
  RadioButtonGroupInput
} from "react-admin";

const CategoryEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" validate={[required()]} />
      <SelectInput
        validate={[required()]}
        defaultValue={0}
        parse={v => parseInt(v)}
        source="categoryType"
        label="Category Level"
        choices={[{ id: 0, name: "Category" }, { id: 1, name: "Sub Category" }]}
      />

      <FormDataConsumer>
        {({ formData, ...rest }) => {
          return (
            <React.Fragment>
              {formData.categoryType == 1 ? (
                <Query
                  type="GET_LIST"
                  resource="Level1ByRetailerId"
                  payload={{ id: localStorage.getItem("retailerId") }}
                >
                  {({ data, loading, error }) => {
                    if (loading) {
                      return <LinearProgress />;
                    }
                    if (error) {
                      return <p>ERROR</p>;
                    }
                    return (
                      <div>
                        <SelectInput
                          validate={required()}
                          source="parentCategoryId"
                          choices={data}
                          optionText="name"
                          optionValue="id"
                          {...rest}
                        />
                      </div>
                    );
                  }}
                </Query>
              ) : null}
            </React.Fragment>
            // <React.Fragment>
            //   {formData.categoryType == 1 ? (
            //     <ReferenceInput
            //       addLabel={true}
            //       label="Parent Category"
            //       source="parentCategoryId"
            //       reference="Category"
            //       {...rest}
            //     >
            //       <SelectInput source="name" />
            //     </ReferenceInput>
            //   ) : null}
            // </React.Fragment>
          );
        }}
      </FormDataConsumer>
    </SimpleForm>
  </Edit>
);

export default CategoryEdit;
