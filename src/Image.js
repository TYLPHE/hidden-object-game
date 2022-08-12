import { useEffect, useState } from 'react';
import helper from './helper';
import './styles/Image.css';

// pull data from Firebase and populate coords object
const coords = {
  waldo: {},
  wenda: {},
  wizard: {},
}
helper.getSolutions(coords)

function Image() {
  const [url, setUrl] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [posX, setPosX] = useState(null);
  const [posY, setPosY] = useState(null);
  const [posXOffset, setPosXOffset] = useState(0);
  const [posYOffset, setPosYOffset] = useState(0);
  const [windowWidth, setWindowWidth] = useState(null);
  const [windowHeight, setWindowHeight] = useState(null);
  const [magDisp, setMagDisp] = useState(false);

  useEffect(() => {
    helper.getUrl(setUrl, setLoading)
  }, []);

  // adjust magnifying glass image to match mouse position more accurately
  function magnifyOffset(e) {
    const xScreen = e.pageX/windowWidth;
    const yScreen = e.pageY/windowHeight;
    if (xScreen < .5) {
      const offset = 50 - 50 * e.pageX / ( windowWidth / 2 );
      setPosXOffset(offset);
    }
    if (xScreen > .5) {
      const offset = -50 * ( e.pageX - ( windowWidth / 2 ) ) / ( windowWidth / 2 );
      setPosXOffset(offset);
    }
    if (yScreen < .5) {
      const offset = 50 - 50 * e.pageY / ( windowHeight / 2 );
      setPosYOffset(offset);
    }
    if (yScreen > .5) {
      const offset = -50 * ( e.pageY - ( windowHeight / 2 ) ) / ( windowHeight / 2 )
      setPosYOffset(offset);
    }
  }

  // hides magnifying element to find mouse position
  function mousePos(e) {
    setMagDisp(false);
    
    // hides magnifier if cursor out of bounds
    if (e.pageY <= windowHeight) {
      setPosX(e.pageX);
      setPosY(e.pageY);
      setMagDisp(true);
    }
  }

  // find the px value of width and height of image on load
  function findDimensions({ target: img }) {
    const { offsetHeight, offsetWidth } = img;
    setWindowHeight(offsetHeight);
    setWindowWidth(offsetWidth);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    if (magDisp) {
      return (
        <div>
          <div
            alt='cursor with zoom'
            className='absolute center zoomed'
            style={
              {
                top: posY, 
                left: posX, 
                backgroundImage: `url( ${ url } )`,
                backgroundPositionX: `calc( ${( posX/windowWidth ) * 100}% + ${ posXOffset }px )`,
                backgroundPositionY: `calc( ${( posY/windowHeight ) * 100 }% + ${ posYOffset }px )`
              }
            }
            onMouseMove={e => mousePos(e)}
            onClick={() => console.log(helper.checkWin(posX, posY, windowWidth, windowHeight, coords))}
          />
          <img 
            alt='waldo' 
            src={url}
            className='image'
            onMouseMove={
              e => {
                mousePos(e);
                magnifyOffset(e);
              }
            }
            />
        </div>
      );
    }
    return (
      <div>
        <div
          alt='cursor with zoom'
          className='absolute'
          style={{display: 'none'}}
        />
        <img 
          alt='waldo' 
          src={url}
          className='image'
          onMouseMove={() => setMagDisp(true)}
          onLoad={findDimensions}
        />
      </div>
    );

  }
}

export default Image;
