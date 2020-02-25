import React from "react";
import "./ViewContainer.scss";

export default function ViewContainer({children, ...props}){
    return (
        <main id="viewContainer" {...props}>
            {children}
        </main>
    );
}