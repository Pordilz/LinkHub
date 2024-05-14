<script>
  // Importing the 'fly' transition from Svelte's transition module
  import { fly } from "svelte/transition";
  // Importing the 'page' store from Svelte's application stores
  import { page } from "$app/stores";
</script>

{#key $page.url}
<!-- Keying the transition to the current page URL -->
<!-- Defining a transition effect using 'fly', which slides in from the left with a duration of 500ms -->
<div in:fly={{ x: '-100%', duration: 500 }}>
  <!-- Rendering the content of the slot within the transition -->
  <slot />
</div>
{/key}