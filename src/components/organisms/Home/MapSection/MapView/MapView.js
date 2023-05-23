import React, { useContext } from "react";
import GoogleMapReact from "google-map-react";
import MarkerMap from "../../../../atoms/MarkerMap/MarkerMap";
import { HoveredPlaceValueContext, MapPlacesContext, HoveredPlaceDispatchContext } from "../../../../pages/Home/MapSection/MapSection";
import { useCurrentWidth } from "react-socks";

const API_KEY = "AIzaSyB3qTmTGpru9yGTUHHqsZM9ocNk4J2sD5U";

export default function MapView(props) {

    const hoverKey = useContext(HoveredPlaceValueContext);
    const greatPlaces = useContext(MapPlacesContext);
    const [onCenterChange, setPlaceKeyHovered] = useContext(HoveredPlaceDispatchContext);
    const width = useCurrentWidth();

    const onBoundsChange = ({ lat, lng }, zoom) => {
        onCenterChange([lat, lng]);
        props.onZoomChange(zoom);
    }

    const onChildClick = (key, childProps) => {
        onCenterChange([childProps.lat, childProps.lng]);
    }

    const onChildMouseEnter = (key) => {
        setPlaceKeyHovered(key);
    }

    const onChildMouseLeave = () => {
        setPlaceKeyHovered(0);
    }

    return (
        <div style={{ height: width > 992 ? '400px' : '600px', width: '100%  ' }}>
            <GoogleMapReact
                center={props.center}
                zoom={props.zoom}
                bootstrapURLKeys={{ key: API_KEY }}
                hoverDistance={20}
                options={{ disableDefaultUI: true }}
                onBoundsChange={onBoundsChange}
                onChildClick={onChildClick}
                onChildMouseEnter={onChildMouseEnter}
                onChildMouseLeave={onChildMouseLeave}
            >
                {greatPlaces.map(({ id, lat, lng, ...props }, index) =>
                    <MarkerMap
                        key={id}
                        lat={lat}
                        lng={lng}
                        hover={hoverKey === id}
                        {...props}
                    />
                )}
            </GoogleMapReact>
        </div>
    );
}