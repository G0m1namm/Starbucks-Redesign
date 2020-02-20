import React from "react";
import clx from "classnames";
import { MapPin, Search } from "react-feather";
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import "./MapSearchBar.scss";

export function InputPlace({ startIcon, endIcon = null, place = "", placeholder, className }) {
    return (
        <div className={clx("search-bar-input", className)}>
            {startIcon}
            <input value={place} placeholder={placeholder} readOnly/>
            {endIcon}
        </div>
    );
}

export default function MapSearchBar() {
    return (
        <div id="mapSearchBar">
            <InputPlace startIcon={<MapPin />} endIcon={<GpsFixedIcon />} place="Prage, Czech Republic" />
            <InputPlace startIcon={<Search />} placeholder="Search by street" />
        </div>
    );
}
