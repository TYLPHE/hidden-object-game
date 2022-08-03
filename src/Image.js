import { getValue } from '@testing-library/user-event/dist/utils/index.js';
import { initializeApp } from 'firebase/app';
import { getDownloadURL, ref, getStorage } from 'firebase/storage';
import { useEffect, useState } from 'react';
import './styles/Image.css'

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

  // size of the magnifying glass in px units
  const magSize = 100;

  useEffect(() => {
    getUrl();
  }, []);

  async function getUrl() {
    const firebaseConfig = {
      apiKey: "AIzaSyBe9KEI1KB8225x7aMvCoRY0MmGIaR6suM",
      authDomain: "hidden-object-game-c2e92.firebaseapp.com",
      projectId: "hidden-object-game-c2e92",
      storageBucket: "hidden-object-game-c2e92.appspot.com",
      messagingSenderId: "760584207608",
      appId: "1:760584207608:web:82e22f6801eb55af46cf0d"
    }
    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app)
    const url = await getDownloadURL(ref(storage, 'images/waldo1.jpg'));
    setLoading(false)
    return setUrl(url);
  }

  function XYPos(e) {
    setMagDisp(false);
    const xScreen = e.pageX/windowWidth;
    const yScreen = e.pageY/windowHeight;
    if (xScreen < .5) {
      setPosXOffset( 50 - 50 * e.pageX / ( windowWidth / 2 ) )
    }
    if (xScreen > .5) {
      setPosXOffset( -50 * ( e.pageX - ( windowWidth / 2 ) ) / ( windowWidth / 2 ) )
    }
    if (yScreen < .5) {
      setPosYOffset( 50 - 50 * e.pageY / ( windowHeight / 2 ) )
    }
    if (yScreen > .5) {
      setPosYOffset( -50 * ( e.pageY - ( windowHeight / 2 ) ) / ( windowHeight / 2 ) )
    }
    setPosX(e.pageX);
    setPosY(e.pageY);
    setMagDisp(true);
    // console.log(`x: ${( posX/windowWidth ) * 100}%`, `y: ${( posY/windowHeight ) * 100}%`)
    console.log(posX, posY, posXOffset, posYOffset)
  }

  function onImgLoad({ target: img }) {
    const { offsetHeight, offsetWidth } = img;
    setWindowHeight(offsetHeight);
    setWindowWidth(offsetWidth);
    console.log(offsetWidth, offsetHeight)
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
                // backgroundPositionX: `calc( ${( posX/windowWidth ) * 100}%)`,
                // backgroundPositionY: `calc( ${( posY/windowHeight ) * 100 }%)`
              }
            }
            onMouseMove={e => XYPos(e)}
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
