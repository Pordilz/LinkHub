<script lang="ts">
  // Importing types for page data
  import type { PageData } from "./$types";
  // Importing the page store from Svelte's application stores
  import { page } from '$app/stores';
  // Importing a form enhancement function
  import { enhance } from "$app/forms";

  // Exporting the data variable for page data
  export let data: PageData;
</script>

<!-- Main content section -->
<main class="max-w-lg prose text-center mx-auto my-6">
  <!-- Displaying current bio -->
  <p>Current Bio: <span class="text-info">{data.bio}</span></p>
  <!-- Displaying status code -->
  <p>Status Code: {$page.status}</p>
  <!-- Displaying form submission error, if any -->
  <p class="text-error">{$page.form?.problem ?? ''}</p>

  <!-- Form for updating bio -->
  <form method="POST" use:enhance>
    <div class="form-control">
      <!-- Label for bio input -->
      <label for="bio" class="label">
        <span class="label-text">Your bio</span>
      </label>
      <!-- Text area for entering bio, pre-filled with current bio -->
      <textarea
        name="bio"
        class="textarea textarea-bordered textarea-accent"
        value={data.bio}
      />
    </div>
    <!-- Button to submit form -->
    <button class="btn btn-primary my-5">Update Bio</button>
  </form>
</main>
  