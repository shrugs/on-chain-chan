<script lang="ts">
  export let params: Record<string, string>;

  import { ethers } from "ethers";
  import { getAssetTypeFromParams } from "../lib/caip";
  import { createEventsStore } from "../stores/createEventsStore";
  import PostForm from "../components/PostForm.svelte";
  import ChanPageLayout from "../components/ChanPageLayout.svelte";
  import RenderAssetType from "../components/RenderAssetType.svelte";
  import PostFeed from "../components/PostFeed.svelte";

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
  <PostFeed loading={$eventsState.isLoading} events={$events} />
</ChanPageLayout>
