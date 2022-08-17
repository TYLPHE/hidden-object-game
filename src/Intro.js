import './styles/Intro.css';
import helper from './helper';
import { useEffect, useState } from 'react';
// import crew from './images/crew.png';

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
          <div>Use your mouse to click on the crew.</div>
          <button className='start' onClick={() => props.setSeenIntro(true)}>
            Start
          </button>
        </div>
      </div>
    );
  }
}

export default Intro;
