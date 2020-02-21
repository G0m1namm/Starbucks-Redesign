import React, { useContext } from "react";
import GoogleMapReact from "google-map-react";
import MarkerMap from "../../../../atoms/MarkerMap/MarkerMap";
import { HoveredPlaceValueContext, MapPlacesContext } from "../../../../pages/Home/MapSection/MapSection";

const API_KEY = "AIzaSyB3qTmTGpru9yGTUHHqsZM9ocNk4J2sD5U";

export default function MapView(props) {
    const defaultProps = {
        center: {
            lat: 50.0866954,
            lng: 14.4147005
        },
        zoom: 13.5
    }

    const hoverKey = useContext(HoveredPlaceValueContext);
    const greatPlaces = useContext(MapPlacesContext);

    return (
        <div style={{ height: '400px', width: '100%  ' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: API_KEY }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                hoverDistance={20}
                options={{disableDefaultUI: true}}
            >
                {greatPlaces.map(({id, lat, lng}, index) =>
                    <MarkerMap
                        key={id}
                        lat={lat}
                        lng={lng}
                        hover={hoverKey === id}
                    />
                )}
            </GoogleMapReact>
        </div>
    );
}