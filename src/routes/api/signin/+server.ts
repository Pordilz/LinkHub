import { adminAuth } from '$lib/server/admin'; // Importing adminAuth for Firebase authentication
import { error, json } from '@sveltejs/kit'; // Importing error and json functions from SvelteKit
import type { RequestHandler } from './$types'; // Importing RequestHandler type from $types

// POST request handler for signing in
export const POST: RequestHandler = async ({ request, cookies }) => {
    // Extracting idToken from the request body
    const { idToken } = await request.json();

    // Setting the expiration time for the session cookie (5 days)
    const expiresIn = 60 * 60 * 24 * 5 * 1000; 

    // Verifying the idToken to ensure it's valid
    const decodedIdToken = await adminAuth.verifyIdToken(idToken);

    // Checking if the user recently signed in (within the last 5 minutes)
    if (new Date().getTime() / 1000 - decodedIdToken.auth_time < 5 * 60) {
        // Creating a session cookie with the idToken
        const cookie = await adminAuth.createSessionCookie(idToken, { expiresIn });

        // Setting options for the session cookie
        const options = { maxAge: expiresIn, httpOnly: true, secure: true, path: '/' };

        // Setting the session cookie in the response
        cookies.set('__session', cookie, options);

        // Returning a JSON response indicating successful sign-in
        return json({ status: 'signedIn' });
    } else {
        // Throwing an error if recent sign-in is required
        throw error(401, 'Recent sign in required!');
    }
};

// DELETE request handler for signing out
export const DELETE: RequestHandler = async ({ cookies }) => {
    // Deleting the session cookie
    cookies.delete('__session', { path: '/' });
    
    // Returning a JSON response indicating successful sign-out
    return json({ status: 'signedOut' });
};
