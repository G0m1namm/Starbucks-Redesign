import React from "react";
import './ComponentSlide.scss'
import { ComponentCategory, ComponentTitle, ComponentDescription } from "../../../organisms/Home/ComponenSlider/ComponentInfo";
import CoffeImage from "../../../../assets/images/coffee-slide-1.png";
import { Breakpoint } from "react-socks";

export const DescriptionSwitchView = () => {
    return (
        <>
            <Breakpoint medium down>
                <ComponentDescription>Exclusive deals on drinks, delivered straight to your inbox</ComponentDescription>
            </Breakpoint>
            <Breakpoint medium up>
                <ComponentDescription>Cold latte and capuccino, frapuccino, iced mocha are available in our new summer menu</ComponentDescription>
                <button className="btn btn-primary">Find out more</button>
            </Breakpoint>
        </>
    );
}

export const ImageSwitchView = () => {
    return (
        <>
            <Breakpoint medium down>
                <img src={CoffeImage} alt="Starbucks coffee" />
                <button className="btn btn-primary">Find out more</button>
            </Breakpoint>
            <Breakpoint medium up>
                <img src={CoffeImage} alt="Starbucks coffee" />
            </Breakpoint>
        </>
    );
}
export default function ComponentSlideOne() {
    return (
        <div id="componentSlideOne">
            <div className="">
                <ComponentCategory>Summer drinks</ComponentCategory>
                <ComponentTitle>Meet our new <span className="active">Summer</span> Coffeedrinks</ComponentTitle>
                <DescriptionSwitchView/>
            </div>
            <div>
                <ImageSwitchView/>
            </div>
        </div>
    );
}