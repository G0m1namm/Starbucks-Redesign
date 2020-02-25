import React from 'react';
import { Header } from './components/templates/Header/Header';
// import logo from './logo.svg';
import './App.scss';
import Menu from './components/templates/Menu/Menu';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/pages/Home/Home";
import  { BreakpointProvider } from 'react-socks';
import Amplify from 'aws-amplify';
import awsmobile from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';

Amplify.configure(awsmobile);


function App() {
  return (
    <BreakpointProvider>
      <Header />
      <Menu />
      <Router>
        <Route path={["/home", "/"]} component={Home} />
      </Router>
    </BreakpointProvider>
  );
}

export default withAuthenticator(App, true);
