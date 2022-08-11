import { useEffect, useState } from 'react';
import helper from './helper';
import './styles/Image.css';

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

  function XYPos(e) {
    setMagDisp(false);
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
    setPosX(e.pageX);
    setPosY(e.pageY);

    // adjusted value for database
    // console.log(posXAdjusted, posYAdjusted)
    setMagDisp(true);
  }

  function onImgLoad({ target: img }) {
    console.log(img);
    const { offsetHeight, offsetWidth } = img;
    setWindowHeight(offsetHeight);
    setWindowWidth(offsetWidth);
  }

  function checkPos() {
    const xClickPos = posX/windowWidth;
    const yClickPos = posY/windowHeight;
    let result = 'no match';

    for (let key in coords) {
      if (
        xClickPos > coords[key].xMin &&
        xClickPos < coords[key].xMax &&
        yClickPos > coords[key].yMin &&
        yClickPos < coords[key].yMax
      ) {
        result = key;
      }
    }
    return console.log(result);
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
            onMouseMove={e => XYPos(e)}
            onClick={() => checkPos()}
          />
          <img 
            alt='waldo' 
            src={url}
            className='image'
            onMouseMove={e => XYPos(e)}
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
        >
          magnifying
        </div>
        <img 
          alt='waldo' 
          src={url}
          className='image'
          onMouseMove={e => XYPos(e)}
          onLoad={onImgLoad}
        />
      </div>
    );

  }
}

export default Image;
