import { useState } from 'react';
import helper from './helper';
import Clock from './Clock';
import './styles/Selection.css'

function Selection(props) {
  const [incorrect, setIncorrect] = useState(null);

  function matchingImage(name) {
    const toMatch = helper.checkFound(
      props.left,
      props.top,
      props.imgWidth,
      props.imgHeight,
      props.coords
    );

    if (toMatch === name) {
      if (name === 'waldo') {
        props.setWaldoCircleDisp(true);
        props.setWaldoCircleCoordX(props.left);
        props.setWaldoCircleCoordY(props.top);
        props.setWaldoFound(true);
        props.setSelectionDisplay(false);
        props.setSummaryWaldoX(props.bgPosX);
        props.setSummaryWaldoY(props.bgPosY);
        return;
      }
      if (name === 'wenda') {
        props.setWendaCircleDisp(true);
        props.setWendaCircleCoordX(props.left);
        props.setWendaCircleCoordY(props.top);
        props.setWendaFound(true);
        props.setSelectionDisplay(false);
        props.setSummaryWendaX(props.bgPosX);
        props.setSummaryWendaY(props.bgPosY);
        return;
      }
      if (name === 'wizard') {
        props.setWizardCircleDisp(true);
        props.setWizardCircleCoordX(props.left);
        props.setWizardCircleCoordY(props.top);
        props.setWizardFound(true);
        props.setSelectionDisplay(false);
        props.setSummaryWizardX(props.bgPosX);
        props.setSummaryWizardY(props.bgPosY);
        return;
      }
      if (name === 'odlaw') {
        props.setOdlawCircleDisp(true);
        props.setOdlawCircleCoordX(props.left);
        props.setOdlawCircleCoordY(props.top);
        props.setOdlawFound(true);
        props.setSelectionDisplay(false);
        props.setSummaryOdlawX(props.bgPosX);
        props.setSummaryOdlawY(props.bgPosY);
        return;
      }
    } else {
      setIncorrect(name);
      setTimeout(() => {
        setIncorrect(null);
      }, 500);
    }
  }

  return (
    <div 
      className='selection zoomed center'
      style={
        {
          top: props.top,
          left: props.left,
          backgroundImage: props.bgUrl,
          backgroundPositionX: props.bgPosX,
          backgroundPositionY: props.bgPosY,
        }
      }
    >
      <Clock time={props.time}/>
      <div 
        className='bubble selection-cancel center' 
        onClick={() => props.setSelectionDisplay(false)}
      />
      <img 
        className={
          (incorrect === 'waldo') ?
            'bubble selection-waldo center wrong' :
            props.waldoFound ?
              'bubble selection-waldo center found' :
              'bubble selection-waldo center'
        }
        alt='Waldo'
        src={props.waldoUrl}
        onClick={() => matchingImage('waldo')}
      />
      <img 
        className={
          (incorrect === 'wenda') ?
            'bubble selection-wenda center wrong' :
            props.wendaFound ?
              'bubble selection-wenda center found' :
              'bubble selection-wenda center'
        } 
        alt='Wenda'
        src={props.wendaUrl}
        onClick={() => matchingImage('wenda')}
      />
      <img 
        className={
          (incorrect === 'wizard') ?
          'bubble selection-wizard center wrong' :
            props.wizardFound ?
              'bubble selection-wizard center found' :
              'bubble selection-wizard center'
        }
        alt='Wizard'
        src={props.wizardUrl}
        onClick={() => matchingImage('wizard')}
      />
      <img 
        className={
          (incorrect === 'odlaw') ?
          'bubble selection-odlaw center wrong' :
            props.odlawFound ?
              'bubble selection-odlaw center found' :
              'bubble selection-odlaw center'
        }
        alt='Odlaw'
        src={props.odlawUrl}
        onClick={() => matchingImage('odlaw')}
      />
    </div>
  )
}

export default Selection;
