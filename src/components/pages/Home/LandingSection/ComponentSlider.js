import React, { useState, useContext } from "react";
import ComponentSlideOne from "./ComponentSlideOne";
import "./ComponentSlide.scss";
import ComponentSlideTwo from "./ComponentSlideTwo";
import ComponentSlideThree from "./ComponentThree";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "@popmotion/popcorn";
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import { LinearProgress } from "@material-ui/core";

const CountStateContext = React.createContext();
const CountDispatchContext = React.createContext();

const components = [
    <ComponentSlideOne />,
    <ComponentSlideTwo />,
    <ComponentSlideThree />
];

const variants = {
    enter: (direction) => {
        return {
            // x: direction > 0 ? 1000 : -1000,
            opacity: 0
        };
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction) => {
        return {
            zIndex: 0,
            // x: direction < 0 ? 1000 : -1000,
            opacity: 0
        };
    }
};

export function LinearDeterminate({ handleNext, ...props }) {
    const [counter, setCounter] = React.useState(0);
    const dispatch = useContext(CountDispatchContext);
    const reset = () => {
        dispatch(1);
        setCounter(0);
    }
    // Third Attempts
    React.useEffect(() => {
        const timer =
            counter < 100 ? setInterval(() => setCounter(counter + 1), 100) : reset();

        return () => clearInterval(timer);
    }, [counter]);


    return (
        <LinearProgress
            variant="determinate"
            defaultValue={0}
            value={counter}
            {...props}
        />
    );
}

export const SliderControls = () => {
    const page = useContext(CountStateContext);
    const dispatch = useContext(CountDispatchContext);

    return (
        <div id="componentSliderControls">
            <div className="slider-control-actions">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="btn btn-primary" onClick={() => dispatch(1)}><ArrowBackIosRoundedIcon /></motion.button>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="btn btn-primary" onClick={() => dispatch(-1)}><ArrowForwardIosRoundedIcon /></motion.button>
            </div>
            <div className="slider-control-info">
                <LinearDeterminate className="slider-progress-bar" handleNext={() => dispatch(1)} />
                <div className="slider-control-item-indicator">
                    <span>Next slide</span>
                    <span>0{page + 1}</span>
                </div>
                <h3 className="slider-control-next-title">Our best coffee beans</h3>
                <p className="slider-control-next-description">See how we roast them</p>
            </div>
        </div>
    );
}

export const ActualSlideProgressBar = () => {
    const page = useContext(CountStateContext);

    return (
        <div id="actualSlideTimer">
            <span className="actual-slider-number">0{page}</span>
            <LinearDeterminate className="actual-slider-progress-bar" />
        </div>
    );
}

export default function ComponentSlider() {
    const [[page, direction], setPage] = useState([0, 0]);
    const imageIndex = wrap(0, components.length, page);

    const paginate = (newDirection) => {
        setPage([page + newDirection, newDirection]);
    };




    return (
        <section id="componentSlider">
            <motion.div
                key={page}
                custom={direction}
                variants={variants}
                initial={"enter"}
                animate={"center"}
                exit={"exit"}
                transition={{
                    x: { type: "spring", stiffness: 300, damping: 200 },
                    opacity: { duration: 0.2 },
                    when: "beforeChildren"
                }}
                className="component-wrapper-animated"
            >
                <AnimatePresence initial={false} custom={direction} exitBeforeEnter>
                    {components[imageIndex]}
                </AnimatePresence>
            </motion.div>
            <CountStateContext.Provider value={imageIndex + 1}>
                <CountDispatchContext.Provider value={paginate}>
                    <ActualSlideProgressBar />
                    <SliderControls />
                </CountDispatchContext.Provider>
            </CountStateContext.Provider >
        </section>
    );
}