import React, { useRef } from "react";
import clx from "classnames";
import "./MapPlacesList.scss";

export default function MapPlacesList() {
    const asideRef = useRef(null);
    const info = [
        {
            id: 1,
            title: "Spálená 74/18",
            subtitle: "Praha 2",
            schedule: "10:00 - 23:00",
        },
        {
            id: 2,
            title: "Jugoslávská 2/5",
            subtitle: "Praha 4",
            schedule: "10:00 - 23:00",
        },
        {
            id: 3,
            title: "Staromestské nám. 478/26",
            subtitle: "Praha 1",
            schedule: "10:00 - 23:00",
        },
        {
            id: 4,
            title: "Prazsky Hrad, Kajetánka, Hradcanské nám.",
            subtitle: "Praha 1",
            schedule: "10:00 - 23:00",
        },
        {
            id: 5,
            title: "Spálená 74/18",
            subtitle: "Praha 2",
            schedule: "10:00 - 23:00",
        },
    ];

    return (
        <aside id="mapAsideList" ref={asideRef}>
            <div className="aside-scroller-container">
                <div className="list-main-item">
                    <h3>Found 10 coffeeshops in your area</h3>
                </div>
                {info.map((item, index) =>
                    <ListItem
                        key={`list-place-${index}`}
                        className={`list-item-${index}`}
                        listNum={item.id}
                        title={item.title}
                        subtitle={item.subtitle}
                        schedule={item.schedule}
                    />
                )}
            </div>
        </aside>
    );
}

export function ListItem({ className, title, subtitle, schedule, listNum }) {
    return (
        <div className={clx("list-item-box", className)}>
            <h4>{listNum}. {title}</h4>
            <h5>{subtitle}</h5>
            <span>{schedule}</span>
        </div>
    );
}