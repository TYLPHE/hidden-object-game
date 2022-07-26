import './styles/Intro.css';
import helper from './helper';
import { useEffect, useState } from 'react';

function Intro(props) {
  const [crew, setCrew] = useState(null);
  const [crewUrl, setCrewUrl] = useState(null);
  const [crewLoaded, setCrewLoaded] = useState(false);

  useEffect(() => {
    async function getCrew() {
      const url = await helper.getUrl('images/crew.png');
      setCrew(url);
    }
    getCrew();
  }, [])

  useEffect(() => {
    if (crew) {
      setCrewUrl(true);
    }
  }, [crew])

  if (!props.displayIntro || !crewUrl) {
    return;
  } else if (crewUrl && !crewLoaded) {
    return (
      <div className='intro-container' >
        <div className='loading-intro'>Loading Intro...</div>
        <img 
          alt='waldo and friends'
          className='hidden'
          src={crew} 
          onLoad={() => setCrewLoaded(true)}
        />
      </div>
    );
  } else {
    return (
      <div className="intro-container">
        <div className='intro'>
          <div>Find Waldo, Wenda, Wizard, and Odlaw!</div>
          <img 
            alt='waldo and friends' 
            src={crew} 
            className={'crew'}
            onLoad={() => setCrewLoaded(true)}
          />
          <div>Use your mouse to find everybody.</div>
          <button 
            className='start' 
            onClick={() => {
              props.setSeenIntro(true);
              props.setTimeToggle(true);
              props.setMap('waldo1');
              props.updateCoords('waldo1');
            }}
          >
            Ski Resort Map
          </button>
          <button 
            className='start' 
            onClick={() => {
              props.setSeenIntro(true);
              props.setTimeToggle(true);
              props.setMap('waldo2')
              props.updateCoords('waldo2');
            }}
          >
            Track and Field Map
          </button>
          <button 
            className='start' 
            onClick={() => {
              props.setSeenIntro(true);
              props.setTimeToggle(true);
              props.setMap('waldo3');
              props.updateCoords('waldo3');
            }}
          >
            Space Map
          </button>
        </div>
      </div>
    );
  }
}

export default Intro;
