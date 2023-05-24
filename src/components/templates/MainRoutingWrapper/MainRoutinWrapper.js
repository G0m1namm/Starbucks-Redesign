import React from 'react'
import { Outlet } from "react-router-dom";
import Header from '../Header/Header';
import { MenuProvider } from '../../../helpers/MenuProvider';

export default function MainRoutingWrapper() {
    return (
        <>
            <MenuProvider>
                <Header />
                <Outlet />
            </MenuProvider>
        </>
    );
}