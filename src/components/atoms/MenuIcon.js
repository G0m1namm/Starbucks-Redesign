import React from "react";
import { MoreHorizontal } from "react-feather";
import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles({
    container:{
        position: 'relative',
        height: 'auto',
        width: '100%'
    },
    icon:{
        width: '100%',
        height: 'auto',
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