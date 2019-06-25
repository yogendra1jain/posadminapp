import React from "react";
import { TextField } from "react-admin";
import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
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
          <CardHeader title={<TextField record={data[id]} source="name" />} />
          <span className={classes.cardContentRow}>
            Metrc Id:&nbsp;
            <TextField record={data[id]} source="metrcId" />
          </span>
          <span className={classes.cardContentRow}>
            Type:&nbsp;
            <TextField record={data[id]} source="metrcItemType" />
          </span>
          <span className={classes.cardContentRow}>
            Metrc Category:&nbsp;
            <TextField record={data[id]} source="metrcCategory" />
          </span>
          <span className={classes.cardContentRow}>
            Unit Of Measure:&nbsp;
            <TextField record={data[id]} source="metrcUom" />
          </span>
        </CardContent>
      </Card>
    ))}
  </div>
);

export default withStyles(listStyles)(MobileGrid);