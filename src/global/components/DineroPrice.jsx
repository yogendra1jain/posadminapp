import React from "react";
import dineroObj from "../conversion/DineroObj";
import _get from "lodash/get";
import Typography from "@material-ui/core/Typography";

const DineroPrice = props => {
  const { record, source, resource } = props;
  console.log(record, 'jkvgdy')
  return (
    <Typography>
      {dineroObj(_get(record, source, 0)).toFormat("$0,0.00")}
    </Typography>
  );
};

DineroPrice.defaultProps = {
  addLabel: true
};

export default DineroPrice;
