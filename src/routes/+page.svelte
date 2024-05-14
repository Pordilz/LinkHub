<script>
  // Importing userData from Firebase
  import { userData } from "$lib/firebase";
</script>

<!-- Setting the title and description for the page -->
<svelte:head>
  <title>Link.hub - a place for links</title>
  <meta name="description" content="Demo project for Java and Web Development" />
</svelte:head>

<!-- Main container with flex layout -->
<main class="flex w-full min-h-screen">

  <!-- Hero section with background -->
  <div class="hero bg-base-200">
      <div class="hero-content text-center">
          <div class="w-full">
              <!-- Main heading -->
              <h1 class="text-7xl font-bold">Link.hub</h1>
              <!-- Subheading -->
              <p class="py-6 text-2xl">One link to share your entire portfolio</p>
              <!-- Conditional rendering based on user authentication -->
              {#if $userData?.username}
                  <!-- If user is authenticated, show Edit Profile button -->
                  <a href="/{$userData.username}/edit" class="btn btn-primary">Edit Profile</a>
              {:else}
                  <!-- If user is not authenticated, show Get Started button -->
                  <a href="/login" class="btn btn-primary">Get Started</a>
              {/if}
          </div>
      </div>
  </div>

</main>
  
  