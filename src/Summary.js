import { useEffect, useState } from 'react';
import './styles/Summary.css';
import helper from './helper';

function Summary(props) {
  const [name, setName] = useState('anonymous');

  useEffect(() => {
    props.setTimeToggle(false)
  })

  function handleName(e) {
    setName(e.target.value);
  }

  return (
    <div className='summary-container'>
      <div className='summary-title'>
        You Win!
      </div>
      <div className='summary-time'>
        Time:
        &nbsp;
        {helper.convertSeconds(props.time)}
      </div>
      <div className='summary-window-container'>
        <div
          className='summary-split-container'
        >
          <div
            className='summary-profile-container'
          >
            <img
              className='summary-profile'
              alt='Waldo'
              src={props.waldoUrl}
            />
            <div
              className='summary-magnify'
              style={
                {
                  backgroundImage: `url( ${props.url} )`,
                  backgroundPositionX: props.summaryWaldoX,
                  backgroundPositionY: props.summaryWaldoY
                }
              }
            />
          </div>
          <div
            className='summary-profile-container'
          >
            <img
              className='summary-profile' 
              alt='Wenda'
              src={props.wendaUrl}
            />
            <div
              className='summary-magnify'
              style={
                {
                  backgroundImage: `url( ${props.url} )`,
                  backgroundPositionX: props.summaryWendaX,
                  backgroundPositionY: props.summaryWendaY
                }
              }
            />
          </div>
        </div>
        <div
          className='summary-split-container'
        >
          <div
            className='summary-profile-container'
          >
            <img
              className='summary-profile' 
              alt='Wizard'
              src={props.wizardUrl}
            />
            <div
              className='summary-magnify'
              style={
                {
                  backgroundImage: `url( ${props.url} )`,
                  backgroundPositionX: props.summaryWizardX,
                  backgroundPositionY: props.summaryWizardY
                }
              }
            />
          </div>
          <div
            className='summary-profile-container'
          >
            <img
              className='summary-profile' 
              alt='Odlaw'
              src={props.odlawUrl}
            />
            <div
              className='summary-magnify'
              style={
                {
                  backgroundImage: `url( ${props.url} )`,
                  backgroundPositionX: props.summaryOdlawX,
                  backgroundPositionY: props.summaryOdlawY
                }
              }
            />
          </div>
        </div>
      </div>
      <div className='submit-form'>
        <input 
          className='name' 
          type='text' 
          name='name' 
          placeholder='Enter Name' 
          onChange={handleName}
          autoFocus={true}
        />
        <input 
          className='submit-button' 
          type='button' 
          value='Submit Score'
          onClick={() => {
            helper.saveScore(name, props.time)
            props.setDisplayRank(true)
          }}
        />
      </div>
      <input 
        className='reset-button' 
        type='button' 
        onClick={() => window.location.reload()} 
        value='Reset Game'
      />


    </div>
  );
}

export default Summary;
