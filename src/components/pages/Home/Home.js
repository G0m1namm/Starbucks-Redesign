import React from "react";
import ViewContainer from "../../templates/ViewContainer/ViewContainer";
import ComponentSlider from "./LandingSection/ComponentSlider";
import CardsSection from "./CardsSection/CardsSection";
import MapSection from "./MapSection/MapSection";
import ProductSection from "./ProductSection/ProductSection";
import RewardsProcessSection from "./RewardsProcess/StarbucksRewardsProcess";
import Footer from "../../templates/Footer/Footer";
import Menu from "../../templates/Menu/Menu";
import './Home.scss';

export default function Home() {
    return (
        <>
            <Menu />
            <ViewContainer className="home-background">
                <ComponentSlider />
                <CardsSection />
                <MapSection />
                <ProductSection />
                <RewardsProcessSection />
            </ViewContainer>
            <Footer />
        </>
    );
}