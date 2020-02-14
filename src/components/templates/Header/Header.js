import React from "react";
import LogoIcon from "../../../assets/icons/starbucks_logo.svg";
import { IconButton } from "../../atoms/IconButton";
import { MapPin } from "react-feather";
import './Header.scss';

export function Header() {
    return (
        <header>
            <div className="logo-wrapper">
                <img className="logo-image" src={LogoIcon} alt="logo de starbucks" />
                <IconButton
                    icon={<MapPin />}
                    className="btn btn-secondary-outlined icon-btn open-map-button"
                >
                    Prague, CZ
                </IconButton>
            </div>
            <AuthButtons />
        </header>
    );
}

export const AuthButtons = () => {
    return (
        <div>
            <button className="btn btn-secondary">Sign In</button>
            <button className="btn btn-primary">Sign Up</button>
        </div>
    );
}