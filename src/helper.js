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

  // gets image from firebase
  getUrl: async (setUrl, setLoading) => {
    const storage = getStorage(helper.app());
    const url = await getDownloadURL(ref(storage, 'images/waldo1.jpg'));
    setLoading(false);
    return setUrl(url);
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

    console.log('helper.getSolutions()')
  },
}

export default helper;
