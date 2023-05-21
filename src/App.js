import React from 'react';
// import logo from './logo.svg';
import { BreakpointProvider } from 'react-socks';
import { Amplify } from 'aws-amplify';
import config from './aws-exports';
import AuthProvider from './helpers/AuthProvider';
import { BrowserRouter as Router } from "react-router-dom";
import './App.scss';

Amplify.configure(config);


function App() {
  return (
    <BreakpointProvider>
      <Router>
        <AuthProvider />
      </Router>
    </BreakpointProvider>
  );
}

export default App;
