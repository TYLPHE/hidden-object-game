import { initializeApp } from 'firebase/app';
import { getDownloadURL, ref, getStorage } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';
import './styles/Image.css';
import { getDatabase } from 'firebase/database'

const coords = {
  waldo: {},
  wenda: {},
  wizard: {},
}

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

  async function getWaldoPos() {
    //testing reading of database
    const firebaseConfig = {
      apiKey: "AIzaSyBe9KEI1KB8225x7aMvCoRY0MmGIaR6suM",
      authDomain: "hidden-object-game-c2e92.firebaseapp.com",
      projectId: "hidden-object-game-c2e92",
      storageBucket: "hidden-object-game-c2e92.appspot.com",
      messagingSenderId: "760584207608",
      appId: "1:760584207608:web:82e22f6801eb55af46cf0d"
    }
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    for (let key in coords) {
      const docRef = doc(db, 'solutions', key);
      const docSnap = await getDoc(docRef);
      coords[key] = docSnap.data();
    }
  }

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
    const { offsetHeight, offsetWidth } = img;
    setWindowHeight(offsetHeight);
    setWindowWidth(offsetWidth);
  }

  async function checkPos() {
    await getWaldoPos();
    const xClickPos = posX/windowWidth;
    const yClickPos = posY/windowHeight;

    for (let key in coords) {
      if (
        xClickPos > coords[key].xMin &&
        xClickPos < coords[key].xMax &&
        yClickPos > coords[key].yMin &&
        yClickPos < coords[key].yMax
      ) {
        return console.log(`${key} found`);
      }
    }
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
