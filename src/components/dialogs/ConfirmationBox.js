import React from 'react';
import { withStyles } from '@material-ui/styles';


import styles from './style';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import WarningIcon from '@material-ui/icons/Warning';

type Props = {
  classes: Object,
  dialogText: Object,
  icon: String,
  open: Boolean,
  updateParent: Function,
};

const ConfirmationBox= (Props) => {
  const classes = Props.classes;
  const handleClose = () => {
    Props.updateParent(false);
  };

  const renderIcon = () => (<>
    {Props.icon === "error" && (
      <ErrorOutlineIcon className={classes.alertIconError}/>
    )}
    {Props.icon === "warning" && (
      <WarningIcon className={classes.alertIconWarning}/>
    )}
    {Props.icon === "success" && (
      <CheckCircleOutlineIcon className={classes.alertIconSuccess}/>
    )}
  </>);

  return (
    <div>
      <Dialog
        open={Props.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle 
          id="alert-dialog-title" 
          className={classes.alertTitle}
        >
          {renderIcon()}
          { Props.dialogText.title }
        </DialogTitle>
        <DialogContent>
          <DialogContentText 
            id="alert-dialog-description"
            className={classes.alertMessage}
          >
            { Props.dialogText.message }
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.alertButtons}>
          <Button 
            className={classes.alertButton}
            onClick={handleClose}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default withStyles(styles)(ConfirmationBox);
