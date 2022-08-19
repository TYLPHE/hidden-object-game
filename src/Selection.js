import { useEffect, useState } from 'react';
import helper from './helper';
import Clock from './Clock';
import './styles/Selection.css'

function Selection(props) {
  const [waldoUrl, setWaldoUrl] = useState(null);
  const [wendaUrl, setWendaUrl] = useState(null);
  const [wizardUrl, setWizardUrl] = useState(null);
  const [odlawUrl, setOdlawUrl] = useState(null);

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
      console.log('someone found');
      if (name === 'waldo') {
        return props.setWaldoFound(true);
      }
      if (name === 'wenda') {
        return props.setWendaFound(true);
      }
      if (name === 'wizard') {
        return props.setWizardFound(true);
      }
      if (name === 'odlaw') {
        return props.setOdlawFound(true);
      }
    } else {
      return console.log('nobody found');
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
        className='bubble selection-waldo center' 
        alt='Waldo'
        src={waldoUrl}
        onClick={() => matchingImage('waldo')}
      />
      <img 
        className='bubble selection-wenda center' 
        alt='Wenda'
        src={wendaUrl}
        onClick={() => matchingImage('wenda')}
      />
      <img 
        className='bubble selection-wizard center'
        alt='Wizard'
        src={wizardUrl}
        onClick={() => matchingImage('wizard')}
      />
      <img 
        className='bubble selection-odlaw center'
        alt='Odlaw'
        src={odlawUrl}
        onClick={() => matchingImage('odlaw')}
      />
    </div>
  )
}

export default Selection;
