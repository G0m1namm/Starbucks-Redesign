import React from "react";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import clx from "classnames";
import "./ProductCard.scss";

export default function ProductCard({ className, image, size, title, price }) {

    const sizeDetail = {
        "Tall": "354ml",
        "Grande": "473ml",
        "Venti": "591ml",
    };

    return (
        <span className={clx("product-card-root", className)}>
            <span className="product-image">
                <img src={image} alt="Starbucks coffee" />
            </span>
            <span className="product-info">
                <span className="product-detail">{size} <FiberManualRecordIcon size="small" /> {sizeDetail[size]}</span>
                <span className="product-title">{title}</span>
                <span className="product-price">${price}</span>
            </span>
        </span>
    );
}