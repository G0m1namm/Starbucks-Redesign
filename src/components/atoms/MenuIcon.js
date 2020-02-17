import React from "react";
import { MoreHorizontal } from "react-feather";
import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles({
    container: {
        position: 'relative',
        height: 'auto',
        width: '100%',
        maxWidth: 40,
        maxHeight: 40,
        cursor: 'pointer',
    },
    icon: {
        width: '100%',
        height: 'auto',
        zIndex: 3,
        color: '#838383',
        '& circle': {
            r: 0.4,
        },
        '&:nth-child(1)': {
            transform: 'translateY(-24%)',
        },
        '&:nth-child(2)': {
            transform: 'translateY(-105%)'
        },
        '&:nth-child(3)': {
            transform: 'translateY(-186%)'
        },
    }
})
export const MenuICon = () => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <MoreHorizontal className={classes.icon} />
            <MoreHorizontal className={classes.icon} />
            <MoreHorizontal className={classes.icon} />
        </div>
    );
}