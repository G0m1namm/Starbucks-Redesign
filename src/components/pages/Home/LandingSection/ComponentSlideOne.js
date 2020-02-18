import React from "react";
import './ComponentSlide.scss'
import { ComponentCategory, ComponentTitle } from "../../../organisms/Home/ComponenSlider/ComponentInfo";
import FrappuccinoImage from "../../../../assets/images/frappuccino-image-slide-bg.png";
import { DescriptionSwitchView, ImageSwitchView } from "../../../molecules/Home/ComponentSlider/ComponentSwitchView";
import { motion } from "framer-motion";

export default function ComponentSlideOne() {
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
        initial: { y: 20, opacity: 0, transition: {
            staggerChildren: 0.2,
            staggerDirection: -1,
        }},
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
        <motion.div positionTransition initial={false} variants={stagger} exit="initial" id="componentSlideOne">
            <motion.div className="component-one-info" variants={variants} initial="initial" animate="animate" >
                <motion.div variants={stagger} custom={1}>
                    <ComponentCategory>Summer drinks</ComponentCategory>
                </motion.div>
                <motion.div variants={stagger} custom={2}>
                    <ComponentTitle>Meet our new <span className="active">Summer</span> Coffeedrinks</ComponentTitle>
                </motion.div>
                <motion.div variants={stagger} custom={3}>
                    <DescriptionSwitchView
                        desktopText="Cold latte and cappuccino, frappuccino, iced mocha are available in our new summer menu."
                        mobileText="Exclusive deals on drinks, delivered straight to your inbox."
                        buttonText="Find out more"
                    />
                </motion.div>
            </motion.div>
            <div className="component-one-image">
                <ImageSwitchView
                    image={FrappuccinoImage}
                    imgAlt="Starbuck frappuccino"
                    buttonText="Find out more"
                />
            </div>
        </motion.div>
    );
}