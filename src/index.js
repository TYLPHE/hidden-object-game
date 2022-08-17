import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './Header';
import Image from './Image';
import './styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <React.StrictMode>
      <Header />
      <Image />
    </React.StrictMode>
  </div>
);
