<script lang="ts">
  export let params: Record<string, string>;
  import { orderBy } from "lodash-es";

  import Post from "../components/Post.svelte";
  import {
    getProvider,
    writeContract,
    prepareWriteContract,
    switchNetwork,
    getNetwork,
  } from "@wagmi/core";
  import { onDestroy } from "svelte";
  import { ethers } from "ethers";
  import { getChan } from "../lib/chan";
  import { asyncReadable, asyncDerived } from "@square/svelte-store";
  import { CHAN_ADDRESS, CHAN_CHAIN_ID } from "../lib/constants";
  import { OnChainChanABI } from "../lib/OnChainChan.sol";
  import { getAssetIdFromParams } from "../lib/caip";
  import RenderAsset from "../components/RenderAsset.svelte";
  import { slide } from "svelte/transition";

  const assetId = getAssetIdFromParams(params);

  const occ = getChan();
  const provider = getProvider({ chainId: CHAN_CHAIN_ID });
  const blockNumber = asyncReadable(null, () => provider.getBlockNumber());

  $: topic = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes(assetId.toString())
  );
  $: filter = occ.filters.Post(topic);

  const { store: historicalEvents, state: historicalEventsState } =
    asyncDerived(
      [blockNumber],
      ([$blockNumber]) => occ.queryFilter(filter, 0, $blockNumber),
      { trackState: true }
    );

  let liveEvents: ethers.Event[] = [];

  $: allEvents = orderBy(
    [...liveEvents, ...($historicalEvents ?? [])],
    ["blockNumber", "transactionIndex"],
    ["desc", "asc"]
  );

  // we have some assurance that this will only be called once
  blockNumber.load().then(($blockNumber) => {
    provider.on(filter, (event: ethers.Event) => {
      if (event.blockNumber <= $blockNumber) return; // not interested in this event
      event.args = occ.interface.parseLog(event).args;
      liveEvents = [...liveEvents, event];
    });
  });

  onDestroy(() => provider.removeAllListeners(filter));

  async function handleSubmit(event: SubmitEvent) {
    const data = new FormData(event.target as HTMLFormElement);
    const content = data.get("content") as string;

    if (getNetwork().chain.id !== CHAN_CHAIN_ID) {
      await switchNetwork({ chainId: CHAN_CHAIN_ID });
    }

    const config = await prepareWriteContract({
      address: CHAN_ADDRESS[CHAN_CHAIN_ID],
      abi: OnChainChanABI,
      chainId: CHAN_CHAIN_ID,
      functionName: "post",
      args: [topic as `0x${string}`, content],
    });

    const result = await writeContract(config);
    (event.target as HTMLFormElement).reset();
  }
</script>

<main class="p-2 md:p-4 flex flex-row justify-center">
  <div class="min-w-0 flex-1 flex flex-col md:flex-row gap-2 md:gap-4 lg:gap-8">
    <div
      class="w-full md:w-80 self-start flex flex-col gap-4 md:sticky md:top-4"
    >
      <RenderAsset {assetId} />
    </div>
    <div class="min-w-0 flex-1 flex flex-col gap-4">
      <form class="flex flex-col gap-4" on:submit|preventDefault={handleSubmit}>
        <textarea
          name="content"
          class="bg-slate-50 p-2 text-base"
          placeholder="post something here"
          required
        />
        <div class="flex flex-row justify-between">
          <w3m-core-button />
          <button type="submit">post</button>
        </div>
      </form>
      {#if $historicalEventsState.isLoading}
        <div class="flex flex-col justify-center h-24">
          <p class="text-center text-slate-500">loading historical posts...</p>
        </div>
      {:else if allEvents.length === 0}
        <div class="flex flex-col justify-center h-24">
          <p class="text-center text-slate-500">no posts found</p>
        </div>
      {/if}
      {#each allEvents as event (event.transactionHash + event.logIndex.toString())}
        <div in:slide>
          <Post {event} />
        </div>
      {/each}
    </div>
  </div>
</main>
