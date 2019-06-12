import React from "react";
import { Show, SimpleShowLayout, TextField, ReferenceField } from "react-admin"; // eslint-disable-line import/no-unresolved
import { FormDataConsumer } from "ra-core";

const CategoryShow = props => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <FormDataConsumer>
        {({ formData, ...rest }) => {
          return (
            <React.Fragment>
              {formData.parentCategoryId ? (
                <ReferenceField
                  addLabel={true}
                  label="Parent Category"
                  source="parentCategoryId"
                  reference="Category"
                  linkType="show"
                  {...rest}
                >
                  <TextField source="name" />
                </ReferenceField>
              ) : null}
            </React.Fragment>
          );
        }}
      </FormDataConsumer>
    </SimpleShowLayout>
  </Show>
);

export default CategoryShow;
