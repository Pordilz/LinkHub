<script lang="ts">
  // Importing necessary Firebase authentication components and functions
  import { auth, user } from "$lib/firebase";
  import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

  // Function to sign in with Google
  async function signInWithGoogle() {
    // Creating Google authentication provider
    const provider = new GoogleAuthProvider();
    // Signing in with Google popup
    const credential = await signInWithPopup(auth, provider);
    // Getting user ID token
    const idToken = await credential.user.getIdToken();
    // Sending ID token to the server for authentication
    const res = await fetch("/api/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'CSRF-Token': csrfToken  // HANDLED by sveltekit automatically
      },
      body: JSON.stringify({ idToken }),
    });
  }

  // Function to sign out on server-side rendering
  async function signOutSSR() {
    // Sending request to server to sign out
    const res = await fetch("/api/signin", { method: "DELETE" });
    // Signing out the user from Firebase authentication
    await signOut(auth);
  }
</script>





<h2>Login</h2>

{#if $user}
  <h2 class="card-title">Welcome, {$user.displayName}</h2>
  <p class="text-center text-success">You are logged in</p>
  <button class="btn btn-warning" on:click={signOutSSR}
    >Sign out</button
  >
{:else}
  <button class="btn btn-primary" on:click={signInWithGoogle}
    >Sign in with Google</button
  >
{/if}
