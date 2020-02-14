import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles({
    navLink: {
        listStyle: 'none',
        padding: '5px 0',
        cursor: 'pointer'
    },
    link: {
        color: "#b3b3b3",
        fontSize: 14,
        textDecoration: "none",
        '&:hover, &:focus, &.active': {
            color: "#388A6B",
            fontWeight: 600
        }
    },
    navWrapper:{
        display: "grid",
        padding: '16px 10px',
    },
    navTitle:{
        color: "#000",
        fontSize: 16,
        marginBottom: 5,
        fontFamily: "StolzlBold, sans-serif",
    },
    navLinksContainer:{
        display: "grid",
    }
})
export function NavLink({ className = "", children, href = "#", ...props }) {
    const classes = useStyle();

    return (
        <li className={`${classes.navLink} ${className}`} {...props}>
            <a href={href} className={classes.link}>{children}</a>
        </li>
    );
}

export default function NavWrapper({ title, children, ...props }) {
    const classes = useStyle();

    return(
        <nav className={classes.navWrapper}>
            <h2 className={classes.navTitle}>{title}</h2>
            <ul className={classes.navLinksContainer}>
                {children && children}
            </ul>
        </nav>
    );
}