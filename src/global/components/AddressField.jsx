import React from "react";
import _get from "lodash/get";
import Typography from "@material-ui/core/Typography";

export const AddressField = ({ record = {} }) => {
  return (
    <Typography>
      {_get(record, "address.addressLine1", "") +
        ", " +
        _get(record, "address.addressLine2", "") +
        ", " +
        _get(record, "address.city", "") +
        ", " +
        _get(record, "address.state", "") +
        ", " +
        _get(record, "address.country", "") +
        ", " +
        _get(record, "address.postalCode", "")}
    </Typography>
  );
};

AddressField.defaultProps = { label: "Address" };
