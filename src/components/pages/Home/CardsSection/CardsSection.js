import React from "react";
import { IntersectionObserver } from "../../../atoms/IntersectionObserver";
import { Card } from "../../../organisms/Home/CardSection/Card";
import "./CardSection.scss";
import { ArrowRight } from "react-feather";

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

    return (
        <section id="cardsSection">
            {cardsCopy.map(card =>
                <IntersectionObserver className={`card-wrapper-square-${card.idx}`}>
                    <Card index={card.idx} delayOrder={card.idx}>
                        <span className="card-indicator">{card.indicator}</span>
                        <div className="card-info-wrapper">
                            <h2 className="card-info-title">{card.title}</h2>
                            {card.description && <p className="card-info-description">{card.description}</p>}
                        </div>
                    </Card>
                </IntersectionObserver>
            )}

        </section>
    );
}
// Image by Monfocus from Pixabay