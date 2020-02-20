import React from "react";
import MapView from "../../../organisms/Home/MapSection/MapView/MapView";
import MapPlacesList from "../../../organisms/Home/MapSection/MapView/MapPlacesList";
import MapSearchBar from "../../../organisms/Home/MapSection/MapView/MapSearchBar";
import "./MapSection.scss";

export default function MapSection() {
    return (
        <section id="mapSection">
            <h2 className="map-title">Find <span className="green">the nearest</span> Starbucks</h2>
            <div className="map-wrapper">
                <MapView />
                <MapPlacesList/>
                <MapSearchBar/>
            </div>
        </section>
    );
}