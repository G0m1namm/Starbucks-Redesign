import React from "react";
import './ComponentSlide.scss'
import { ComponentCategory, ComponentTitle } from "../../../organisms/Home/ComponenSlider/ComponentInfo";

import CoffeeBeansImage from "../../../../assets/images/pink-coffee-slide.png";

import { DescriptionSwitchView, ImageSwitchView } from "../../../molecules/Home/ComponentSlider/ComponentSwitchView";
import { motion } from "framer-motion";

export default function ComponentSlideThree() {

    const variants = {
        initial: {
            y: -20,
            opacity: 0,
        },
        animate: i => ({
            y: 0,
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        }),
        exit: {
            y: -20,
            opacity: 0,
        }
    }

    const stagger = {
        initial: {
            y: 20, opacity: 0, transition: {
                staggerChildren: 0.2,
                staggerDirection: -1,
                delay: 0.4
            }
        },
        animate: {
            y: 0,
            opacity: 1
        },
        exit: {
            y: -20,
            opacity: 0,
        }
    };

    return (
        <motion.div layout initial="initial" variants={stagger} exit="initial" id="componentSlideThree">
            <motion.div className="component-three-info" variants={variants} initial="initial" animate="animate">
                <motion.div variants={stagger} custom={1}>
                    <ComponentCategory>coffee stories</ComponentCategory>
                </motion.div>
                <motion.div variants={stagger} custom={2}>
                    <ComponentTitle>Our <span className="active">best</span> coffee beans</ComponentTitle>
                </motion.div>
                <motion.div variants={stagger} custom={3}>
                    <DescriptionSwitchView
                        desktopText="Exceptional coffees from around the world. Sourced for the season, roasted at Starbucks Reserve® Roasteries and crafted with care"
                        mobileText="See how we roast them"
                        buttonText="Find out more"
                    />
                </motion.div>
            </motion.div>
            <div className="component-three-image">
                <ImageSwitchView
                    image={CoffeeBeansImage}
                    imgAlt="Starbuck coffee beans"
                    buttonText="Find out more"
                />
            </div>
        </motion.div>
    );
}