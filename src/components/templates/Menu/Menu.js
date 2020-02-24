import React, { useState } from "react";
import "./Menu.scss";
import { ArrowRight, X } from "react-feather";
import { MenuICon } from "../../atoms/MenuIcon";
import { Modal } from "@material-ui/core";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { previewProducts } from "../../../data/products";
import { NavigationLinks } from "../../../data/navigation";
import ArticlePreview from "../../organisms/Menu/ArticlePreview/ArticlePreview";
import NavWrapper, { NavLink } from "../../atoms/NavLink";
import { SocialIconsWrapper } from "../../molecules/Menu/SocialIconsWrapper";

export function Recomendations({ products }) {
    const x = useMotionValue(0);
    const productListVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delay: 0.3,
                when: "beforeChildren",
            }
        }
    }
    const productVariants = {
        productHidden: { x: -20,  opacity: 0, scale: 0},
        productVisible: i => ({
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
                delay: (i + 1.3) * 0.2,
                when: "afterChildren",
            }
        })
    }
    return (
        <div className="slider-container">
            <motion.ul
                className="menu-product-list"
                style={{ x }}
                drag="x"
                dragConstraints={{ left: -307, right: 0 }}
                variants={productListVariants}
                initial="hidden"
                animate="visible"
            >
                {products.map((product, index) => (
                    <motion.li 
                        key={`${product.id}${index}`}
                        className="menu-product"
                        custom={index} 
                        variants={productVariants}
                        initial="productHidden"
                        animate="productVisible"
                    >
                        <ArticlePreview
                            image={product.image}
                            title={product.title}
                            subtitle={product.subtitle}
                        />
                    </motion.li>
                ))}
            </motion.ul>
        </div>
    )
}

export function CategorizedNavigation() {
    const navData = [...NavigationLinks];
    const navListVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delay: 1,
                when: "beforeChildren",
            }
        }
    }
    return (
        <motion.div 
            className="menu-nav-links"
            variants={navListVariants}
            initial="hidden"
            animate="visible"
        >
            {navData.map((navs, index) => (
                <NavWrapper key={`${Date.now()}${index}`} title={navs.title} order={index}>
                    {navs.links.map((link, index) => <NavLink key={`${Date.now()}${index}`}>{link}</NavLink>)}
                </NavWrapper>
            ))}
        </motion.div>
    );
}

export default function Menu() {
    const products = [...previewProducts];
    const [open, setOpen] = useState(false);
    const menuVariants = {
        collapsed: {
            x: '-100vw',
            opacity: 0,
        },
        expanded: {
            x: 0,
            opacity: 1,
        },
        exit: {
            x: '-100vw',
            opacity: 0,
            scale: 0.8,
        }
    }
    const menuTransitions = {
        type: "spring",
        stiffness: 800,
        damping: 100,
        duration: 0.3
    }

    return (
        <>
            <aside id="asideMenu">
                <div className="menu-icon-wrapper" onClick={() => setOpen(!open)}>
                    <MenuICon />
                </div>
            </aside >
            <Modal
                open={open}
                className="menu-content-backdrop"
                onClose={(e) => { setOpen(!open) }}
                aria-labelledby="menu-navigation"
                aria-describedby="aside-menu-to-navigate"
                BackdropProps={{
                    className: "menu-modal-backdrop"
                }}
            >
                <AnimatePresence exitBeforeEnter>
                    <motion.div
                        initial="collapsed"
                        animate="expanded"
                        exit="expanded"
                        variants={menuVariants}
                        transition={menuTransitions}
                        className="menu-content--expanded"
                    >
                        <span className="menu-content-header-mask" />
                        <div className="menu-content-wrapper">
                            <div className="menu-content-icon" onClick={() => setOpen(!open)}>
                                <X />
                            </div>
                            <div className="menu-content">
                                <Recomendations products={products} />
                                <CategorizedNavigation />
                                <div className="menu-content-actions">
                                    <SocialIconsWrapper />
                                    <button className="btn btn-primary">
                                        Go to Starbucks Store &#8482; &nbsp;
                                        <ArrowRight />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </Modal>
        </>
    );
}