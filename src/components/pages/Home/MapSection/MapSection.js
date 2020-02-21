import React, { useState, useEffect } from "react";
import MapView from "../../../organisms/Home/MapSection/MapView/MapView";
import MapPlacesList from "../../../organisms/Home/MapSection/MapView/MapPlacesList";
import MapSearchBar from "../../../organisms/Home/MapSection/MapView/MapSearchBar";
import "./MapSection.scss";
import { places } from "../../../../data/places";

export const MapPlacesContext = React.createContext();
export const HoveredPlaceDispatchContext = React.createContext();
export const HoveredPlaceValueContext = React.createContext();

export default function MapSection() {
    const [hoverPlaceKey, setPlaceKeyHovered] = useState(0);
    const [center, setCenter] = useState({lat: 50.0866954, lng: 14.4147005});
    const [zoom, setZoom] = useState(14.5);

    const onKeyHoverChange = (key) => {
        setPlaceKeyHovered(key);
    }
    
    const onCenterChange = ([lat, lng]) => {
        const center = {lat, lng};
        setCenter(center);
    }

    const onZoomChange = (zoom) => {
        const parsedZoom = parseInt(zoom);
        setZoom(parsedZoom);
    }

    return (
        <section id="mapSection">
            <h2 className="map-title">Find <span className="green">the nearest</span> Starbucks</h2>
            <HoveredPlaceDispatchContext.Provider value={[onCenterChange, onKeyHoverChange]}>
                <HoveredPlaceValueContext.Provider value={hoverPlaceKey}>
                    <MapPlacesContext.Provider value={places}>
                        <div className="map-wrapper">
                            <MapView
                                center={center}
                                zoom={zoom}
                                onZoomChange={onZoomChange}
                            />
                            <MapPlacesList />
                            <MapSearchBar />
                        </div>
                    </MapPlacesContext.Provider>
                </HoveredPlaceValueContext.Provider>
            </HoveredPlaceDispatchContext.Provider>
        </section>
    );
}