import React from "react";
import "./LoaderScreen.scss";
import { motion, AnimatePresence, useCycle } from "framer-motion";

export default function LoaderScreen() {
    const [open, setOpen] = useCycle(false, true);

    const loaderAnimation = {
        animate: {
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.01
            }
        },
        exit: {
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.01,
                staggerDirection: -1,
            }
        }
    }

    const staggerAnimation = {
        animate: {
            transition: {
                // when: "beforeChildren",
                staggerChildren: 0.1
            }
        },
        exit: {
            transition: {
                when: "beforeChildren",
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
                duration: 0.4
            }
        },
        exit: {
            originX: 0.5,
            originY: 1,
            scaleY: 0,
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
                type: "tween",
                ease: "easeIn",
                duration: 0.7,
            }
        },
        exit: {
            y: -20,
            opacity: 0,
        }
    }

    return (
        <AnimatePresence exitBeforeEnter>
            {open &&
                <motion.div variants={loaderAnimation} initial={false} animate="animate" exit="exit" id="starbucksLoader">
                    <motion.div variants={staggerAnimation} initial={false} animate="animate" exit="exit" className="layers-container">
                        <motion.div variants={whiteLayerAnimation} initial="initial" animate="animate" exit="exit" className="white-bg-layer" />
                        <motion.div variants={greenLayerAnimation} initial="initial" animate="animate" exit="exit" className="green-bg-layer" />
                        <motion.div variants={logotypeLayerAnimation} initial="initial" animate="animate" exit="exit" className="logotype-layer">
                            <motion.span className="logotype">starbucks®</motion.span>
                        </motion.div>
                    </motion.div>
                </motion.div>
            }
        </AnimatePresence>
    );
}