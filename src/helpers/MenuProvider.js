import React from 'react';

export const MenuContext = React.createContext({
    open: false,
    setOpen: () => { }
});

export function MenuProvider({ children }) {
    const [open, setOpen] = React.useState(false);

    return (
        <MenuContext.Provider value={{ open, setOpen }}>
            {children}
        </MenuContext.Provider>
    )
}

export const useMenuContext = () => React.useContext(MenuContext);