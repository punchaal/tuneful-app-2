import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import theme from './instapaper/theme/instapaper/theme';
import Slide from '@material-ui/core/Slide';
import useForm from "../Services/useForm";
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import user_id from '../Services/get-user-id'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditProfile(props) {
    const [open, setOpen] = React.useState(false);
    const { values,handleEditProfileSubmit, handleChange } = useForm();

    const useStyles = makeStyles({
        editButton: {
            background: "#828282",
            color: "#fff",
            marginLeft: 0,
            marginTop: 12,
            [theme.breakpoints.up('sm')]: {
                marginLeft: 20,
            },
        }
    });

    const classes = useStyles();

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    return (
        <Box>
            <Button
                className={classes.editButton}
                variant="outlined"
                onClick={handleClickOpen}>
                Edit Profile
              </Button>

            <Dialog TransitionComponent={Transition}
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title">

                <form onSubmit={handleEditProfileSubmit} className={classes.form} onError={errors => console.log(errors)}>

                    <DialogTitle id="form-dialog-title">Edit Profile</DialogTitle>

                    <DialogContent>
                        <DialogContentText>
                            Please enter a description about yourself or about your interests.
                   </DialogContentText>
                        <TextField
                            onChange={handleChange}
                            autoFocus
                            value={values.description}
                            margin="dense"
                            id="description"
                            label="Description"
                            type="text"
                            fullWidth
                        />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                   </Button>
                        <Button type="submit" color="primary" className={classes.submit}>
                            Enter
                      </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    );
}