<script lang="ts">
  // Importing the 'user' object from Firebase library
  import { user } from "$lib/firebase";
</script>

{#if $user}
  <!-- If user is present, render the content inside the slot -->
  <slot />
{:else}
  <!-- If user is not present, display an error message and a sign-in link -->
  <p class="text-error my-10">
      You must be signed in to view this page.
      <!-- Link to the sign-in page -->
      <a class="btn btn-primary" href="/login">Sign in</a>
  </p>
{/if}