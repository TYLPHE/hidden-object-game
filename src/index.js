import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './Header';
import Instructions from './Instructions';
import Legend from './Legend';
import Image from './Image';
import './styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <React.StrictMode>
      <Header />
      <Image />
      <div className='flex-container'>
        <Instructions />
        <Legend />
      </div>
    </React.StrictMode>
  </div>
);
