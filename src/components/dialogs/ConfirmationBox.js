import React from 'react';
import { withStyles } from '@material-ui/styles';


import styles from './style';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

type Props = {
  classes: Object,
  dialogText: Object,
  open: Boolean,
  updateParent: Function,
};

const ConfirmationBox= (Props) => {
  const [parentShow, updateParent] = React.useState(Props.updateParent);

  const handleClose = () => {
    Props.updateParent(false);
  };

  return (
    <div>
      <Dialog
        open={Props.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{ Props.dialogText.title }</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            { Props.dialogText.message }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default withStyles(styles)(ConfirmationBox);
