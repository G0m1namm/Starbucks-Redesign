import React from "react";
import './ComponentSlide.scss'
import { ComponentCategory, ComponentTitle } from "../../../organisms/Home/ComponenSlider/ComponentInfo";

// Photo by Hans Vivek on Unsplash
import CoffeeBeansImage from "../../../../assets/images/coffe-beans-slide-3.jpg";

import { DescriptionSwitchView, ImageSwitchView } from "../../../molecules/Home/ComponentSlider/ComponentSwitchView";

export default function ComponentSlideThree() {
    return (
        <div id="componentSlideThree">
            <div className="component-three-info">
                <ComponentCategory>coffee stories</ComponentCategory>
                <ComponentTitle>Our <span className="active">best</span> coffee beans</ComponentTitle>
                <DescriptionSwitchView
                    desktopText="Exceptional coffees from around the world. Sourced for the season, roasted at Starbucks Reserve® Roasteries and crafted with care"
                    mobileText="See how we roast them"
                    buttonText="Find out more"
                />
            </div>
            <div className="component-three-image">
                <ImageSwitchView 
                    image={CoffeeBeansImage} 
                    imgAlt="Starbuck coffee beans" 
                    buttonText="Find out more"
                />
            </div>
        </div>
    );
}