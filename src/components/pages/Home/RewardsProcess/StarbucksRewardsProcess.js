import React from "react";
import { IntersectionObserver } from "../../../atoms/IntersectionObserver";
import { Breakpoint } from "react-socks";
import PhonesImage from "../../../../assets/images/starbuck-phones.png";
import AppStoreGooglePlayImage from "../../../../assets/images/download-on-app-store-google-play.png";

import "./StarbucksRewardsProcess.scss";

export const Step = ({step}) => <span className="step-indicator">{step}</span>

export function ProcessStep({step, children}){
    return(
        <li className="process-step">
            <Step step={step}/>
            <span className="step-subtitle">Step 0{step}</span>
            {children && children}
        </li>
    );
}

export function ProcessWrapper(){
    const texts = [
        "Download our app or register",
        "Join Starbucks Rewards™",
        "Buy coffee using your smartphone",
        "Earn points and get free coffee",
        "Track your stats and recieve beast deals"
    ];
    return(
        <ul className="process-list">
            {texts.map((step, index) => 
                <ProcessStep step={index + 1}>
                    <span className="step-title">{step}</span>
                </ProcessStep>
            )}
        </ul>
    );
}

export default function RewardsProcessSection(){
    

    return(
        <section id="rewardsProcessSection">
            <IntersectionObserver className="section-content-wrapper">
                <Breakpoint medium up className="process-image">
                    <img src={PhonesImage} alt="Phones with Starbucks logo"/>
                </Breakpoint>
                <div className="process-content">
                    <h2 className="process-list-title">Join <span className="green">Starbucks Rewards™</span>, earn points, get free coffee</h2>
                    <ProcessWrapper/>
                    <div className="process-links">
                        <img src={AppStoreGooglePlayImage} alt="buttons to redirect to app store or google play"/>
                        <a href="#" className="link-learn-more">Learn more about Starbucks Rewards™ program</a>
                    </div>
                </div>
            </IntersectionObserver>
        </section>
    );
}