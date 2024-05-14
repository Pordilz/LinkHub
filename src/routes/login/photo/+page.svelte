<script lang="ts">
  // Importing necessary components and Firebase functionalities
  import AuthCheck from "$lib/components/AuthCheck.svelte";
  import { user, userData, storage, db } from "$lib/firebase";
  import { doc, updateDoc } from "firebase/firestore";
  import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

  // Declaring variables and reactive statements
  let previewURL: string; // Holds the URL of the preview image
  let uploading = false; // Indicates whether an upload is in progress
  $: href = `/${$userData?.username}/edit`; // Generates the link for editing profile

  // Function to handle file upload
  async function upload(e: any) {
    uploading = true; // Set uploading to true
    const file = e.target.files[0]; // Get the selected file
    previewURL = URL.createObjectURL(file); // Generate a preview URL for the image

    // Get a reference to the storage location for the user's profile picture
    const storageRef = ref(storage, `users/${$user!.uid}/profile.png`);

    // Upload the file to Firebase Storage
    const result = await uploadBytes(storageRef, file);

    // Get the download URL for the uploaded file
    const url = await getDownloadURL(result.ref);

    // Update the user document in Firestore with the new photoURL
    await updateDoc(doc(db, "users", $user!.uid), { photoURL: url });

    uploading = false; // Set uploading back to false once the upload is complete
  }
</script>

<AuthCheck>
  <!-- Form for uploading a profile photo -->
  <h2 class="card-title">Upload a Profile Photo</h2>
  <form class="max-w-screen-md w-full">
    <div class="form-control w-full max-w-xs my-10 mx-auto text-center">
      <!-- Display the preview image, or the user's current photoURL, or a default user image -->
      <img
        src={previewURL ?? $userData?.photoURL ?? "/user.png"}
        alt="photoURL"
        width="256"
        height="256"
        class="mx-auto"
      />
      <!-- Input field for selecting a file -->
      <label for="photoURL" class="label">
        <span class="label-text">Pick a file</span>
      </label>
      <input
        on:change={upload}
        name="photoURL"
        type="file"
        class="file-input file-input-bordered w-full max-w-xs"
        accept="image/png, image/jpeg, image/gif, image/webp"
      />
      <!-- Display a message and progress bar while uploading -->
      {#if uploading}
        <p>Uploading...</p>
        <progress class="progress progress-info w-56 mt-6" />
      {/if}
    </div>
  </form>

  <!-- Link to finish editing profile -->
  <a {href} class="btn btn-primary">Finish</a>
</AuthCheck>

