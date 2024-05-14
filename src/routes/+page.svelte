<script>
    import { userData } from "$lib/firebase";

  </script>
  
  <svelte:head>
    <title>Link.hub - a place for links</title>
    <meta name="description" content="Demo project for Java and Web Devlopment" />
  </svelte:head>
  
  <main class="flex w-full min-h-screen">
  
    <div class="hero bg-base-200">
      <div class="hero-content text-center">
        <div class="w-full">
          <h1 class="text-7xl font-bold">Link.hub</h1>
          <p class="py-6 text-2xl">One link to share your entire portfolio</p>
          {#if $userData?.username}
            <a href="/{$userData.username}/edit" class="btn btn-primary">Edit Profile</a>
          {:else}
            <a href="/login" class="btn btn-primary">Get Started</a>
          {/if}
        </div>
      </div>
    </div>
    
  </main>
  
  