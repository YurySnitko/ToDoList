import React from 'react';
import { ToastContainer } from 'react-toastify';
import './App.css';
import { AppRoute } from './components/AppRoute';
import { Header } from './components/Header/Header';
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="app">
      <Header />
      <div className="app-content-wrapper">
        <ToastContainer />
        <AppRoute />
      </div>
    </div>
  );
}

export default App;
