import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

//context components
import { AuthContextProvider } from './context/AuthContext'; //gets the AuthContext Provider function that wraps our App components as it's child

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);

