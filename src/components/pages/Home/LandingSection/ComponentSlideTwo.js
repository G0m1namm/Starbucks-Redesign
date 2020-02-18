import React from "react";
import './ComponentSlide.scss'
import { ComponentCategory, ComponentTitle } from "../../../organisms/Home/ComponenSlider/ComponentInfo";

// Photo by Dmitry Schemelev on Unsplash
import CappuccinoImage from "../../../../assets/images/cappuccino-slide-2.jpg";

import { DescriptionSwitchView, ImageSwitchView } from "../../../molecules/Home/ComponentSlider/ComponentSwitchView";

export default function ComponentSlideTwo() {
    return (
        <div id="componentSlideTwo">
            <div className="component-two-info">
                <ComponentCategory>special offer</ComponentCategory>
                <ComponentTitle><span className="active">50%</span> discount for Almond Cappuccino</ComponentTitle>
                <DescriptionSwitchView
                    desktopText="Buy Venti cappuccino on almond milk and receive 50% discount for the next drink"
                    mobileText="Promotions that save money and buy sweet moments"
                    buttonText="Find out more"
                />
            </div>
            <div className="component-two-image">
                <ImageSwitchView 
                    image={CappuccinoImage} 
                    imgAlt="Starbuck cappuccino" 
                    buttonText="Find out more"
                />
            </div>
        </div>
    );
}