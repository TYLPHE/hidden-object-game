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
  checkWin: (x, y, width, height, coords) => {
    const xValue = x/width;
    const yValue = y/height;
    let result = 'no match'
    console.log(xValue, yValue)
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

  // gets image from firebase. setUrl and setLoading in Image.js
  getUrl: async (setUrl, setLoading) => {
    const storage = getStorage(helper.app());
    const url = await getDownloadURL(ref(storage, 'images/waldo1.jpg'));
    setLoading(false);
    return setUrl(url);
  },
}

export default helper;
