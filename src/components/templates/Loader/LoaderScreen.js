import React from "react";
import "./LoaderScreen.scss";
import { motion, AnimatePresence } from "framer-motion";

export default function LoaderScreen() {

    const loaderAnimation = {
        initial: {},
        animate: {
            transition: {
                staggerChildren: 0.5
            }
        },
        exit: {
            transition: {
                when: "beforeChildren",
            }
        }
    }

    const staggerAnimation = {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: {
                staggerChildren: 1
            }
        },
        exit: {
            opacity: 0,
            transition: {
                when: "afterChildren",
                staggerChildren: 0.1,
                staggerDirection: -1,
            }
        }
    }

    const whiteLayerAnimation = {
        initial: {
            opacity: 0,
        },
        animate: {
            opacity: 1,
        },
        exit: {
            opacity: 0
        }
    }

    const greenLayerAnimation = {
        initial: {
            originX: 0.5,
            originY: 0,
            scaleY: 0,
        },
        animate: {
            scaleY: 1,
            transition: {
                delay: 0.4,
                type: "spring",
                stiffness: 800,
                damping: 100,
                duration: 0.2
            }
        },
        exit: {
            originY: 0,
            originX: 0.5,
            scaleY: 0,
            transition: {
                type: "spring",
                stiffness: 800,
                damping: 100,
                delay: 0.5
            }
        }
    }

    const logotypeLayerAnimation = {
        initial: {
            y: 40,
            opacity: 0,
        },
        animate: {
            y: 0,
            opacity: 1,
            transition: {
                delay: 0.8,
            }
        },
        exit: {
            y: 40,
            opacity: 0,
        }
    }

    return (
        <AnimatePresence exitBeforeEnter>
            <motion.div key="loader-wrapper" variants={loaderAnimation} initial="initial" animate="animate" exit="exit" id="starbucksLoader">
                <motion.div key="stagger-wrapper" variants={staggerAnimation} className="layers-container">
                    <motion.div key="white-layer" variants={whiteLayerAnimation} className="white-bg-layer" />
                    <motion.div key="green-layer" variants={greenLayerAnimation} className="green-bg-layer" />
                    <motion.div key="logo-layer" variants={logotypeLayerAnimation} className="logotype-layer">
                        <motion.span className="logotype">starbucks®</motion.span>
                    </motion.div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}