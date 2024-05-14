import { getAuth } from 'firebase-admin/auth'; // Importing Firebase Authentication module
import { getFirestore } from 'firebase-admin/firestore'; // Importing Firebase Firestore module
import { FB_CLIENT_EMAIL, FB_PRIVATE_KEY, FB_PROJECT_ID } from '$env/static/private'; // Importing environment variables for Firebase credentials
import pkg from 'firebase-admin'; // Importing the Firebase Admin SDK package

try {
  // Initializing Firebase Admin SDK with provided credentials
  pkg.initializeApp({
    credential: pkg.credential.cert({
      projectId: FB_PROJECT_ID,
      clientEmail: FB_CLIENT_EMAIL,
      privateKey: FB_PRIVATE_KEY,
    }),
  });
} catch (err: any) {
  // Handling initialization errors
  if (!/already exists/u.test(err.message)) {
    console.error('Firebase Admin Error: ', err.stack);
  }
}

// Exporting Firestore and Authentication instances
export const adminDB = getFirestore(); // Firestore instance
export const adminAuth = getAuth(); // Authentication instance