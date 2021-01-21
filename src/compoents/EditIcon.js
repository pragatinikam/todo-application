import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Edit from '@material-ui/icons/Edit';
import { blue } from '@material-ui/core/colors';

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
            <Fab size="small" style={{ backgroundColor: blue[500] }} aria-label="add" >
                <Edit fontSize="small" className={classes.icon} variant="Outlined" />
            </Fab>
        </div>
    );
};

export default AddIcon;