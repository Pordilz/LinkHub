<script lang="ts">
  // Importing Svelte stores and functions
  import { page } from "$app/stores";
  import AuthCheck from "$lib/components/AuthCheck.svelte";
  import SortableList from "$lib/components/SortableList.svelte";
  import UserLink from "$lib/components/UserLink.svelte";
  import { db, userData, user } from "$lib/firebase";
  import {
    arrayRemove,
    arrayUnion,
    doc,
    setDoc,
    updateDoc,
  } from "firebase/firestore";
  import { writable } from "svelte/store";

  //Array of icon options for links
  const icons = [
    "Twitter",
    "YouTube",
    "TikTok",
    "LinkedIn",
    "GitHub",
    "Custom",
  ];

  //Default values for form data
  const formDefaults = {
    icon: "custom",
    title: "",
    url: "https://",
  };
  //Writable store for form data
  const formData = writable(formDefaults);

  let showForm = false;
   
  //Computed properties to validate form data
  $: urlIsValid = $formData.url.match(/^(ftp|http|https):\/\/[^ "]+$/);
  $: titleIsValid = $formData.title.length < 20 && $formData.title.length > 0;
  $: formIsValid = urlIsValid && titleIsValid;

  //Function to handle sorting of links
  function sortList(e: CustomEvent) {
    const newList = e.detail;
    const userRef = doc(db, "users", $user!.uid);
    setDoc(userRef, { links: newList }, { merge: true });
  }

  //Function to add a new link
  async function addLink(e: SubmitEvent) {
    const userRef = doc(db, "users", $user!.uid);

    await updateDoc(userRef, {
      links: arrayUnion({
        ...$formData,
        id: Date.now().toString(),
      }),
    });

    formData.set({
      icon: "",
      title: "",
      url: "",
    });

    showForm = false;
  }

  //Function to delete a link
  async function deleteLink(item: any) {
    const userRef = doc(db, "users", $user!.uid);
    await updateDoc(userRef, {
      links: arrayRemove(item),
    });
  }

  //Function to toggle profile visibility
  async function toggleProfileStatus(item: any) {
    const userRef = doc(db, "users", $user!.uid);
    await updateDoc(userRef, {
      published: !$userData?.published,
    });
  }

  //Function to cancel link addition
  function cancelLink() {
    formData.set(formDefaults);
    showForm = false;
  }

</script>

<main class="max-w-xl mx-auto">
  {#if $userData?.username == $page.params.username}
    <!-- Header: Edit your Profile -->
    <h1 class="mx-2 text-2xl font-bold mt-8 mb-4 text-center">
      Edit your Profile
    </h1>

    <!-- Displaying profile link -->
    <div class="text-center mb-8">
      <p>
        Profile Link:
        <a
          href={`/${$userData?.username}`}
          class="link link-accent"
        >
          https://link.hub/{$userData?.username}
        </a>
      </p>
    </div>

    <!-- Buttons for changing photo and editing bio -->
    <div class="text-center my-4">
      <a class="btn btn-outline btn-xs" href="/login/photo">Change photo</a>
      <a class="btn btn-outline btn-xs" href={`/${$userData.username}/bio`}>Edit Bio</a>
    </div>

    <!-- Form control for toggling profile visibility -->
    <form class="form-control">
      <label class="label cursor-pointer flex items-start justify-center">
        <span class="label-text mr-6">
          <!-- Tooltip for profile visibility -->
          <div
            class="tooltip group-hover:tooltip-open"
            data-tip="If public, the world can see your profile"
          >
            {$userData?.published ? "Public profile" : "Private profile"}
          </div>
        </span>
        <!-- Checkbox to toggle profile visibility -->
        <input
          type="checkbox"
          class="toggle toggle-success"
          checked={$userData?.published}
          on:change={toggleProfileStatus}
        />
      </label>
    </form>

    <!-- Sortable list of user links -->
    <SortableList list={$userData?.links} on:sort={sortList} let:item let:index>
      <div class="group relative">
        <!-- User link component -->
        <UserLink {...item} />
        <!-- Button to delete link -->
        <button
          on:click={() => deleteLink(item)}
          class="btn btn-xs btn-error invisible group-hover:visible transition-all absolute -right-6 bottom-10"
          >Delete</button
        >
      </div>
    </SortableList>

    <!-- Form for adding a new link -->
    {#if showForm}
      <form
        on:submit|preventDefault={addLink}
        class="bg-base-200 p-6 w-full mx-auto rounded-xl"
      >
        <!-- Select input for choosing link icon -->
        <select
          name="icon"
          class="select select-sm"
          bind:value={$formData.icon}
        >

          {#each icons as icon}
            <option value={icon.toLowerCase()}>{icon}</option>
          {/each}
        </select>
        <!-- Input for entering link title -->
        <input
          name="title"
          type="text"
          placeholder="Title"
          class="input input-sm"
          bind:value={$formData.title}
        />
        <!-- Input for entering link URL -->
        <input
          name="url"
          type="text"
          placeholder="URL"
          class="input input-sm"
          bind:value={$formData.url}
        />
        <!-- Validation messages -->
        <div class="my-4">
          {#if !titleIsValid}
            <p class="text-error text-xs">Must have valid title</p>
          {/if}
          {#if !urlIsValid}
            <p class="text-error text-xs">Must have a valid URL</p>
          {/if}
          {#if formIsValid}
            <p class="text-success text-xs">Looks good!</p>
          {/if}
        </div>
        <!-- Button to add link -->
        <button
          disabled={!formIsValid}
          type="submit"
          class="btn btn-success block">Add Link</button
        >
        <!-- Button to cancel adding link -->
        <button type="button" class="btn btn-xs my-4" on:click={cancelLink}>Cancel</button>
      </form>
    {:else}
      <!-- Button to show form for adding new link -->
      <button
        on:click={() => (showForm = true)}
        class="btn btn-outline btn-info block mx-auto my-4"
      >
        Add a Link
      </button>
    {/if}
  {/if}
</main>