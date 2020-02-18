import React from "react";
import './ComponentSlide.scss'
import { ComponentCategory, ComponentTitle } from "../../../organisms/Home/ComponenSlider/ComponentInfo";
import FrappuccinoImage from "../../../../assets/images/frappuccino-image-slide-bg.png";
import { DescriptionSwitchView, ImageSwitchView } from "../../../molecules/Home/ComponentSlider/ComponentSwitchView";

export default function ComponentSlideOne() {
    return (
        <div id="componentSlideOne">
            <div className="component-one-info">
                <ComponentCategory>Summer drinks</ComponentCategory>
                <ComponentTitle>Meet our new <span className="active">Summer</span> Coffeedrinks</ComponentTitle>
                <DescriptionSwitchView
                    desktopText="Cold latte and cappuccino, frappuccino, iced mocha are available in our new summer menu."
                    mobileText="Exclusive deals on drinks, delivered straight to your inbox."
                    buttonText="Find out more"
                />
            </div>
            <div className="component-one-image">
                <ImageSwitchView 
                    image={FrappuccinoImage} 
                    imgAlt="Starbuck frappuccino" 
                    buttonText="Find out more"
                />
            </div>
        </div>
    );
}