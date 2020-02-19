import React, { useMemo, useContext } from "react";

import { IntersectionContext } from "../../../atoms/IntersectionObserver";
import { motion } from "framer-motion";

export const Card = ({
    children,
    delayOrder, // order of appearance
    duration = 0.4,
    easing = [0.42, 0, 0.58, 1], // [number, number, number, number] | "linear" | "easeIn" | "easeOut" | "easeInOut" | "circIn" | "circOut" | "circInOut" | "backIn" | "backOut" | "backInOut" | "anticipate" | EasingFunction;
    index,
}) => {
    const { inView } = useContext(IntersectionContext);
    const transition = useMemo(
        () => ({
            duration,
            delay: delayOrder / 7,
            ease: easing
        }),
        [duration, delayOrder, easing]
    );

    const variants = {
        hidden: {
            scale: 0,
            opacity: 0,
            transition
        },
        show: {
            scale: 1,
            opacity: 1,
            transition
        }
    };

    return (
        <motion.div
            className={`card-section card-root-${index}`}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            exit="hidden"
            variants={variants}
            positionTransition 
        >
            {children}
        </motion.div>
    );
};
