<script lang="ts">
  import type { ethers } from "ethers";
  import { slide } from "svelte/transition";
  import Post from "./Post.svelte";

  export let events: ethers.Event[];
  export let loading: boolean = false;
</script>

{#if loading}
  <div class="flex flex-col justify-center h-24">
    <p class="text-center text-slate-500">loading historical posts...</p>
  </div>
{:else if events.length === 0}
  <div class="flex flex-col justify-center h-24">
    <p class="text-center text-slate-500">no posts found
      <br />
      <span class="text-xs text-slate-300">they may be there, just too far in the past</span>
    </p>
  </div>
{/if}
{#each events as event (event.transactionHash + event.logIndex.toString())}
  <div in:slide>
    <Post {event} />
  </div>
{/each}
