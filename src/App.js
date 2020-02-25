import React from 'react';
// import logo from './logo.svg';
import  { BreakpointProvider } from 'react-socks';
import Amplify from 'aws-amplify';
import awsmobile from './aws-exports';
import AuthProvider from './utils/AuthProvider';
import './App.scss';

Amplify.configure(awsmobile);


function App() {
  return (
    <BreakpointProvider>
      <AuthProvider />
    </BreakpointProvider>
  );
}

export default App;
