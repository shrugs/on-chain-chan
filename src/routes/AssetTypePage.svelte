<script lang="ts">
  export let params: Record<string, string>;

  import Post from "../components/Post.svelte";
  import { ethers } from "ethers";
  import { getAssetTypeFromParams } from "../lib/caip";
  import { slide } from "svelte/transition";
  import { createEventsStore } from "../stores/createEventsStore";
  import PostForm from "../components/PostForm.svelte";
  import ChanPageLayout from "../components/ChanPageLayout.svelte";
  import RenderAssetType from "../components/RenderAssetType.svelte";

  const assetType = getAssetTypeFromParams(params);
  const topic = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes(assetType.toString())
  );
  const { store: events, state: eventsState } = createEventsStore(topic);
</script>

<ChanPageLayout>
  <svelte:fragment slot="sidebar">
    <RenderAssetType {assetType} />
  </svelte:fragment>

  <PostForm {topic} />
  {#if $eventsState.isLoading}
    <div class="flex flex-col justify-center h-24">
      <p class="text-center text-slate-500">loading historical posts...</p>
    </div>
  {:else if $events.length === 0}
    <div class="flex flex-col justify-center h-24">
      <p class="text-center text-slate-500">no posts found</p>
    </div>
  {/if}
  {#each $events as event (event.transactionHash + event.logIndex.toString())}
    <div in:slide>
      <Post {event} />
    </div>
  {/each}
</ChanPageLayout>
