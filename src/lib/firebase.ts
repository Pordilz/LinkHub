import { initializeApp } from "firebase/app"; // Importing Firebase app initialization function
import { doc, getFirestore, onSnapshot } from "firebase/firestore"; // Importing Firestore functions
import { getAuth, onAuthStateChanged, type User } from "firebase/auth"; // Importing Authentication functions
import { getStorage } from "firebase/storage"; // Importing Storage function
import { writable, type Readable, derived } from "svelte/store"; // Importing Svelte store functions

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyAeztJv-z3S5N8nl4boPslmeCkQ6zPuyu8",
  authDomain: "linkhub-4b05e.firebaseapp.com",
  projectId: "linkhub-4b05e",
  storageBucket: "linkhub-4b05e.appspot.com",
  messagingSenderId: "574427857233",
  appId: "1:574427857233:web:0cbaa026e0e174d9f3d370",
  measurementId: "G-BREP56GPR7"
};

// Initialize Firebase app
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(); // Firestore instance
export const auth = getAuth(); // Authentication instance
export const storage = getStorage(); // Storage instance

/**
 * @returns a store with the current firebase user
 */
function userStore() {
  let unsubscribe: () => void;

  // Checking if auth or window are not initialized
  if (!auth || !globalThis.window) {
    console.warn('Auth is not initialized or not in browser');
    const { subscribe } = writable<User | null>(null); // Creating a basic writable store
    return {
      subscribe,
    }
  }

  // Creating a writable store for the current user
  const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
    unsubscribe = onAuthStateChanged(auth, (user) => {
      set(user);
    });

    return () => unsubscribe();
  });

  return {
    subscribe,
  };
}

export const user = userStore(); // Exporting user store

/**
 * @param  {string} path document path or reference
 * @returns a store with realtime updates on document data
 */
export function docStore<T>(
  path: string,
) {
  let unsubscribe: () => void;

  const docRef = doc(db, path); // Firestore document reference

  const { subscribe } = writable<T | null>(null, (set) => {
    unsubscribe = onSnapshot(docRef, (snapshot) => {
      set((snapshot.data() as T) ?? null); // Updating store with document data
    });

    return () => unsubscribe();
  });

  return {
    subscribe,
    ref: docRef,
    id: docRef.id,
  };
}

// Interface for user data
interface UserData {
  username: string;
  bio: string;
  photoURL: string;
  published: boolean;
  links: any[];
}

// Derived store for user data based on the current user
export const userData: Readable<UserData | null> = derived(user, ($user, set) => { 
  if ($user) {
    return docStore<UserData>(`users/${$user.uid}`).subscribe(set); // Subscribing to user document
  } else {
    set(null); // Setting user data to null if no user is authenticated
  }
});