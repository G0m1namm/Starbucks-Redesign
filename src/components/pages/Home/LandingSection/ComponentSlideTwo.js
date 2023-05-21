import React from "react";
import './ComponentSlide.scss'
import { ComponentCategory, ComponentTitle } from "../../../organisms/Home/ComponenSlider/ComponentInfo";
// Photo by Dmitry Schemelev on Unsplash
import CappuccinoImage from "../../../../assets/images/cappuccino-slide-2.jpg";

import { DescriptionSwitchView, ImageSwitchView } from "../../../molecules/Home/ComponentSlider/ComponentSwitchView";
import { motion } from "framer-motion";

export default function ComponentSlideTwo() {

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
        <motion.div layout initial="initial" variants={stagger} exit="initial" id="componentSlideTwo">
            <motion.div className="component-two-info" variants={variants} initial="initial" animate="animate">
                <motion.div variants={stagger} custom={1}>
                    <ComponentCategory>special offer</ComponentCategory>
                </motion.div>
                <motion.div variants={stagger} custom={2}>
                    <ComponentTitle><span className="active">50%</span> discount for Almond Cappuccino</ComponentTitle>
                </motion.div>
                <motion.div variants={stagger} custom={3}>
                    <DescriptionSwitchView
                        desktopText="Buy Venti cappuccino on almond milk and receive 50% discount for the next drink"
                        mobileText="Promotions that save money and buy sweet moments"
                        buttonText="Find out more"
                    />
                </motion.div>
            </motion.div>
            <div className="component-two-image">
                <ImageSwitchView
                    image={CappuccinoImage}
                    imgAlt="Starbuck cappuccino"
                    buttonText="Find out more"
                />
            </div>
        </motion.div>
    );
}