import React, { useContext } from "react";
import LogoIcon from "../../../assets/icons/starbucks_logo.svg";
import { IconButton } from "../../atoms/IconButton";
import { MapPin } from "react-feather";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../helpers/AuthProvider";
import { Avatar, Col, Row, Typography } from "antd";
import { AnimatePresence, motion, useAnimation, useScroll } from "framer-motion";
import { Breakpoint } from "react-socks";
import { CgMenuGridO } from "react-icons/cg";
import { useMenuContext } from "../../../helpers/MenuProvider";
import './Header.scss';

export function AuthButtons() {
    const { setOpen } = useMenuContext();
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
            <Row gutter={12}>
                <Col>
                    <Breakpoint medium up>
                        <button className="btn btn-secondary" onClick={() => navigate("/login")}>Sign In</button>
                    </Breakpoint>
                </Col>
                <Col>
                    <Breakpoint medium up>
                        <button className="btn btn-primary" onClick={() => navigate("/register")}>Sign Up</button>
                    </Breakpoint>
                </Col>
                <Breakpoint medium down>
                    <Col>
                        <Row align="middle" onClick={() => setOpen(prev => !prev)}>
                            <CgMenuGridO size={40} color="gray" />
                        </Row>
                    </Col>
                </Breakpoint>
            </Row>
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
                        <Breakpoint large up>
                            <Col>
                                <Typography.Text ellipsis style={{ maxWidth: 130 }}>{nickName}</Typography.Text>
                            </Col>
                        </Breakpoint>
                        <Breakpoint large down>
                            <Col>
                                <Row align="middle" onClick={() => setOpen(prev => !prev)}>
                                    <CgMenuGridO size={40} color="gray" />
                                </Row>
                            </Col>
                        </Breakpoint>
                    </Row>
                </Col>
                <Breakpoint large up>
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
    const { scrollY } = useScroll();

    const controls = useAnimation();
    const delta = React.useRef(0);
    const lastScrollY = React.useRef(0);

    scrollY.onChange((val) => {
        const diff = Math.abs(val - lastScrollY.current);
        if (val >= lastScrollY.current) {
            delta.current = delta.current >= 10 ? 10 : delta.current + diff;
        } else {
            delta.current = delta.current <= -10 ? -10 : delta.current - diff;
        }

        if (delta.current >= 10 && val > 82) {
            controls.start("hidden");
        } else if (delta.current <= -10 || val < 82) {
            controls.start("visible");
        }
        lastScrollY.current = val;
    });

    return (
        <motion.header
            initial={false}
            animate={controls}
            variants={{
                visible: { top: 0 },
                hidden: { top: -84 }
            }}
        >
            <div className="logo-wrapper">
                <img className="logo-image" src={LogoIcon} alt="logo de starbucks" />
                <Breakpoint large up>
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
        </motion.header>
    );
}
