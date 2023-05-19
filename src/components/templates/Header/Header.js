import React, { useContext, useEffect, useState } from "react";
import LogoIcon from "../../../assets/icons/starbucks_logo.svg";
import { IconButton } from "../../atoms/IconButton";
import { MapPin, ChevronDown } from "react-feather";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../helpers/AuthProvider";
import { Menu, Avatar, Dropdown, List } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import './Header.scss';

export function AuthButtons() {
    const navigate = useNavigate();
    const variant = {
        initial: {
            scale: 0.5,
            opacity: 0
        },
        visible: {
            scale: 1,
            opacity: 1
        },
        exit: {
            scale: 0.5,
            opacity: 0
        }
    }
    return (
        <motion.div className="auth-actions-wrapper" variants={variant} initial="initial" animate="visible" exit="exit">
            <button className="btn btn-secondary" onClick={() => navigate("/login")}>Sign In</button>
            <button className="btn btn-primary" onClick={() => navigate("/register")}>Sign Up</button>
        </motion.div>
    );
}

export function DropdownMenu() {
    const { handleSignout } = useContext(AuthContext);

    return (
        <Menu>
            <Menu.Item key="menu:dashboard">
                Dashboard
            </Menu.Item>
            <Menu.Item key="menu:logout" onClick={async () => await handleSignout()}>
                Logout
            </Menu.Item>
        </Menu>
    );
}

export function UserLoggedMenu({ nickName }) {
    const variant = {
        initial: {
            scale: 0.5,
            opacity: 0
        },
        visible: {
            scale: 1,
            opacity: 1
        },
        exit: {
            scale: 0.5,
            opacity: 0
        }
    }

    return (
        <motion.div variants={variant} initial="initial" animate="visible" exit="exit">
            <Dropdown
                overlay={<DropdownMenu />}
                trigger={['click']}
            >
                <List>
                    <List.Item actions={[<ChevronDown />]} style={{ padding: 0 }}>
                        <List.Item.Meta
                            avatar={
                                <Avatar size="large">
                                    {nickName[0].toUpperCase()}
                                </Avatar>
                            }
                            title={nickName}
                            description={`level ${nickName.length}`}
                        />
                    </List.Item>
                </List>
            </Dropdown>
        </motion.div>
    );
}

export default function Header() {
    const { user } = useContext(AuthContext);
    const [nickName, setNickName] = useState('');

    useEffect(() => {
        if (user) { setNickName(user.attributes.email) }
        else { setNickName('') }
    }, [user])

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
            <AnimatePresence exitBeforeEnter>
                {nickName ? (<UserLoggedMenu nickName={nickName} />) : (<AuthButtons />)}
            </AnimatePresence>
        </header>
    );
}
