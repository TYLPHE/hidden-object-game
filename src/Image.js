import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import helper from './helper';
import Intro from './Intro';
import Selection from './Selection';
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
  const [url, setUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [posX, setPosX] = useState(null);
  const [posY, setPosY] = useState(null);
  const [posXOffset, setPosXOffset] = useState(0);
  const [posYOffset, setPosYOffset] = useState(0);
  const [imgWidth, setImgWidth] = useState(null);
  const [imgHeight, setImgHeight] = useState(null);
  const [magnifierDisp, setMagnifierDisp] = useState(false);
  const [seenIntro, setSeenIntro] = useState(false);
  const [displayIntro, setDisplayIntro] = useState(false);
  const [selectionDisplay, setSelectionDisplay] = useState(false);


  useEffect(() => {
    async function fetchData() {
      setUrl(await helper.getUrl('images/waldo1.jpg'));
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (url) {
      setIsLoading(false);
    }
  }, [url]);

  const ref = useRef(null);
  useLayoutEffect(() => {
    function handleResize() {
      console.log('resized', ref.current.offsetWidth, ref.current.offsetHeight)
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
    console.log('finddimensions: ', offsetWidth, offsetHeight)
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
            bgUrl={`url( ${ url } )`}
            bgPosX={`calc( ${( posX / imgWidth ) * 100}% + ${ posXOffset }px )`}
            bgPosY={`calc( ${( posY / imgHeight ) * 100 }% + ${ posYOffset }px )`}
            setSelectionDisplay={setSelectionDisplay}
          />
          <img
            ref={ref}
            alt='Waldo map' 
            src={url}
            className='image-selection absolute'
          />
        </div>
      );
    }

    // show magnifier to find hidden objects. follows mouse on movement
    if (magnifierDisp) {
      return (
        <div>
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
            onClick={() => {
              console.log(helper.checkWin(posX, posY, imgWidth, imgHeight, coords));
              setSelectionDisplay(true)
            }}
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
