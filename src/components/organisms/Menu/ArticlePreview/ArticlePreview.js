import React from "react";
import "./ArticlePreview.scss";
import { motion } from "framer-motion";

export default function ArticlePreview({ image, title, subtitle, className = "", ...props }) {
    return (
        <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 1 }} className={`product-preview ${className}`} {...props}>
            <div className="product-preview-image">
                <img src={image} alt={title} />
            </div>
            <div className="product-preview-content">
                <h3 className="product-preview-title">{title}</h3>
                <p className="product-preview-subtitle">{subtitle}</p>
            </div>
        </motion.a>
    );
}