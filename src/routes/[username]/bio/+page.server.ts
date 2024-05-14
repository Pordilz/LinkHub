import type { PageServerLoad, Actions } from "./$types"; // Importing types for server loading and actions
import { adminDB } from "$lib/server/admin"; // Importing Firebase Admin connections
import { error, fail, redirect } from "@sveltejs/kit"; // Importing error handling functions

// Server-side loading function
export const load = (async ({ locals, params }) => {

    const uid = locals.userID; // Getting the user ID from locals

    if (!uid) {
      throw redirect(301, "/login"); // Redirecting to login page if user is not authenticated
    }
  
    const userDoc = await adminDB.collection("users").doc(uid!).get(); // Getting user document from Firestore
    const { username, bio } = userDoc.data()!; // Extracting username and bio from user document
  
    if (params.username !== username) {
      throw error(401, "That username does not belong to you"); // Handling unauthorized access
    }
  
    return {
      bio,
    };
}) satisfies PageServerLoad; // Ensuring the load function satisfies the PageServerLoad type

// Actions to handle form submission
export const actions = {
    default: async ({ locals, request, params }) => {

      const uid = locals.userID; // Getting the user ID from locals

      const data = await request.formData(); // Parsing form data
      const bio = data.get('bio'); // Extracting bio from form data
  
      const userRef = adminDB.collection("users").doc(uid!); // Getting user document reference
      const { username } = (await userRef.get()).data()!; // Getting username from user document
  
      if (params.username !== username) {
        throw error(401, "That username does not belong to you"); // Handling unauthorized access
      }
      
      // Validating bio length
      if (typeof bio === "string") {
        if (bio!.length > 260) {
          return fail(400, { problem: "Bio must be less than 260 characters" }); // Failing if bio length exceeds limit
        }
      }
  
      // Updating user document with new bio
      await userRef.update({
        bio,
      });
    },
  } satisfies Actions; // Ensuring actions satisfy the Actions type