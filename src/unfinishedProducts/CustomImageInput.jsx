import React from "react";
import {
  Query,
  LinearProgress,
  REDUX_FORM_NAME,
  ImageField,
  FormDataConsumer
} from "react-admin";
import { change } from "redux-form";

const CustomImageInput = ({ record }) => (
  <FormDataConsumer>
    {({ formData, dispatch, ...rest }) => (
      <Query type="GET_ONE" resource="IMAGE" payload={{ file: record.rawFile }}>
        {({ data, loading, error }) => {
          if (loading) {
            return <LinearProgress />;
          }
          if (error) {
            return <p> unable to set image </p>;
          }
          //   saveFetchedUrl(data.url)
          if (data.url != record.newImage) {
            record.newImage = data.url;
            // dispatch(change(REDUX_FORM_NAME, "image", data.url));
          }
          return (
            <ImageField source="newImage" record={record} {...rest} />
            // <div></div>
          );
        }}
      </Query>
    )}
  </FormDataConsumer>
);

export default CustomImageInput;
