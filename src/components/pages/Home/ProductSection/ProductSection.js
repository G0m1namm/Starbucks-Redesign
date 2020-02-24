import React from "react";
import "./ProductSection.scss";
import ProductCard from "../../../organisms/Home/ProductSection/ProductCard";
import { productOffers } from "../../../../data/products";
import { motion } from "framer-motion";

export default function ProductSection(){

    const stagger = {
        animate: {
            transition: {
                staggerChildren: 0.3,
                when: "beforeChildren"
            }
        }
    }

    return (
        <section id="productSection">
            <h2 className="product-section-title">Exclusive offers</h2>
            <motion.div variants={stagger} initial={false} animate="animate" className="products-container">
                {productOffers.map((product, index) => <ProductCard key={product.id} {...product} custom={index}/>)}
            </motion.div>
        </section>
    );
}