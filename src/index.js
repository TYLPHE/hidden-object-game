import React from 'react';
import ReactDOM from 'react-dom/client';
import Game from './Game';
import Header from './Header';
import Instructions from './Instructions';
import Legend from './Legend';
import './styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <React.StrictMode>
      <Header />
      <div className='flex-container'>
        <Instructions />
        <Legend />
      </div>
      <Game />
    </React.StrictMode>
  </div>
);
