import React from "react";
import { motion } from "framer-motion";
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles({
    root: {
        cursor: 'pointer',
        maxWidth: 40,
        maxHeight: 40,
        padding: 5,
        '& svg': {
            width: "100%",
            height: "100%",
            color: "#9cc5b5",
        },
        '&:hover svg':{
            color: "#388A6B",
        }
    }
})
export const Icon = ({ children, ...props }) => {
    const classes = useStyle();

    return (
        <motion.div className={classes.root} whileHover={{ scale: 1.05 }} whileTap={{ scale: 1 }} {...props}>
            {children}
        </motion.div>
    )
} 