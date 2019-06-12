import React from 'react';
import { Datagrid, NumberField, List, CreateButton, ReferenceField, TextField, ArrayField, SingleFieldList, ChipField, CardActions } from 'react-admin';
import { Route } from 'react-router';
import { Drawer } from '@material-ui/core';
import InventoryEdit from './InventoryEdit';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { push } from 'react-router-redux';
import { withStyles } from '@material-ui/core';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CallSplit from '@material-ui/icons/CallSplit';

const styles = {
    drawerContent: {
        width: 300
    }
};
const AddNewSplitButton = ({ record }) => (
    <Button
      title="Split Package"
      color="primary"
      component={Link}
      to={{
        pathname: '/Package/create',
        search: `?sourcePackageId=${record.id}`
      }}
      label="Split Package"
    >
      <CallSplit />
      Split 
    </Button>
  );


class InventoryList extends React.Component {
    handleClose = () => {
        this.props.push('/tags');
    };
    render() {
        return (
            <React.Fragment>
                <List {...this.props}  >
                    <Datagrid rowClick="edit">
                        <ReferenceField linkType="show" source="product.id"
                            reference="Search/Products" label="Product Name">
                            <TextField source="name" />
                        </ReferenceField>
                        <TextField label="Quantity In Hand" source="inventory.quantity" />
                        <TextField label="UOM" source="inventory.uom" />
                        {/* <AddNewSplitButton label="Split" /> */}
                    </Datagrid>
                </List>
            </React.Fragment>
        );
    }
}

export default compose(
    connect(
        undefined,
        { push }
    ),
    withStyles(styles)
)(InventoryList);


