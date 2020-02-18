import React, { useState } from "react";
import ComponentSlideOne from "./ComponentSlideOne";
import "./ComponentSlide.scss";
import ComponentSlideTwo from "./ComponentSlideTwo";
import ComponentSlideThree from "./ComponentThree";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "@popmotion/popcorn";
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';

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

export const SliderControls = ({handleNext, handlePrev}) => {
    return (
        <div id="componentSliderControls">
            <div className="slider-control-actions">
                <button className="btn btn-primary" onClick={handlePrev}><ArrowBackIosRoundedIcon/></button>
                <button className="btn btn-primary" onClick={handleNext}><ArrowForwardIosRoundedIcon/></button>
            </div>
            <div className="slider-control-info">

            </div>
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
        <>
            <section id="componentSlider">
                <AnimatePresence initial={false} custom={direction} exitBeforeEnter>
                    <motion.div
                        key={page}
                        custom={direction}
                        variants={variants}
                        initial={"enter"}
                        animate={"center"}
                        exit={"exit"}
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 200 },
                            opacity: { duration: 0.2 }
                        }}
                        className="component-wrapper-animated"
                    >
                        {components[imageIndex]}
                    </motion.div>
                </AnimatePresence>
                {/* <div className="next" onClick={() => paginate(1)}>
                {"Next ‣"}
            </div>
            <div className="prev" onClick={() => paginate(-1)}>
                {"Prev ‣"}
            </div> */}
                <SliderControls handleNext={() => paginate(1)} handlePrev={() => paginate(-1)}/>
            </section>
        </>
    );
}