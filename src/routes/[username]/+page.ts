import { collection, getDocs, limit, query, where } from "firebase/firestore";
import type { PageLoad } from "./$types";
import { db } from "$lib/firebase";
import { error } from "@sveltejs/kit";

// Defining the load function to fetch user data
export const load = (async ({ params }) => {
  // Reference to the 'users' collection in Firestore
  const collectionRef = collection(db, "users");

  // Creating a query to find a user with the specified username
  const q = query(
    collectionRef,
    where("username", "==", params.username),
    limit(1)
  );

  // Fetching the documents that match the query
  const snapshot = await getDocs(q);

  // Checking if a user with the specified username exists
  const exists = snapshot.docs[0]?.exists();

  // Retrieving the user data if it exists
  const data = snapshot.docs[0]?.data();

  // Handling errors if the user does not exist or if their profile is not public
  if (!exists) {
    throw error(404, "That user does not exist!");
  }

  if (!data.published) {
    throw error(403, `The profile of @${data.username} is not public!`);
  }

  // Returning the user data
  return {
    username: data.username,
    photoURL: data.photoURL,
    bio: data.bio,
    links: data.links ?? [], // Defaulting to an empty array if links are not available
  };
}) satisfies PageLoad; // Specifying that the load function satisfies the PageLoad interface
