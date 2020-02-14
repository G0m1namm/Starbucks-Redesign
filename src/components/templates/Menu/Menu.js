import React from "react";
import "./Menu.scss";
import { MoreHorizontal } from "react-feather";
import { MenuICon } from "../../atoms/MenuIcon";
import { Backdrop } from "@material-ui/core";
import { motion, AnimatePresence } from "framer-motion";
import { previewProducts } from "../../../data/products";
import { NavigationLinks } from "../../../data/navigation";
import ArticlePreview from "../../organisms/Menu/ArticlePreview/ArticlePreview";
import NavWrapper, { NavLink } from "../../atoms/NavLink";

const menuTransition = {
    collapsed: {
        x: 0,
        opacity: 0,
    },
    expanded: {
        x: 0,
        opacity: 1,
    }
}

export function Recomendations({products}) {

    return (
        <>
            {products.map((product, index) => (
                <li className="menu-product" key={`${product.id}${index}`}>
                    <ArticlePreview
                        image={product.image}
                        title={product.title}
                        subtitle={product.subtitle}
                    />
                </li>
            ))}
        </>
    )
}

export function CategorizedNavigation(){
    const navData = NavigationLinks;

    return (
        <div className="menu-nav-links">
            {navData.map((navs, index) => (
                <NavWrapper key={`${Date.now()}${index}`} title={navs.title}>
                    {navs.links.map((link, index) => <NavLink key={`${Date.now()}${index}`}>{link}</NavLink>)}
                </NavWrapper>
            ))}
        </div>
    );
}

export default function Menu() {
    const products = previewProducts;

    return (
        <>
            <aside id="asideMenu">
                <span className="menu-header-mask" />
                <div className="menu-icon-wrapper">
                    <MenuICon />
                </div>
            </aside >
            <AnimatePresence>
                <Backdrop open={true} className="menu-content-backdrop">
                    <motion.div
                        initial="collapsed"
                        animate="expanded"
                        exit="collapsed"
                        variants={menuTransition}
                        className="menu-content--expanded"
                    >
                        <span className="menu-content-header-mask" />
                        <div className="menu-content-wrapper">
                            <div className="menu-content-icon">
                                <MenuICon />
                            </div>
                            <div className="menu-content">
                                <ul className="menu-product-list">
                                    <Recomendations products={products}/>
                                </ul>
                                <CategorizedNavigation/>
                            </div>
                        </div>
                    </motion.div>
                </Backdrop>
            </AnimatePresence>
        </>
    );
}