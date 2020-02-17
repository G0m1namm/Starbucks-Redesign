import React from "react";
import { makeStyles } from "@material-ui/core";
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';
import { Icon } from "../../atoms/Icon";

const useStyle = makeStyles({
    root: {
        display: "flex",
        flexFlow: "row nowrap",
        height: "fit-content",
        maxWidth: 200,
        width: "100%",
        placeContent: "center space-between",
        '& li':{
            listStyle: "none",
        }
    }
})

export const SocialIconsWrapper = () => {
    const classes = useStyle();
    const icons = [
        FacebookIcon,
        TwitterIcon,
        InstagramIcon,
        YouTubeIcon
    ]
    return (
        <ul className={classes.root}>
            {icons.map((SocialIcon, index) => (
                <li key={`${Date.now()}${index}`}>
                    <Icon>
                        <SocialIcon/>
                    </Icon>
                </li>
            ))}
        </ul>
    )
} 