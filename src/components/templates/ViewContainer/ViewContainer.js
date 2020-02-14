import React from "react";
import "./ViewContainer.scss";

export default function ViewContainer({children}){
    return (
        <main id="viewContainer">
            {children}
        </main>
    )
}