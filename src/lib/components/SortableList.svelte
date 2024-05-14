<script lang="ts">
  // Importing necessary functions and interfaces from Svelte and external libraries
  import { flip } from "svelte/animate";
  import { createEventDispatcher } from "svelte";

  // Defining an interface for each item in the list
  interface Item {
    id: string;
    index: number;
    [key: string]: any;
  }

  // Declaring props and variables
  export let list: any[]; // Array to hold list items
  let isOver: string | boolean = false; // Variable to track if an item is being dragged over

  // Creating an event dispatcher
  const dispatch = createEventDispatcher();

  // Function to recursively find the parent element with a dataset index
  function getDraggedParent(node: any): Item {
    if (!node.dataset.index) {
      return getDraggedParent(node.parentNode);
    } else {
      return { ...node.dataset } as Item;
    }
  }

  // Event handler for drag start
  function onDragStart(e: DragEvent) {
    //@ts-ignore
    const dragged = getDraggedParent(e.target);
    e.dataTransfer?.setData("source", dragged?.index.toString());
  }

  // Event handler for drag over
  function onDragOver(e: DragEvent) {
    //@ts-ignore
    const id = e.target.dataset?.id;
    const dragged = getDraggedParent(e.target);
    isOver = dragged?.id ?? false;
  }

  // Event handler for drag leave
  function onDragLeave(e: DragEvent) {
    const dragged = getDraggedParent(e.target);
    isOver === dragged.id && (isOver = false);
  }

  // Event handler for drop
  function onDrop(e: DragEvent) {
    isOver = false;
    const dragged = getDraggedParent(e.target);
    reorder({
      from: e.dataTransfer?.getData("source"),
      to: dragged.index,
    });
  }

  // Function to reorder items in the list
  const reorder = ({ from, to }: any) => {
    const newList = [...list];
    newList[from] = [newList[to], (newList[to] = newList[from])][0];

    // Dispatching a custom event with the updated list
    dispatch("sort", newList);
  };
</script>

{#if list?.length}
  <!-- Rendering the list if it has items -->
  <ul class="list-none p-0 flex flex-col items-center">
    {#each list as item, index (item.id)}
      <li
        class="border-2 border-dashed border-transparent p-2 transition-all max-w-md w-full"
        class:over={item.id === isOver}
        data-index={index}
        data-id={item.id}
        draggable="true"
        on:dragstart={onDragStart}
        on:dragover|preventDefault={onDragOver}
        on:dragleave={onDragLeave}
        on:drop|preventDefault={onDrop}
        animate:flip={{ duration: 300 }}
      >
        <!-- Rendering the slot content for each item -->
        <slot {item} {index} />
      </li>
    {/each}
  </ul>
{:else}
  <!-- Displaying a message if the list is empty -->
  <p class="text-center my-12 text-lg font-bold">No items</p>
{/if}

<style>
  /* CSS styling */
  .over {
    @apply border-gray-400 scale-105;
  }
</style>
