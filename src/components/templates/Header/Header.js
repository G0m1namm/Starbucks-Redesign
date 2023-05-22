import React, { useContext } from "react";
import LogoIcon from "../../../assets/icons/starbucks_logo.svg";
import { IconButton } from "../../atoms/IconButton";
import { MapPin } from "react-feather";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../helpers/AuthProvider";
import { Avatar, Col, Row, Typography } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import { Breakpoint } from "react-socks";
import { CgMenuGridO } from "react-icons/cg";
import './Header.scss';
import { useMenuContext } from "../../../helpers/MenuProvider";

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

export function UserLoggedMenu({ nickName, handleSignout }) {
    const { setOpen } = useMenuContext();

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

    const handleLogOut = async () => await handleSignout();

    return (
        <motion.div variants={variant} initial="initial" animate="visible" exit="exit">
            <Row gutter={20}>
                <Col>
                    <Row align="middle" gutter={12}>
                        <Col>
                            <Avatar size="large">
                                {nickName[0].toUpperCase()}
                            </Avatar>
                        </Col>
                        <Breakpoint medium up>
                            <Col>
                                <Typography.Text ellipsis style={{ maxWidth: 130 }}>{nickName}</Typography.Text>
                            </Col>
                        </Breakpoint>
                        <Breakpoint medium down>
                            <Col>
                                <Row align="middle" onClick={() => setOpen(prev => !prev)}>
                                    <CgMenuGridO size={40} color="gray" />
                                </Row>
                            </Col>
                        </Breakpoint>
                    </Row>
                </Col>
                <Breakpoint medium up>
                    <Col>
                        <button className="btn btn-primary" onClick={handleLogOut}>Sign Up</button>
                    </Col>
                </Breakpoint>
            </Row>
        </motion.div>
    );
}

export default function Header() {
    const { user, handleSignout } = useContext(AuthContext);

    return (
        <header>
            <div className="logo-wrapper">
                <img className="logo-image" src={LogoIcon} alt="logo de starbucks" />
                <Breakpoint medium up>
                    <IconButton
                        icon={<MapPin />}
                        className="btn btn-secondary-outlined icon-btn open-map-button"
                    >
                        Prague, CZ
                    </IconButton>
                </Breakpoint>
            </div>
            <AnimatePresence exitBeforeEnter>
                {user?.attributes.email ? (<UserLoggedMenu nickName={user.attributes.email} handleSignout={handleSignout} />) : (<AuthButtons />)}
            </AnimatePresence>
        </header>
    );
}
