import { initializeApp } from "firebase/app";
import { getDoc, getFirestore, doc } from "firebase/firestore";
import { getDownloadURL, ref, getStorage } from "firebase/storage";

const helper = {
  app: () => {
    const firebaseConfig = {
      apiKey: "AIzaSyBe9KEI1KB8225x7aMvCoRY0MmGIaR6suM",
      authDomain: "hidden-object-game-c2e92.firebaseapp.com",
      projectId: "hidden-object-game-c2e92",
      storageBucket: "hidden-object-game-c2e92.appspot.com",
      messagingSenderId: "760584207608",
      appId: "1:760584207608:web:82e22f6801eb55af46cf0d"
    }
    return initializeApp(firebaseConfig);
  },

  // input mouse (x, y), img (x, y), coords to find hidden object
  checkFound: (x, y, width, height, coords) => {
    const xValue = x/width;
    const yValue = y/height;
    let result = 'no match'
    for (let key in coords) {
      if (
        xValue > coords[key].xMin &&
        xValue < coords[key].xMax &&
        yValue > coords[key].yMin &&
        yValue < coords[key].yMax
      ) {
        result = key
      }
    }

    return result;
  },

  // convert seconds to hh-mm-ss format
  convertSeconds(time) {
    const converted = new Date(time * 1000).toISOString().substring(11, 19);
    if (converted[0] === '0' && converted[1] === '0') {
      return converted.substring(3, 8);
    }
    return converted;
  },

  // get positions of all characters
  // input object with keys of character names in firebase database
  getSolutions: async (coords) => {
    const db = getFirestore(helper.app());
    
    for (let key in coords) {
      const docRef = doc(db, 'solutions', key);
      const docSnap = await getDoc(docRef);
      coords[key] = docSnap.data();
    }
  },

  // return a url from Firebase Storage
  getUrl: async (location) => {
    const storage = getStorage(helper.app());
    const url = await getDownloadURL(ref(storage, location));
    return url;
  },
}

export default helper;
