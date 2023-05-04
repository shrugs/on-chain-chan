<script lang="ts">
  export let params: Record<string, string>;

  import { ethers } from "ethers";
  import { getAssetIdFromParams } from "../lib/caip";
  import RenderAsset from "../components/RenderAsset.svelte";
  import { createEventsStore } from "../stores/createEventsStore";
  import PostForm from "../components/PostForm.svelte";
  import ChanPageLayout from "../components/ChanPageLayout.svelte";
  import PostFeed from "../components/PostFeed.svelte";

  const assetId = getAssetIdFromParams(params);
  const topic = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes(assetId.toString())
  );
  const { store: events, state: eventsState } = createEventsStore(topic);
</script>

<ChanPageLayout>
  <svelte:fragment slot="sidebar">
    <RenderAsset {assetId} />
  </svelte:fragment>

  <PostForm {topic} />
  <PostFeed loading={$eventsState.isLoading} events={$events} />
</ChanPageLayout>
