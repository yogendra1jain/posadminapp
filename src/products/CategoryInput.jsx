import React from "react";
import { change } from "redux-form";
import {
  Query,
  LinearProgress,
  SelectInput,
  FormDataConsumer,
  REDUX_FORM_NAME,
} from "react-admin";

const CategoryInput = ({ record }) => (
  <div>
    <FormDataConsumer>
      {({ formData, dispatch, ...rest }) => (
        <Query
          type="GET_LIST"
          resource="Level1ByRetailerId"
          payload={{ id: record.retailerId }}
        >
          {({ data, loading, error }) => {
            if (loading) {
              return <LinearProgress />;
            }
            if (error) {
              return <p> -- No Categories</p>;
            }
            return (
              <div>
                <SelectInput
                  source="category1"
                  choices={data}
                  optionText="name"
                  optionValue="id"
                  onChange={value =>
                    dispatch(change(REDUX_FORM_NAME, "category2", null))
                  }
                  {...rest}
                />
              </div>
            );
          }}
        </Query>
      )}
    </FormDataConsumer>
    <FormDataConsumer>
      {({ formData, dispatch, ...rest }) => (
        <Query
          type="GET_LIST"
          resource="GetChildren"
          payload={{ id: formData.category1 }}
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
                  source="category2"
                  choices={data}
                  optionText="name"
                  optionValue="id"
                  onChange={value =>
                    dispatch(change(REDUX_FORM_NAME, "category3", null))
                  }
                  {...rest}
                />
              </div>
            );
          }}
        </Query>
      )}
    </FormDataConsumer>
    <FormDataConsumer>
      {({ formData, ...rest }) => (
        <Query
          type="GET_LIST"
          resource="GetChildren"
          payload={{ id: formData.category2 }}
        >
          {({ data, loading, error }) => {
            if (loading) {
              return <LinearProgress />;
            }
            if (error) {
              return <p> -- No Categories -- </p>;
            }
            return (
              <div>
                {formData.category2 != null ? (
                  <SelectInput
                    source="category3"
                    choices={data}
                    optionText="name"
                    optionValue="id"
                    {...rest}
                  />
                ) : null}
              </div>
            );
          }}
        </Query>
      )}
    </FormDataConsumer>
  </div>
);

export default CategoryInput;
