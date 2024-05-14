<script lang="ts">
  // Importing necessary components and stores
  import { page } from "$app/stores";
  import AnimatedRoute from "$lib/components/AnimatedRoute.svelte";
  import AuthCheck from "$lib/components/AuthCheck.svelte";
</script>

<!-- Navigation bar with steps -->
<nav class="flex justify-center my-6">
  <ul class="steps">
    <!-- Step 1: Sign In -->
    <a href="/login" class="step step-primary">Sign In</a>
    <!-- Step 2: Choose Username -->
    <a
      href="/login/username"
      class="step"
      class:step-primary={$page.route.id?.match(/username|photo/g)}>
      Choose Username
    </a>
    <!-- Step 3: Upload Photo -->
    <a
      href="/login/photo"
      class="step"
      class:step-primary={$page.route.id?.includes("photo")}>
      Upload Photo
    </a>
  </ul>
</nav>

<!-- Animated route for transitions -->
<AnimatedRoute>
  <!-- Main content container with card style -->
  <main class="card w-4/6 bg-neutral text-neutral-content mx-auto">
    <div class="card-body items-center text-center">
      <!-- Slot for displaying content dynamically -->
      <slot />
    </div>
  </main>
</AnimatedRoute>
