import React from "react";
import ViewContainer from "../../templates/ViewContainer/ViewContainer";
import './Home.scss';
import ComponentSlider from "./LandingSection/ComponentSlider";
import CardsSection from "./CardsSection/CardsSection";
import MapSection from "./MapSection/MapSection";

export default function Home() {
    return(
        <ViewContainer className="home-background">
            <ComponentSlider />
            <CardsSection/>
            <MapSection/>
        </ViewContainer>
    );
}