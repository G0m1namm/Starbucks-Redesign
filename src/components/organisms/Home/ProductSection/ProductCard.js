import React from "react";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import clx from "classnames";
import { motion } from "framer-motion";
import "./ProductCard.scss";

export default function ProductCard({ className, image, size, title, price, custom }) {

    const sizeDetail = {
        "Tall": "354ml",
        "Grande": "473ml",
        "Venti": "591ml",
    };

    const fadeUp = {
        initial: {
            y: 80,
            opacity: 0,
            scale: 0.7
        },
        animate: i => ({
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
                delay: i * 0.2
            }
        })
    }

    return (
        <motion.span variants={fadeUp} initial="initial" animate="animate" custom={custom} whileHover={{ scale: 1.05 }} whileTap={{ scale: 1 }} className={clx("product-card-root", className)}>
            <span className="product-image">
                <motion.img initial={{ x: 60, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: (custom + 0.4) * 0.3 }} src={image} alt="Starbucks coffee" />
            </span>
            <span className="product-info">
                <span className="product-detail">{size} <FiberManualRecordIcon size="small" /> {sizeDetail[size]}</span>
                <span className="product-title">{title}</span>
                <span className="product-price">${price}</span>
            </span>
        </motion.span>
    );
}