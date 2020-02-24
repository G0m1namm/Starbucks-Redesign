import React from "react";
import "./ProductSection.scss";
import ProductCard from "../../../organisms/Home/ProductSection/ProductCard";
import { productOffers } from "../../../../data/products";


export default function ProductSection(){
    return (
        <section id="productSection">
            <h2 className="product-section-title">Exclusive offers</h2>
            <div className="products-container">
                {productOffers.map((product, index) => <ProductCard key={product.id} {...product}/>)}
            </div>
        </section>
    );
}