import React from "react";
import GoogleMapReact from "google-map-react";

const API_KEY = "AIzaSyB3qTmTGpru9yGTUHHqsZM9ocNk4J2sD5U";
const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default class MapView extends React.Component {
    static defaultProps = {
        center: {
            lat: 50.0866954,
            lng: 14.4147005
        },
        zoom: 15.5
    }

    render() {
        return (
            <div style={{ height: '400px', width: '100%  ' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: API_KEY }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                >
                    <AnyReactComponent
                        lat={50.0910957}
                        lng={14.3964115}
                        text="Castillo de Praga"
                    />
                </GoogleMapReact>
            </div>
        );
    }
}