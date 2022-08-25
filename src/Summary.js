import { useEffect } from 'react';
import './styles/Summary.css';
import helper from './helper';

function Summary(props) {
  useEffect(() => {
    props.setTimeToggle(false)
  })

  return (
    <div className='summary-container'>
      <div className='summary-title'>
        You Win!
      </div>
        <div>
          Time:
          &nbsp;
          {helper.convertSeconds(props.time)}
        </div>
        <div className='summary-window-container'>
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

          <img
            className='summary-profile' 
            alt='Waldo'
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

          <img
            className='summary-profile' 
            alt='Waldo'
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

          <img
            className='summary-profile' 
            alt='Waldo'
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
  );
}

export default Summary;
