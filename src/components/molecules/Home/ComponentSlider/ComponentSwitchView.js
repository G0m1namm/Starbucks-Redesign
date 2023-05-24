import React from "react";
import { Breakpoint } from "react-socks";
import { ComponentDescription } from "../../../organisms/Home/ComponenSlider/ComponentInfo";

export const DescriptionSwitchView = ({ desktopText, mobileText, buttonText }) => {
    return (
        <>
            <Breakpoint medium down>
                <ComponentDescription>{mobileText}</ComponentDescription>
            </Breakpoint>
            <Breakpoint medium up>
                <ComponentDescription>{desktopText}</ComponentDescription>
                <button className="btn btn-primary">{buttonText}</button>
            </Breakpoint>
        </>
    );
}

export const ImageSwitchView = ({ image, imgAlt, buttonText }) => {
    return (
        <Breakpoint medium up>
            <img src={image} alt={`${imgAlt}`} />
        </Breakpoint>
    );
}