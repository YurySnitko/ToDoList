import { ToastContainer } from 'react-toastify';
import './App.css';
import { AppRoute } from './AppRoute';
import { Header } from './components/Header/Header';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';

export const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <div className="app-content-wrapper">
        <ToastContainer />
        <AppRoute />
      </div>
    </div>
  );
};
