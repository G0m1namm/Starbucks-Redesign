import React from "react";
import Logotipo from "../../../assets/images/logotipo-starbucks.png";
import "./Footer.scss";
import { NavigationLinks } from "../../../data/navigation";
import NavWrapper, { NavLink } from "../../atoms/NavLink";
import { SocialIconsWrapper } from "../../molecules/Menu/SocialIconsWrapper";
import { IconButton } from "../../atoms/IconButton";
import { MapPin } from "react-feather";

export default function Footer() {
    const date = new Date();
    const links = [...NavigationLinks];

    return (
        <footer>
            <div className="brand-container">
                <a href="/">
                    <img src={Logotipo} alt="logotipo" />
                </a>
                <span>Starbucks {date.getFullYear()}</span>
            </div>
            <div className="footer-navigation-content">
                <div className="footer-actions">
                    <div>
                        <IconButton icon={MapPin} className="btn btn-primary-white">
                            Prague, Cz
                        </IconButton>
                        <span>Change location</span>
                    </div>
                    <SocialIconsWrapper />
                    <button className="btn btn-primary-white">Starbucks Store™</button>
                </div>
                <div className="footer-main-content">
                    <div className="footer-nav-links">
                        {links.map((navs, index) => (
                            <NavWrapper key={`${Date.now()}${index}`} title={navs.title} order={index}>
                                {navs.links.map((link, index) => <NavLink key={`${Date.now()}${index}`}>{link}</NavLink>)}
                            </NavWrapper>
                        ))}
                    </div>
                </div>
            </div>
            <div className="policy-conditions">
                <span>Terms & conditions</span>
                <span>Privacy policy</span>
            </div>
        </footer>
    );
}