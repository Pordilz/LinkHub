<script lang="ts">
    // Importing user and userData from the Firebase module
    import { user, userData } from "$lib/firebase";
    // Importing the global CSS file
    import "../app.css";
 
    // Declaring reactive variables for user and userData
    $user;
    $userData; 
 </script>
 
 <!-- A container div with minimum height to cover the screen, flex layout -->
 <div class="min-h-screen flex flex-col">
     <!-- Slot for rendering content -->
     <slot />
 </div>
