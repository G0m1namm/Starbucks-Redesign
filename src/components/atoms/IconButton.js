import React from "react";

export const IconButton = ({children, icon, ...props}) => {
    return (
        <button {...props}>
            <>
                {icon}
                <label>{children}</label>
            </>
        </button>
    )
} 