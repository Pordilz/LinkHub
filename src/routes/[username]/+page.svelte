<script lang="ts">
  // Importing the UserLink component and the PageData type
  import UserLink from "$lib/components/UserLink.svelte";
  import type { PageData } from "./$types";

  // Exporting the 'data' variable of type PageData
  export let data: PageData;
</script>

<svelte:head>
  <!-- Setting the title of the page to the username -->
  <title>@{data.username} Links</title>
  <!-- Setting the meta description to the user's bio -->
  <meta name="description" content={data.bio} />
</svelte:head>

<main class="prose text-center mx-auto mt-8">
  <!-- Displaying the username -->
  <h1 class="text-7xl text-purple-500">
    @{data.username}
  </h1>

  <!-- Displaying the user's photo or a default image if not available -->
  <img
    src={data.photoURL ?? "/user.png"}
    alt="photoURL"
    width="256"
    class="mx-auto"
  />

  <!-- Displaying the user's bio or a default message if not available -->
  <p class="text-xl my-8">{data.bio ?? "no bio yet..."}</p>

  <!-- Displaying a list of user links using the UserLink component -->
  <ul class="list-none">
    {#each data.links as item}
      <li class="my-2">
        <UserLink {...item} />
      </li>
    {/each}
  </ul>
</main>
  