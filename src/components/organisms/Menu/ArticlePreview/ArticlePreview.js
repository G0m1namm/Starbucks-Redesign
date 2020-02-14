import React from "react";
import "./ArticlePreview.scss";

export default function ArticlePreview({ image, title, subtitle, className = "", ...props }) {
    return (
        <a className={`product-preview ${className}`} {...props}>
            <div className="product-preview-image">
                <img src={image} alt={title} />
            </div>
            <div className="product-preview-content">
                <h3 className="product-preview-title">{title}</h3>
                <p className="product-preview-subtitle">{subtitle}</p>
            </div>
        </a>
    );
}