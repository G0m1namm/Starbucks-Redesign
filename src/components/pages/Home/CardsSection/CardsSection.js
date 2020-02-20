import React from "react";
import { IntersectionObserver } from "../../../atoms/IntersectionObserver";
import { Card } from "../../../organisms/Home/CardSection/Card";
import "./CardSection.scss";
import { ArrowRight } from "react-feather";
import { motion } from "framer-motion";

export default function CardsSection() {

    const cardsCopy = [
        {
            idx: 1,
            indicator: "01",
            title: "Make an online order",
            description: "Order a drink, set time and the place and grab your fresh coffee or a tea",
        },
        {
            idx: 2,
            indicator: "02",
            title: 'Join Starbucks Rewards™',
            description: "Earn points, get free coffee and many other prizes",
        },
        {
            idx: 3,
            indicator: "03",
            title: "Find your perfect coffee",
        },
        {
            idx: 4,
            indicator: <ArrowRight />,
            title: "Go to Starbucks store™",
        },
    ];

    const staggerFadeUp = {
        hidden: {
            opacity: 0,
            transition: {
                // when: "afterChildren",
                // staggerChildren: 0.07,
                // delayChildren: 0.2,
            }
        },
        visible: index => ({
            opacity: 1,
            transition: {
                // when: "beforeChildren",
                // staggerChildren: 0.3,
                // staggerDirection: 1,
                delay: index * 0.6,
            }
        })
    };

    const fadeUp = {
        visible: ([i, idx]) => ({
            y: 0,
            opacity: 1,
            transition: {
                y: { stiffness: 1000, velocity: -100 },
                delay: (i + (idx + 3)) * 0.2,
            }
        }),
        hidden: {
            y: 50,
            opacity: 0,
            transition: {
                y: { stiffness: 1000 },
            }
        }
    }

    return (
        <section id="cardsSection">
            {cardsCopy.map((card, index) =>
                <IntersectionObserver key={`card-wrapper-${index}`} className={`card-wrapper-square-${card.idx}`} whileHover={{ scale: 1.02 }} whileTap={{ scale: 1 }}>
                    <Card index={card.idx} delayOrder={card.idx}>
                        <span className="card-indicator">{card.indicator}</span>
                        <motion.div variants={staggerFadeUp} initial="hidden" animate="visible" custom={index} className="card-info-wrapper">
                            <motion.h2 variants={fadeUp} className="card-info-title" custom={[0, index]}>{card.title}</motion.h2>
                            {card.description && <motion.p variants={fadeUp} className="card-info-description" custom={[1, index]}>{card.description}</motion.p>}
                        </motion.div>
                    </Card>
                </IntersectionObserver>
            )}

        </section>
    );
}
// Image by Monfocus from Pixabay