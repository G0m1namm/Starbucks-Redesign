import React from "react";
import clx from "classnames";
import { motion } from "framer-motion";
import "./MarkerMap.scss";

export default function MarkerMap(props){
    return(
        <div className="place-marker" >
            <motion.span whileHover={{scale: 1.3}} whileTap={{scale: 1.1}} className="marker-indicator"/>
        </div>
    );
}