import React, { useContext, useEffect, useState, useMemo } from "react";
import LogoIcon from "../../../assets/icons/starbucks_logo.svg";
import { IconButton } from "../../atoms/IconButton";
import { MapPin } from "react-feather";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../helpers/AuthProvider";
import { Avatar, Col, Row, Typography } from "antd";
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

export function UserLoggedMenu({ nickName, handleSignout }) {

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
                        <Col>
                            <Typography.Text ellipsis style={{ maxWidth: 130 }}>{nickName}</Typography.Text>
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <button className="btn btn-primary" onClick={handleLogOut}>Sign Up</button>
                </Col>
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
                <IconButton
                    icon={<MapPin />}
                    className="btn btn-secondary-outlined icon-btn open-map-button"
                >
                    Prague, CZ
                </IconButton>
            </div>
            <AnimatePresence exitBeforeEnter>
                {user?.attributes.email ? (<UserLoggedMenu nickName={user.attributes.email} handleSignout={handleSignout} />) : (<AuthButtons />)}
            </AnimatePresence>
        </header>
    );
}
