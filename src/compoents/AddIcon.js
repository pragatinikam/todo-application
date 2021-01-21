import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Add from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    addicon: {
        display: "flex",
        justifyContent: "flex-end",
    },
    icon: {
        color: "#ffffff"
    }
}));

const AddIcon = () => {
    const classes = useStyles();
    return (
        <div className={classes.addicon}>
            <Fab size="small" color="primary" aria-label="add" >
                <Add className={classes.icon} />
            </Fab>
        </div>
    );
};

export default AddIcon;