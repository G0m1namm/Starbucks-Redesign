import React from "react";
import './ComponentInfo.scss';

export const ComponentCategory = ({ children, className = "", ...props }) => {
    return <label className={`component-category ${className}`}>{children}</label>
}

export const ComponentTitle = ({ children, className = "", ...props }) => {
    return <h1 className={`component-title ${className}`}>{children}</h1>
}

export const ComponentDescription = ({ children, className = "", ...props }) => {
    return <p className={`component-description ${className}`}>{children}</p>
}