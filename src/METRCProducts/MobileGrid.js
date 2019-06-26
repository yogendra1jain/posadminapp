import React from "react";
import { TextField, EditButton, ShowButton } from "react-admin";
import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import _get from "lodash/get";

const listStyles = theme => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    margin: "0.5rem 0"
  },
  cardTitleContent: {
    display: "flex",
    flexDirection: "rows",
    justifyContent: "space-between"
  },
  cardContent: theme.typography.body1,
  cardContentRow: {
    display: "flex",
    flexDirection: "rows",
    alignItems: "center",
    margin: "0.5rem 0"
  },
  SyncStyle: {
    marginLeft: "20px",
    marginTop: "10px"
  }
});

const MobileGrid = ({ classes, ids, data, basePath, translate }) => (
  <div style={{ margin: "1em" }}>
    {ids.map(id => (
      <Card key={id} className={classes.card}>
        <CardContent className={classes.cardContent}>
          <span className={classes.cardContentRow}>
            METRC Id:&nbsp;
              <TextField record={data[id]} source="id" />
          </span>
          <span className={classes.cardContentRow}>
            METRC Item:&nbsp;
              <TextField record={data[id]} source="name" />
          </span>
          <span className={classes.cardContentRow}>
            Type:&nbsp;
          <TextField record={data[id]} source="ProductCategoryType" />
          </span>
          <span className={classes.cardContentRow}>
            Category:&nbsp;
            <TextField record={data[id]} source="productCategoryName" />
          </span>
          <span className={classes.cardContentRow}>
            Unit of Measure:&nbsp;
            <TextField record={data[id]} source="unitOfMeasureName" />
          </span>
          <EditButton
            label="Import"
            resource="METRCProducts"
            basePath={basePath}
            record={data[id]}
          />
          <ShowButton
            resource="METRCProducts"
            basePath={basePath}
            record={data[id]}
          />
        </CardContent>
      </Card>
    ))}
  </div>
);

export default withStyles(listStyles)(MobileGrid);
