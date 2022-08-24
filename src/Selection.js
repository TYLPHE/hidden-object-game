import { useEffect, useState } from 'react';
import helper from './helper';
import Clock from './Clock';
import './styles/Selection.css'

function Selection(props) {
  const [waldoUrl, setWaldoUrl] = useState(null);
  const [wendaUrl, setWendaUrl] = useState(null);
  const [wizardUrl, setWizardUrl] = useState(null);
  const [odlawUrl, setOdlawUrl] = useState(null);
  const [incorrect, setIncorrect] = useState(null);

  useEffect(() => {
    async function fetchData(setState, location) {
      setState(await helper.getUrl(location))
    }

    fetchData(setWaldoUrl, 'images/waldo-single.png');
    fetchData(setWendaUrl, 'images/wenda-single.png');
    fetchData(setWizardUrl, 'images/wizard-single.png');
    fetchData(setOdlawUrl, 'images/odlaw-single.png');
  }, [])

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
        return;
      }
      if (name === 'wenda') {
        props.setWendaCircleDisp(true);
        props.setWendaCircleCoordX(props.left);
        props.setWendaCircleCoordY(props.top);
        props.setWendaFound(true);
        props.setSelectionDisplay(false);
        return;
      }
      if (name === 'wizard') {
        props.setWizardCircleDisp(true);
        props.setWizardCircleCoordX(props.left);
        props.setWizardCircleCoordY(props.top);
        props.setWizardFound(true);
        props.setSelectionDisplay(false);
        return;
      }
      if (name === 'odlaw') {
        props.setOdlawCircleDisp(true);
        props.setOdlawCircleCoordX(props.left);
        props.setOdlawCircleCoordY(props.top);
        props.setOdlawFound(true);
        props.setSelectionDisplay(false);
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
        src={waldoUrl}
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
        src={wendaUrl}
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
        src={wizardUrl}
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
        src={odlawUrl}
        onClick={() => matchingImage('odlaw')}
      />
    </div>
  )
}

export default Selection;
