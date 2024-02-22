import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBBfuu1upNu7UXWnqEKkIQgqhfRatz6u8E",
    authDomain: "capstone-project-f3303.firebaseapp.com",
    projectId: "capstone-project-f3303",
    storageBucket: "capstone-project-f3303.appspot.com",
    messagingSenderId: "420452433968",
    appId: "1:420452433968:web:8670e65269c3ea024badf5"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot.exists());

    //check if the user exists in the db; create docref if not
    if(!userSnapshot.exists())
    {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {displayName, email, createdAt});
        } catch (err) {
            console.log('error creating the user', err.message);
        }
    }

    return userDocRef;
  }