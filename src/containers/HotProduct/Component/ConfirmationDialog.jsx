import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

class ConfirmationDialog extends React.Component {
    state = {
        open: false,
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { fullScreen } = this.props;

        return (
            <div>
                <Dialog
                    fullWidth
                    maxWidth='sm'
                    open={this.props.open}
                    onClose={this.handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle style={{ fontSize: '1.4rem' }} id="responsive-dialog-title">{this.props.title}</DialogTitle>
                    <DialogContent>
                        <DialogContentText style={{ fontSize: '1.4rem' }}>
                            {this.props.text}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleClose} color="primary">
                            Cancel
            </Button>
                        <Button onClick={this.props.handleSubmit} color="primary" autoFocus>
                            Submit
            </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

ConfirmationDialog.propTypes = {
    fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(ConfirmationDialog);
