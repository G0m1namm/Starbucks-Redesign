import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from '../Header/Header';
import Home from '../../pages/Home/Home';

export default function MainRoutingWrapper() {
    return (
        <>
            <Header />
            <Router>
                <Route path={["/home", "*"]} component={Home} />
            </Router>
        </>
    );
}