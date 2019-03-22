import React from 'react';
/* Lodash Imports */
import _get from 'lodash/get';
/* Material Imports */
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
/* Data Fetch */
import { getAllByRetailerId } from '../../../actions/categories'


function Transition(props) {
    return <Slide direction="up" {...props} />;
}

export default class EditCategoriesDialogue extends React.Component {
    state = {
        open: false,
    };

    handleSubmit = () => {
        this.saveNewCategory()
        this.props.handleCategoryFetch()
        this.props.handleClose()
    }

    saveNewCategory = () => {
        let categoryName = this.state.name
        let retailerID = localStorage.getItem('retailerID')
        let categoryId = _get(this.props, 'categoryData.id')
        let parentCategoryId = _get(this.props, 'categoryData.parentCategoryId')
        let reqObj = {}

        if (this.props.event == 'edit') {
            if (this.props.level === 0) {
                reqObj = {
                    name: categoryName,
                    categoryType: 0,
                    retailerId: retailerID,
                    id: categoryId
                }
            }
            else if (this.props.level === 1) {
                reqObj = {
                    name: categoryName,
                    parentCategoryId: parentCategoryId,
                    categoryType: 1,
                    retailerId: retailerID,
                    id: categoryId
                }
            }
            else if (this.props.level === 2) {
                reqObj = {
                    name: categoryName,
                    parentCategoryId: parentCategoryId,
                    categoryType: 2,
                    retailerId: retailerID,
                    id: categoryId
                }
            }
        }
        else if(this.props.event == 'add'){
            
        }

        this.props.dispatch(getAllByRetailerId('', '/Category/Save', { ...reqObj }))
        this.setState({
            name: '',
        });
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        return (
            <div>
                <Dialog
                    open={this.props.open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.props.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                    fullWidth
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        {"Edit Category Name"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Change Root Category name from "{_get(this.props, 'categoryData.name')}"
                        </DialogContentText>
                        <TextField
                            id="outlined-name"
                            label="New Category Name"
                            value={this.state.name}
                            onChange={this.handleChange('name')}
                            margin="normal"
                            variant="outlined"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleClose} color="primary">Disagree</Button>
                        <Button onClick={this.handleSubmit} color="primary">Agree</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}