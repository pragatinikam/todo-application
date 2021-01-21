import * as React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Grid, Typography, Select } from "@material-ui/core"
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import AddIcon from "../compoents/AddIcon"
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { green, grey, blue } from '@material-ui/core/colors';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import DeleteButton from "../compoents/DeleteIcon"
import EditButton from "../compoents/EditIcon"
import moment from "moment"
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const AntTabs = withStyles({
    root: {
        borderBottom: '1px solid #e8e8e8',
    },
    indicator: {
        backgroundColor: '#1890ff',
    },
})(Tabs);

const AntTab = withStyles((theme) => ({
    root: {
        textTransform: 'none',
        minWidth: 72,
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing(4),
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
            color: '#40a9ff',
            opacity: 1,
        },
        '&$selected': {
            color: '#1890ff',
            fontWeight: theme.typography.fontWeightMedium,
        },
        '&:focus': {
            color: '#40a9ff',
        },
    },
    selected: {},
}))((props) => <Tab disableRipple {...props} />);

const CancelButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(grey[500]),
        backgroundColor: grey[500],
        '&:hover': {
            backgroundColor: grey[700],
        },
    },
}))(Button);

const SaveButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(green[500]),
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
}))(Button);

const OpenButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(blue[500]),
        backgroundColor: blue[500],
        '&:hover': {
            backgroundColor: blue[700],
        },
    },
}))(Button);

export default function ToDo() {
    const classes = useStyles();
    const [taskItems, setTaskItems] = React.useState([])
    const [currentItem, setCurrentItem] = React.useState(
        {
            "currentState": "pending",
            "summary": "",
            "description": "",
            "createdOn": Date.now(),
            "dueDate": Date.now(),
            "priority": ""
        }
    )
    const [editTask, setEditTask] = React.useState("")
    const [groupBy, setGroup] = React.useState("none");
    const [value, setValue] = React.useState(0);

    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    };
    const [openAddDialog, setOpenAddDialog] = React.useState(false);
    const [openEditDialog, setOpenEditDialog] = React.useState(false);

    let pendingTask = null, noneTask = null, lowTask = null, mediumTask = null, highTask = null; let dummyState = ""
    if (value === 1) dummyState = "pending"
    if (value === 2) dummyState = "completed"
    pendingTask = taskItems.filter(task => task.currentState === dummyState);
    let completedTask = null
    completedTask = taskItems.filter(task => task.currentState === dummyState);
    if (groupBy === "priority") {
        noneTask = taskItems.filter(task => task.priority === "None");
        lowTask = taskItems.filter(task => task.priority === "Low");
        mediumTask = taskItems.filter(task => task.priority === "Medium");
        highTask = taskItems.filter(task => task.priority === "High");
    }
    const addItems = (params) => {
        const newItem = params;
        const newItems = [...taskItems, newItem];
        setTaskItems(newItems)
        setCurrentItem({
            "currentState": "pending",
            "summary": "",
            "description": "",
            "createdOn": Date.now(),
            "dueDate": Date.now(),
            "priority": ""
        })
        setOpenAddDialog(false)
    };
    console.log("value", groupBy)
    const deleteItem = (key) => {
        const filteredItems = taskItems.filter(item => item.createdOn !== key);
        setTaskItems(filteredItems)
    }
    const editItem = (data) => {
        setEditTask(data)
        setOpenEditDialog(true)
    }
    const saveEditItems = (data) => {
        let newTaskItem = taskItems.map(u => u.createdOn !== data.createdOn ? u : data);
        setTaskItems(newTaskItem)
        setOpenEditDialog(false)
    };

    const handleClickOpen = () => {
        setOpenAddDialog(true);
    };

    const handleClose = () => {
        setOpenAddDialog(false);
    };

    const handleCloseEdit = () => {
        setOpenEditDialog(false);
    };
    return (
        <div className={classes.container}>
            <Typography className={classes.title}>ToDo App</Typography>
            <Grid container spacing={3} style={{ marginTop: "10px" }}>
                <Grid item md={3} xs={12}>
                    <Typography variant="subtitle1">Group By</Typography>
                    <FormControl size="small" variant="outlined" className={classes.formControl}>
                        <Select
                            labelId="demo-simple-select-outlined"
                            id="demo-simple-select-outlined"
                            value={groupBy}
                            onChange={(e) => setGroup(e.target.value)}
                        >
                            <MenuItem value={"none"}>None</MenuItem>
                            <MenuItem value={"createdOn"}>Created On</MenuItem>
                            <MenuItem value={"pending"}>Pending On</MenuItem>
                            <MenuItem value={"priority"}>Priority</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item md={9} xs={12}>
                    <Typography variant="subtitle1">Search</Typography>
                    <TextField className={classes.searchField} size="small" id="outlined-search" placeholder="Search Tasks" type="search" variant="outlined" />
                </Grid>
            </Grid>
            <div className={classes.tab}>
                <div className={classes.demo1}>
                    <AntTabs value={value} onChange={handleChangeTab} aria-label="ant example">
                        <AntTab label="All" />
                        <AntTab label="Pending" />
                        <AntTab label="Completed" />
                    </AntTabs>
                    <Typography className={classes.padding} />
                </div>
                <div className={classes.demo2}>
                    <table width="100%">
                        <Grid container>
                            <Grid className={classes.grids} item lg={3}>Summary</Grid>
                            <Grid className={classes.grids} item lg={2}>Priority</Grid>
                            <Grid className={classes.grids} item lg={2}>Created On</Grid>
                            <Grid className={classes.grids} item lg={2}>Due By</Grid>
                            <Grid className={classes.grids} item lg={3}>Actions</Grid>
                        </Grid>
                        {
                            groupBy === "priority" ?

                                <div>
                                    <Grid container style={{ textTransform: "uppercase", textAlign: "center", width: "100%", fontWeight: "bold" }}>Low</Grid>
                                    {
                                        lowTask.map((data, i) => {
                                            return (
                                                <Grid container>
                                                    <Grid className={classes.grids} item md={3}>{data.summary}</Grid>
                                                    <Grid className={classes.grids} item md={2}>{data.priority}</Grid>
                                                    <Grid className={classes.grids} item md={2}>{moment(data.createdOn).format('L')}</Grid>
                                                    <Grid className={classes.grids} item md={2}>{moment(data.dueDate).format('L')}</Grid>
                                                    <Grid className={classes.grids} style={{ display: "flex", justifyContent: "space-evenly" }} item md={3}>
                                                        <div onClick={() => editItem(data)}>
                                                            <EditButton />
                                                        </div>
                                                        <div>{data.currentState === "pending" ? <div onClick={() => data.currentState = "completed"}><SaveButton>Done</SaveButton></div> : <div onClick={() => data.currentState = "pending"}><OpenButton>Open</OpenButton></div>}</div>
                                                        <div onClick={() => deleteItem(data.createdOn)}>
                                                            <DeleteButton />
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            )
                                        })}
                                    <Grid container style={{ textTransform: "uppercase", textAlign: "center", fontWeight: "bold" }}>Medium</Grid>
                                    {
                                        mediumTask.map((data, i) => {
                                            return (
                                                <Grid container>
                                                    <Grid className={classes.grids} item md={3}>{data.summary}</Grid>
                                                    <Grid className={classes.grids} item md={2}>{data.priority}</Grid>
                                                    <Grid className={classes.grids} item md={2}>{moment(data.createdOn).format('L')}</Grid>
                                                    <Grid className={classes.grids} item md={2}>{moment(data.dueDate).format('L')}</Grid>
                                                    <Grid className={classes.grids} style={{ display: "flex", justifyContent: "space-evenly" }} item md={3}>
                                                        <div onClick={() => editItem(data)}>
                                                            <EditButton />
                                                        </div>
                                                        <div>{data.currentState === "pending" ? <div onClick={() => data.currentState = "completed"}><SaveButton>Done</SaveButton></div> : <div onClick={() => data.currentState = "pending"}><OpenButton>Open</OpenButton></div>}</div>
                                                        <div onClick={() => deleteItem(data.createdOn)}>
                                                            <DeleteButton />
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            )
                                        })}
                                    <Grid container style={{ textTransform: "uppercase", textAlign: "center", fontWeight: "bold" }}>None</Grid>
                                    {
                                        noneTask.map((data, i) => {
                                            return (
                                                <Grid container>
                                                    <Grid className={classes.grids} item md={3}>{data.summary}</Grid>
                                                    <Grid className={classes.grids} item md={2}>{data.priority}</Grid>
                                                    <Grid className={classes.grids} item md={2}>{moment(data.createdOn).format('L')}</Grid>
                                                    <Grid className={classes.grids} item md={2}>{moment(data.dueDate).format('L')}</Grid>
                                                    <Grid className={classes.grids} style={{ display: "flex", justifyContent: "space-evenly" }} item md={3}>
                                                        <div onClick={() => editItem(data)}>
                                                            <EditButton />
                                                        </div>
                                                        <div>{data.currentState === "pending" ? <div onClick={() => data.currentState = "completed"}><SaveButton>Done</SaveButton></div> : <div onClick={() => data.currentState = "pending"}><OpenButton>Open</OpenButton></div>}</div>
                                                        <div onClick={() => deleteItem(data.createdOn)}>
                                                            <DeleteButton />
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            )
                                        })}
                                    <Grid container style={{ textTransform: "uppercase", textAlign: "center", fontWeight: "bold" }}>High</Grid>
                                    {
                                        highTask.map((data, i) => {
                                            return (
                                                <Grid container>
                                                    <Grid className={classes.grids} item md={3}>{data.summary}</Grid>
                                                    <Grid className={classes.grids} item md={2}>{data.priority}</Grid>
                                                    <Grid className={classes.grids} item md={2}>{moment(data.createdOn).format('L')}</Grid>
                                                    <Grid className={classes.grids} item md={2}>{moment(data.dueDate).format('L')}</Grid>
                                                    <Grid className={classes.grids} style={{ display: "flex", justifyContent: "space-evenly" }} item md={3}>
                                                        <div onClick={() => editItem(data)}>
                                                            <EditButton />
                                                        </div>
                                                        <div>{data.currentState === "pending" ? <div onClick={() => data.currentState = "completed"}><SaveButton>Done</SaveButton></div> : <div onClick={() => data.currentState = "pending"}><OpenButton>Open</OpenButton></div>}</div>
                                                        <div onClick={() => deleteItem(data.createdOn)}>
                                                            <DeleteButton />
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            )
                                        })}
                                </div>
                                : <div>{value === 0 && taskItems.map((data, i) => {
                                    return (
                                        <Grid container>
                                            <Grid className={classes.grids} item md={3}>{data.summary}</Grid>
                                            <Grid className={classes.grids} item md={2}>{data.priority}</Grid>
                                            <Grid className={classes.grids} item md={2}>{moment(data.createdOn).format('L')}</Grid>
                                            <Grid className={classes.grids} item md={2}>{moment(data.dueDate).format('L')}</Grid>
                                            <Grid className={classes.grids} style={{ display: "flex", justifyContent: "space-evenly" }} item md={3}>
                                                <div onClick={() => editItem(data)}>
                                                    <EditButton />
                                                </div>
                                                <div>{data.currentState === "pending" ? <div onClick={() => data.currentState = "completed"}><SaveButton>Done</SaveButton></div> : <div onClick={() => data.currentState = "pending"}><OpenButton>Open</OpenButton></div>}</div>
                                                <div onClick={() => deleteItem(data.createdOn)}>
                                                    <DeleteButton />
                                                </div>
                                            </Grid>
                                        </Grid>
                                    )
                                })}
                                    {value === 1 && pendingTask.map((data, i) => {
                                        return (
                                            <Grid container>
                                                <Grid className={classes.grids} item md={3}>{data.summary}</Grid>
                                                <Grid className={classes.grids} item md={2}>{data.priority}</Grid>
                                                <Grid className={classes.grids} item md={2}>{moment(data.createdOn).format('L')}</Grid>
                                                <Grid className={classes.grids} item md={2}>{moment(data.dueDate).format('L')}</Grid>
                                                <Grid className={classes.grids} style={{ display: "flex", justifyContent: "space-evenly" }} item md={3}>
                                                    <div onClick={() => editItem(data)}>
                                                        <EditButton />
                                                    </div>
                                                    <div>{data.currentState === "pending" ? <div onClick={() => data.currentState = "completed"}><SaveButton>Done</SaveButton></div> : <div onClick={() => data.currentState = "pending"}><OpenButton>Open</OpenButton></div>}</div>
                                                    <div onClick={() => deleteItem(data.createdOn)}>
                                                        <DeleteButton />
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        )
                                    })}
                                    {value === 2 && completedTask.map((data, i) => {
                                        return (
                                            <Grid container>
                                                <Grid className={classes.grids} item md={3}>{data.summary}</Grid>
                                                <Grid className={classes.grids} item md={2}>{data.priority}</Grid>
                                                <Grid className={classes.grids} item md={2}>{moment(data.createdOn).format('L')}</Grid>
                                                <Grid className={classes.grids} item md={2}>{moment(data.dueDate).format('L')}</Grid>
                                                <Grid className={classes.grids} style={{ display: "flex", justifyContent: "space-evenly" }} item md={3}>
                                                    <div onClick={() => editItem(data)}>
                                                        <EditButton />
                                                    </div>
                                                    <div>{data.currentState === "pending" ? <div onClick={() => data.currentState = "completed"}><SaveButton>Done</SaveButton></div> : <div onClick={() => data.currentState = "pending"}><OpenButton>Open</OpenButton></div>}</div>
                                                    <div onClick={() => deleteItem(data.createdOn)}>
                                                        <DeleteButton />
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        )
                                    })}
                                </div>
                        }



                    </table>
                    <Dialog aria-labelledby="customized-dialog-title" open={openEditDialog}>
                        <DialogTitle id="customized-dialog-title" onClose={handleCloseEdit}>
                            Edit a Task
                   </DialogTitle>
                        <DialogContent dividers>
                            <Typography gutterBottom>Summary</Typography>
                            <TextField className={classes.textField} size="small" id="outlined" placeholder="Summary" variant="outlined" value={editTask.summary} onChange={(event) => setEditTask({ ...editTask, summary: event.target.value })} />
                            <Typography style={{ marginTop: "5px" }} gutterBottom>Description</Typography>
                            <TextField id="outlined-basic" className={classes.textField} placeholder="Description" required variant="outlined" multiline rows={4} value={editTask.description} onChange={(event) => setEditTask({ ...editTask, description: event.target.value })} />
                            <Grid container spacing={3} style={{ marginTop: "10px" }}>
                                <Grid item md={6}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <Grid container justify="space-around">
                                            <KeyboardDatePicker
                                                disableToolbar
                                                variant="inline"
                                                format="MM/dd/yyyy"
                                                margin="normal"
                                                id="date-picker-inline"
                                                label="Date picker inline"
                                                value={editTask.dueDate}
                                                onChange={(date) => setEditTask({ ...editTask, dueDate: date })}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                        </Grid>
                                    </MuiPickersUtilsProvider>
                                </Grid>
                                <Grid item md={6}>
                                    <Typography variant="subtitle1">Priority</Typography>
                                    <FormControl size="small" variant="outlined" style={{ width: "100%" }}>
                                        <Select
                                            labelId="demo-simple-select-outlined"
                                            id="demo-simple-select-outlined"
                                            value={editTask.priority}
                                            onChange={(e) => setEditTask({ ...editTask, priority: e.target.value })}
                                        >
                                            <MenuItem value={"None"}>None</MenuItem>
                                            <MenuItem value={"Low"}>Low</MenuItem>
                                            <MenuItem value={"Medium"}>Medium</MenuItem>
                                            <MenuItem value={"High"}>High</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <CancelButton onClick={handleCloseEdit} variant="contained" color="primary" className={classes.margin}>
                                cancel
                    </CancelButton>
                            <SaveButton onClick={() => saveEditItems(editTask)} variant="contained" color="secondary" className={classes.margin}>
                                Save
                     </SaveButton>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
            <Dialog aria-labelledby="customized-dialog-title" open={openAddDialog}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Add a Task
                   </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>Summary</Typography>
                    <TextField className={classes.textField} size="small" id="outlined" placeholder="Summary" required variant="outlined" value={currentItem.summary} onChange={(event) => setCurrentItem({ ...currentItem, summary: event.target.value })} />
                    <Typography style={{ marginTop: "5px" }} gutterBottom>Description</Typography>
                    <TextField id="outlined-basic" className={classes.textField} placeholder="Description" required variant="outlined" multiline rows={4} value={currentItem.description} onChange={(event) => setCurrentItem({ ...currentItem, description: event.target.value })} />
                    <Grid container spacing={3} style={{ marginTop: "10px" }}>
                        <Grid item md={6}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justify="space-around">
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="MM/dd/yyyy"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="Date picker inline"
                                        value={currentItem.dueDate}
                                        onChange={(date) => setCurrentItem({ ...currentItem, dueDate: date })}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item md={6}>
                            <Typography variant="subtitle1">Priority</Typography>
                            <FormControl size="small" variant="outlined" style={{ width: "100%" }}>
                                <Select
                                    labelId="demo-simple-select-outlined"
                                    id="demo-simple-select-outlined"
                                    value={currentItem.priority}
                                    onChange={(e) => setCurrentItem({ ...currentItem, priority: e.target.value })}
                                >
                                    <MenuItem value={"None"}>None</MenuItem>
                                    <MenuItem value={"Low"}>Low</MenuItem>
                                    <MenuItem value={"Medium"}>Medium</MenuItem>
                                    <MenuItem value={"High"}>High</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <CancelButton onClick={handleClose} variant="contained" color="primary" className={classes.margin}>
                        cancel
                    </CancelButton>
                    <SaveButton onClick={() => addItems(currentItem)} variant="contained" color="secondary" className={classes.margin}>
                        Save
                     </SaveButton>
                </DialogActions>
            </Dialog>
            <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="stretch"
            >
                <div className={classes.addicon} onClick={handleClickOpen}>
                    <AddIcon />
                </div>
            </Grid>
        </div >
    );
}

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(2),
            width: "94%",
            [theme.breakpoints.down('sm')]: {
                width: "92%",
            },
        },
    },
    container: {
        margin: "20px 50px",
        maxWidth: "100%"
    },
    title: {
        fontSize: "26px",
    },
    formControl: {
        width: "100%",
    },
    searchField: {
        width: "100%"
    },
    addicon: {
        position: "fixed",
        bottom: "30px",
    },
    textField: {
        width: "550px"
    },
    tab: {
        flexGrow: 1,
    },
    padding: {
        padding: theme.spacing(3),
    },
    demo1: {
        backgroundColor: theme.palette.background.paper,
    },
    button: {
        margin: theme.spacing(1),
    },
    grids: {
        border: "1px solid #dddddd",
        padding: "8px",
        display: "flex",
        minWidth: "200px",
        scrollX: "auto",
        //  justifyContent: "center",
        alignItems: "center"
    }
}));
