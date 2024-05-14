// This script handles authentication by verifying the session cookie using `adminAuth.verifySessionCookie()`.
// If the verification is successful, it extracts the user ID from the decoded claims and sets it in `event.locals.userID`.
// If the verification fails, it sets `event.locals.userID` to null.
// Finally, it resolves the event.

import { adminAuth } from "$lib/server/admin";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  // Retrieve the session cookie from the incoming request
  const sessionCookie = event.cookies.get("__session");

  try {
    // Verify the session cookie and decode its claims
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie!);
    // Set the user ID extracted from the claims into the event locals
    event.locals.userID = decodedClaims.uid;
    console.log("found user id", decodedClaims.uid);
  } catch (e) {
    // If verification fails, set user ID to null
    event.locals.userID = null;
    // Resolve the event
    return resolve(event);
  }

  // Resolve the event
  return resolve(event);
};
