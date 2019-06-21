import React from "react";
import { ReferenceField } from "react-admin";
import Avatar from "@material-ui/core/Avatar";

const AvatarField = ({ record, size }) => (
  <Avatar
    src={`${record.image}?size=${size}x${size}`}
    size={size}
    style={{ width: size, height: size }}
  />
);

const ProductField = ({ record = {}, size }) => (
  <div style={{ display: "flex", flexWrap: "nowrap", alignItems: "center" }}>
    <AvatarField record={record} size={size} />
    &nbsp;{record.name}
  </div>
);
const ProductReferenceField = props => (
  <ReferenceField
    source={props.src}
    reference="Products"
    {...props}
    linkType="show"
  >
    <ProductField />
  </ReferenceField>
);

ProductReferenceField.defaultProps = {
  addLabel: true
};

export default ProductReferenceField;
