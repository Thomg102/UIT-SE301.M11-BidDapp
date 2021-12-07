import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { Alert } from '@material-ui/lab'
import { Snackbar, makeStyles } from '@material-ui/core'
import clsx from  'clsx';

const useStyles = makeStyles({
    alert: {
        fontSize: '15px',
        fontWeight: 700,
        color: '#fff',
        background: props => props.backgroundColor
    },
});

const AlertComp = ({ type, content, resetAlert, ...props }) => {
    const classes = useStyles(props);
    const [state, setState] = useState({
        open: true,
        vertical: 'top',
        horizontal: 'right',
    });

    const {vertical, horizontal, open} = state;

    const handleClose = () => {
        setState({...state, open: false});
        resetAlert();
    };

    return (
        <Snackbar anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={5000} onClose={handleClose}>
            <Alert  
                className={ classes.alert }
                key={vertical + horizontal} 
                onClose={handleClose} 
                severity={ type } 
                sx={{ width: '1000px' }}
            >
                { content }
            </Alert>
        </Snackbar>
    )
}

export default AlertComp