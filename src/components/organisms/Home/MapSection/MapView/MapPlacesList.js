import React, { useRef, useContext } from "react";
import clx from "classnames";
import { MapPlacesContext, HoveredPlaceDispatchContext } from "../../../../pages/Home/MapSection/MapSection";
import { Col, Row } from "antd";
import { Breakpoint, useCurrentWidth } from "react-socks";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useState } from "react";
import classnames from 'classnames';
import "./MapPlacesList.scss";

export default function MapPlacesList() {
    const asideRef = useRef(null);
    const places = useContext(MapPlacesContext);
    const [openList, setOpenList] = useState(false);
    const width = useCurrentWidth();

    return (
        <aside id="mapAsideList" ref={asideRef}>
            <div className={classnames("aside-scroller-container",
                { "aside-scroller-container--open": openList }
            )}>
                <Row
                    role="button"
                    onClick={() => setOpenList(prev => !prev)}
                    className="list-main-item"
                    wrap={false}
                    align="middle"
                    gutter={30}
                    justify="space-between"
                >
                    <Col>
                        <Row align="middle">
                            <h3 className="list-main-item-text">Found 10 coffeeshops in your area</h3>
                        </Row>
                    </Col>
                    <Breakpoint medium down>
                        <Col>
                            <Row align="middle">
                                {openList ? <ArrowDownward /> : <ArrowUpward />}
                            </Row>
                        </Col>
                    </Breakpoint>
                </Row>
                {places.map((place, index) =>
                    <ListItem
                        key={`list-place-${index}`}
                        className={`list-item-${index}`}
                        listNum={place.id}
                        title={place.title}
                        subtitle={place.subtitle}
                        schedule={place.schedule}
                        lat={place.lat}
                        lng={place.lng}
                        setOpenList={width > 992 ? null : setOpenList}
                    />
                )}
            </div>
        </aside >
    );
}

export function ListItem({ className, title, subtitle, schedule, listNum, lat, lng, setOpenList }) {
    const [onCenterChange, setPlaceKeyHovered] = useContext(HoveredPlaceDispatchContext);

    const handleMouseEnter = () => {
        if (setOpenList) return;
        setPlaceKeyHovered(listNum);
        onCenterChange([lat, lng]);
    }

    const handleMouseLeave = () => {
        if (setOpenList) return;
        setPlaceKeyHovered(0);
    }

    const handleOnClick = () => {
        if (!setOpenList) return;
        setOpenList(prev => !prev);
        setPlaceKeyHovered(listNum);
        onCenterChange([lat, lng]);
    }

    return (
        <div className={clx("list-item-box", className)} onClick={handleOnClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <h4>{listNum}. {title}</h4>
            <h5>{subtitle}</h5>
            <span>{schedule}</span>
        </div>
    );
}