import React from "react";
import {
  Show,
  SimpleShowLayout,
  FunctionField,
  TextField,
  ReferenceField
} from "react-admin"; // eslint-disable-line import/no-unresolved
import { FormDataConsumer } from "ra-core";
import Typography from "@material-ui/core/Typography";
import _get from 'lodash/get';

const CategoryShow = props => (
  <Show {...props}>
    <SimpleShowLayout>
      {/* <TextField source="id" /> */}
      <TextField source="name" />
      <FunctionField
        label="Type"
        render={record =>
          _get(record, "categoryType", 0) === 0 ? "Category" : "Sub Category"
        }
      />
      <FormDataConsumer>
        {({ formData, ...rest }) => {
          return (
            <React.Fragment>
              {formData.parentCategoryId ? (
                <React.Fragment>
                  <Typography variant="caption">Parent Category</Typography>
                  <ReferenceField
                    label="Parent Category"
                    source="parentCategoryId"
                    reference="Category"
                    linkType="show"
                    {...rest}
                  >
                    <TextField source="name" />
                  </ReferenceField>
                </React.Fragment>
              ) : null}
            </React.Fragment>
          );
        }}
      </FormDataConsumer>
    </SimpleShowLayout>
  </Show>
);

export default CategoryShow;
