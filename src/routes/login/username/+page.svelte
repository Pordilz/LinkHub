<script lang="ts">
  // Importing necessary components and Firebase functionalities
  import AuthCheck from "$lib/components/AuthCheck.svelte";
  import { db, user, userData } from "$lib/firebase";
  import { doc, getDoc, writeBatch } from "firebase/firestore";

  // Declaring variables and reactive statements
  let username = ""; // Holds the input username
  let loading = false; // Indicates whether a username availability check is in progress
  let isAvailable = false; // Indicates whether the username is available
  let debounceTimer: NodeJS.Timeout; // Timer for debouncing input

  // Regular expression for validating usernames
  const re = /^(?=[a-zA-Z0-9._]{3,16}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

  // Reactive statements to determine username validity and touched state
  $: isValid = username?.length > 2 && username.length < 16 && re.test(username);
  $: isTouched = username.length > 0;
  $: isTaken = isValid && !isAvailable && !loading;

  // Function to check the availability of the entered username
  function checkAvailability() {
    isAvailable = false;
    clearTimeout(debounceTimer);
    if (!isValid) {
      loading = false;
      return;
    }

    loading = true;

    debounceTimer = setTimeout(async () => {
      console.log("checking availability of", username);

      const ref = doc(db, "usernames", username);
      const exists = await getDoc(ref).then((doc) => doc.exists());

      isAvailable = !exists;
      loading = false;
    }, 500);
  }

  // Function to confirm and set the username
  async function confirmUsername() {
    console.log("confirming username", username);
    const batch = writeBatch(db);
    batch.set(doc(db, "usernames", username), { uid: $user?.uid });
    batch.set(doc(db, "users", $user!.uid), {
      username,
      photoURL: $user?.photoURL ?? null,
      published: true,
      bio: "I am Massive",
      links: [
        {
          title: "Test Link",
          url: "https://pordilz.github.io/Helldivers-landing-page/",
          icon: "custom",
        },
      ],
    });

    await batch.commit();

    username = ""; // Reset the input field after username confirmation
    isAvailable = false; // Reset username availability flag
  }
</script>

<AuthCheck>
  {#if $userData?.username}
    <!-- Display the current username if it exists -->
    <p class="text-lg">
      Your username is <span class="text-success font-bold">@{$userData.username}</span>
    </p>
    <p class="text-sm">(Usernames cannot be changed)</p>
    <a class="btn btn-primary" href="/login/photo">Upload Profile Image</a>
  {:else}
    <!-- Form for selecting and confirming a new username -->
    <form class="w-2/5" on:submit|preventDefault={confirmUsername}>
      <input
        type="text"
        placeholder="Username"
        class="input w-full"
        bind:value={username}
        on:input={checkAvailability}
        class:input-error={!isValid && isTouched} 
        class:input-warning={isTaken} 
        class:input-success={isAvailable && isValid && !loading} 
      />
      <div class="my-4 min-h-16 px-8 w-full">
        {#if loading}
          <!-- Display loading message while checking availability -->
          <p class="text-secondary">Checking availability of @{username}...</p>
        {/if}

        {#if !isValid && isTouched}
          <!-- Display error message if username is invalid -->
          <p class="text-error text-sm">Must be 3-16 characters long, alphanumeric only</p>
        {/if}

        {#if isValid && !isAvailable && !loading}
          <!-- Display warning message if username is taken -->
          <p class="text-warning text-sm">@{username} is not available</p>
        {/if}

        {#if isAvailable}
          <!-- Display button to confirm username if it is available -->
          <button class="btn btn-success">Confirm username @{username} </button>
        {/if}
      </div>
    </form>
  {/if}
</AuthCheck>

