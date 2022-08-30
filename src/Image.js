import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import helper from './helper';
import Intro from './Intro';
import Selection from './Selection';
import Summary from './Summary';
import Circled from './Circled';
import Rank from './Rank'
import './styles/Image.css';

// pull data from Firebase and populate coords object
const coords = {
  odlaw: {},
  waldo: {},
  wenda: {},
  wizard: {},
}
helper.getSolutions(coords);

function Image() {
  const ref = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [posX, setPosX] = useState(null);
  const [posY, setPosY] = useState(null);
  const [posXOffset, setPosXOffset] = useState(0);
  const [posYOffset, setPosYOffset] = useState(0);
  const [imgWidth, setImgWidth] = useState(null);
  const [imgHeight, setImgHeight] = useState(null);
  // image url
  const [url, setUrl] = useState(null);
  const [waldoUrl, setWaldoUrl] = useState(null);
  const [wendaUrl, setWendaUrl] = useState(null);
  const [wizardUrl, setWizardUrl] = useState(null);
  const [odlawUrl, setOdlawUrl] = useState(null);
  // states related to Intro component
  const [seenIntro, setSeenIntro] = useState(false);
  const [displayIntro, setDisplayIntro] = useState(false);
  // states that show scores list after submitting own score
  const [displayRank, setDisplayRank] = useState(false);
  // states related to the magnifying glass
  const [magnifierDisp, setMagnifierDisp] = useState(false);
  const [selectionDisplay, setSelectionDisplay] = useState(false);
  // states related to the timer for Selection component
  const [timeToggle, setTimeToggle] = useState(false);
  const [time, setTime] = useState(0);
  // user ID to determine rank
  const [rankId, setRankId] = useState(null);
  //states to set if hidden object is found
  const [waldoFound, setWaldoFound] = useState(false);
  const [wendaFound, setWendaFound] = useState(false);
  const [wizardFound, setWizardFound] = useState(false);
  const [odlawFound, setOdlawFound] = useState(false);
  // positions for summary window
  const [summaryWaldoX, setSummaryWaldoX] = useState(null);
  const [summaryWaldoY, setSummaryWaldoY] = useState(null);
  const [summaryWendaX, setSummaryWendaX] = useState(null);
  const [summaryWendaY, setSummaryWendaY] = useState(null);
  const [summaryWizardX, setSummaryWizardX] = useState(null);
  const [summaryWizardY, setSummaryWizardY] = useState(null);
  const [summaryOdlawX, setSummaryOdlawX] = useState(null);
  const [summaryOdlawY, setSummaryOdlawY] = useState(null);
  // states to display a circle if object found
  const [waldoCircleDisp, setWaldoCircleDisp] = useState(false);
  const [wendaCircleDisp, setWendaCircleDisp] = useState(false);
  const [wizardCircleDisp, setWizardCircleDisp] = useState(false);
  const [odlawCircleDisp, setOdlawCircleDisp] = useState(false);
  // states to set the object found circle coordinates
  const [waldoCircleCoordX, setWaldoCircleCoordX] = useState(0);
  const [waldoCircleCoordY, setWaldoCircleCoordY] = useState(0);
  const [wendaCircleCoordX, setWendaCircleCoordX] = useState(0);
  const [wendaCircleCoordY, setWendaCircleCoordY] = useState(0);
  const [wizardCircleCoordX, setWizardCircleCoordX] = useState(0);
  const [wizardCircleCoordY, setWizardCircleCoordY] = useState(0);
  const [odlawCircleCoordX, setOdlawCircleCoordX] = useState(0);
  const [odlawCircleCoordY, setOdlawCircleCoordY] = useState(0);

  // grabs the main waldo map url from firebase
  useEffect(() => {
    async function fetchData() {
      setUrl(await helper.getUrl('images/waldo1.jpg'));
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData(setState, location) {
      setState(await helper.getUrl(location))
    }

    fetchData(setWaldoUrl, 'images/waldo-single.png');
    fetchData(setWendaUrl, 'images/wenda-single.png');
    fetchData(setWizardUrl, 'images/wizard-single.png');
    fetchData(setOdlawUrl, 'images/odlaw-single.png');
  }, [])

  useEffect(() => {
    if (url) {
      setIsLoading(false);
    }
  }, [url]);

  useEffect(() => {
    let interval;
    if (timeToggle) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000)
      return () => clearInterval(interval); 
    }
    if (!timeToggle) {
      return () => clearInterval(interval)
    }
  }, [time, timeToggle]);

  useLayoutEffect(() => {
    function handleResize() {
      setImgHeight(ref.current.offsetHeight);
      setImgWidth(ref.current.offsetWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => window.addEventListener('resize', handleResize);
  })

  // adjust magnifying glass's image to match mouse position more accurately
  function magnifyOffset(e) {
    const xScreen = e.pageX / imgWidth;
    const yScreen = ( e.pageY ) / ( imgHeight );
    if (xScreen < .5) {
      const offset = 50 - 50 * e.pageX / ( imgWidth / 2 );
      setPosXOffset(offset);
    }
    if (xScreen > .5) {
      const offset = -50 * ( e.pageX - ( imgWidth / 2 ) ) / ( imgWidth / 2 );
      setPosXOffset(offset);
    }
    if (yScreen < .5) {
      const offset = 50 - 50 * (e.pageY) / ( ( imgHeight ) / 2 );
      setPosYOffset(offset);
    }
    if (yScreen > .5) {
      const offset = -50 * ( (e.pageY) - ( ( imgHeight ) / 2 ) ) / ( imgHeight / 2 )
      setPosYOffset(offset);
    }
  }

  // hides magnifying element to find mouse position
  function mousePos(e) {
    setMagnifierDisp(false);
    // hides magnifier if cursor out of bounds
    if (e.pageY <= imgHeight) {
      setPosX(e.pageX);
      setPosY(e.pageY);
      magnifyOffset(e);
      setMagnifierDisp(true);
    }
  }

  // find the px value of width and height of image on load
  function findDimensions({ target: img }) {
    const { offsetHeight, offsetWidth } = img;
    setImgHeight(offsetHeight);
    setImgWidth(offsetWidth);
  }

  if (isLoading) {
    return <div className='loading'>Loading Image...</div>;

  } else {
    // after loading, display following scenarios based on states
    // show intro if user has not yet seen it
    if (!seenIntro) {
      return (
        <div className='relative'>
          <div
            alt='cursor with zoom'
            className='absolute'
            style={{display: 'none'}}
          />
          <img
            ref={ref}
            alt='Waldo map' 
            src={url}
            className='image-intro'
            onLoad={(e) => {
              setDisplayIntro(true);
              findDimensions(e);
            }}
          />
          <Intro 
            setSeenIntro={setSeenIntro}
            displayIntro={displayIntro}
            setTimeToggle={setTimeToggle}
          />
      </div>
      )
    }
    if (displayRank) {
      return (
        <div>
          <Rank rankId={rankId}/>
          <img
            ref={ref}
            alt='Waldo map' 
            src={url}
            className='image-selection absolute'
          />
        </div>
      )
    }
    // user found all objects. display Summary component
    if (waldoFound && wendaFound && wizardFound && odlawFound) {
      return (
        <div>
          <Summary 
            url={url}
            time={time}
            setTimeToggle={setTimeToggle}
            bgX={`calc( ${( posX / imgWidth ) * 100}% + ${ posXOffset }px )`}
            bgY={`calc( ${( posY / imgHeight ) * 100 }% + ${ posYOffset }px )`}
            summaryWaldoX={summaryWaldoX}
            summaryWaldoY={summaryWaldoY}
            summaryWendaX={summaryWendaX}
            summaryWendaY={summaryWendaY}
            summaryWizardX={summaryWizardX}
            summaryWizardY={summaryWizardY}
            summaryOdlawX={summaryOdlawX}
            summaryOdlawY={summaryOdlawY}
            waldoUrl={waldoUrl}
            wendaUrl={wendaUrl}
            wizardUrl={wizardUrl}
            odlawUrl={odlawUrl}
            setDisplayRank={setDisplayRank}
            setRankId={setRankId}
          />
          <img
          ref={ref}
          alt='Waldo map' 
          src={url}
          className='image-selection absolute'
          />
        </div>
      )
    }

    // if user clicks, display Selection component to choose their hidden object
    if (selectionDisplay) {
      return (
        <div>
          <Selection 
            top={posY}
            left={posX}
            imgWidth={imgWidth}
            imgHeight={imgHeight}
            coords={coords}
            bgUrl={`url( ${ url } )`}
            bgPosX={`calc( ${( posX / imgWidth ) * 100}% + ${ posXOffset }px )`}
            bgPosY={`calc( ${( posY / imgHeight ) * 100 }% + ${ posYOffset }px )`}
            setSelectionDisplay={setSelectionDisplay}
            time={time}
            setWaldoFound={setWaldoFound}
            setWendaFound={setWendaFound}
            setWizardFound={setWizardFound}
            setOdlawFound={setOdlawFound}
            waldoFound={waldoFound}
            wendaFound={wendaFound}
            wizardFound={wizardFound}
            odlawFound={odlawFound}
            setWaldoCircleDisp={setWaldoCircleDisp}
            setWendaCircleDisp={setWendaCircleDisp}
            setWizardCircleDisp={setWizardCircleDisp}
            setOdlawCircleDisp={setOdlawCircleDisp}
            setWaldoCircleCoordX={setWaldoCircleCoordX}
            setWaldoCircleCoordY={setWaldoCircleCoordY}
            setWendaCircleCoordX={setWendaCircleCoordX}
            setWendaCircleCoordY={setWendaCircleCoordY}
            setWizardCircleCoordX={setWizardCircleCoordX}
            setWizardCircleCoordY={setWizardCircleCoordY}
            setOdlawCircleCoordX={setOdlawCircleCoordX}
            setOdlawCircleCoordY={setOdlawCircleCoordY}
            setSummaryWaldoX={setSummaryWaldoX}
            setSummaryWaldoY={setSummaryWaldoY}
            setSummaryWendaX={setSummaryWendaX}
            setSummaryWendaY={setSummaryWendaY}
            setSummaryWizardX={setSummaryWizardX}
            setSummaryWizardY={setSummaryWizardY}
            setSummaryOdlawX={setSummaryOdlawX}
            setSummaryOdlawY={setSummaryOdlawY}
            waldoUrl={waldoUrl}
            wendaUrl={wendaUrl}
            wizardUrl={wizardUrl}
            odlawUrl={odlawUrl}
          />
          <img
            ref={ref}
            alt='Waldo map' 
            src={url}
            className='image-selection absolute'
            onClick={() => setSelectionDisplay(false)}
          />
        </div>
      );
    }

    // show magnifier to find hidden objects. follows mouse on movement
    if (magnifierDisp) {
      return (
        <div>
          <Circled 
            waldoCircleDisp={waldoCircleDisp}
            wendaCircleDisp={wendaCircleDisp}
            wizardCircleDisp={wizardCircleDisp}
            odlawCircleDisp={odlawCircleDisp}

            waldoCircleCoordX={waldoCircleCoordX}
            waldoCircleCoordY={waldoCircleCoordY}
            wendaCircleCoordX={wendaCircleCoordX}
            wendaCircleCoordY={wendaCircleCoordY}
            wizardCircleCoordX={wizardCircleCoordX}
            wizardCircleCoordY={wizardCircleCoordY}
            odlawCircleCoordX={odlawCircleCoordX}
            odlawCircleCoordY={odlawCircleCoordY}
          />
          <div
            alt='cursor with zoom'
            className='magnifier absolute center zoomed no-cursor'
            style={
              {
                top: posY, 
                left: posX, 
                backgroundImage: `url( ${ url } )`,
                backgroundPositionX: `calc( ${( posX / imgWidth ) * 100}% + ${ posXOffset }px )`,
                backgroundPositionY: `calc( ${( posY / imgHeight ) * 100 }% + ${ posYOffset }px )`,
              }
            }
            onMouseMove={e => mousePos(e)}
            onClick={() => setSelectionDisplay(true)}
          />
          <img
            ref={ref}
            alt='Waldo map' 
            src={url}
            className='image'
            onMouseMove={e => mousePos(e)}
          />
        </div>
      );
    }

    // initial screen with no mouse positioned on top
    return (
      <div>
        <div
          alt='cursor with zoom'
          className='absolute'
          style={{display: 'none'}}
        />
        <img
          ref={ref}
          alt='Waldo map' 
          src={url}
          className='image'
          onMouseMove={(e) => mousePos(e)}
        />
      </div>
    );

  }
}

export default Image;
