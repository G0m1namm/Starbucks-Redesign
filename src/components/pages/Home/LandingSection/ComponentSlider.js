import React, { useState, useContext, useEffect } from "react";
import ComponentSlideOne from "./ComponentSlideOne";
import "./ComponentSlide.scss";
import ComponentSlideTwo from "./ComponentSlideTwo";
import ComponentSlideThree from "./ComponentSlideThree";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "@popmotion/popcorn";
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import { LinearProgress } from "@material-ui/core";
import StarbucksLogo from "../../../../assets/icons/starbucks_logo.svg";
import { Breakpoint } from "react-socks";

const CountStateContext = React.createContext();
const CountDispatchContext = React.createContext();

const components = [
    <ComponentSlideOne key="animate-slide-1" />,
    <ComponentSlideTwo key="animate-slide-2" />,
    <ComponentSlideThree key="animate-slide-3" />
];

const componentsContent = [
    {
        title: "Meet our new Summer coffee drinks",
        description: "Enjoy the bright days "
    },
    {
        title: "50% discount for Almond Cappuccino",
        description: "Taste new flavors"
    },
    {
        title: "Our best coffee beans",
        description: "See how we roast them"
    },
]

const variants = {
    enter: (direction) => {
        return {
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            transition: {
                duration: 1,
                delay: 2,
                ease: "easeOut"
            }
        };
    },
    center: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    },
    exit: (direction) => {
        return {
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            transition: {
                duration: 0.4,
                delay: 0.4,
                ease: "easeIn"
            }
        };
    }
};

export const SliderControls = ({ counter }) => {
    const page = useContext(CountStateContext);
    const dispatch = useContext(CountDispatchContext);
    const imageIndex = wrap(0, components.length, page);

    return (
        <div id="componentSliderControls">
            <div className="slider-control-actions">
                <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="btn btn-primary" onClick={() => dispatch(1)}><ArrowBackIosRoundedIcon /></motion.button>
                <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="btn btn-primary" onClick={() => dispatch(-1)}><ArrowForwardIosRoundedIcon /></motion.button>
            </div>
            <div className="slider-control-info">
                <LinearProgress
                    className="slider-progress-bar"
                    variant="determinate"
                    defaultValue={0}
                    value={counter}
                />
                <div className="slider-control-item-indicator">
                    <span>Next slide</span>
                    <span>0{page === 3 ? 1 : page + 1}</span>
                </div>
                <h3 className="slider-control-next-title">{imageIndex === 2 ? componentsContent[0].title : componentsContent[imageIndex + 1].title}</h3>
                <p className="slider-control-next-description">{imageIndex === 2 ? componentsContent[0].description : componentsContent[imageIndex + 1].description}</p>
            </div>
        </div>
    );
}

export const ActualSlideProgressBar = ({ counter }) => {
    const page = useContext(CountStateContext);

    return (
        <div id="actualSlideTimer">
            <span className="actual-slider-number">0{page}</span>
            <LinearProgress
                className="actual-slider-progress-bar"
                variant="determinate"
                defaultValue={0}
                value={counter}
            />
        </div>
    );
}

export default function ComponentSlider() {
    const [[page, direction], setPage] = useState([0, 0]);
    const [counter, setCounter] = useState(0);
    const imageIndex = wrap(0, components.length, page);

    const paginate = (newDirection) => {
        setPage([page + newDirection, newDirection]);
        setCounter(0);
    };

    useEffect(() => {
        const timer =
            counter < 100 ? setInterval(() => setCounter(counter + 1), 100) : paginate(1);;

        return () => clearInterval(timer);
    }, [counter]);

    return (
        <section id="componentSlider">
            <img className="component-slider-waterprint" src={StarbucksLogo} alt="Starbuck logo grande" />
            <motion.div
                key={page}
                custom={direction}
                variants={variants}
                initial={"enter"}
                animate={"center"}
                exit={"exit"}
                className="component-wrapper-animated"
            >
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    {components[imageIndex]}
                </AnimatePresence>
            </motion.div>
            <CountStateContext.Provider value={imageIndex + 1}>
                <CountDispatchContext.Provider value={paginate}>
                    <Breakpoint medium up>
                        <ActualSlideProgressBar counter={counter} />
                    </Breakpoint>
                    <SliderControls counter={counter} />
                </CountDispatchContext.Provider>
            </CountStateContext.Provider >
        </section>
    );
}