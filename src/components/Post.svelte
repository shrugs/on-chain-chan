<script lang="ts">
  import "@zoralabs/zorb/dist/component.umd";
  import { fetchEnsAvatar, type Address, getProvider } from "@wagmi/core";
  import { external } from "../lib/actions";
  import type { ethers } from "ethers";
  import { asyncDerived, asyncReadable } from "@square/svelte-store";
  import { formatTimeAgo } from "../lib/time";
  import AddressOrEns from "./AddressOrEns.svelte";
  import { CHAN_CHAIN } from "../lib/constants";
  import { createIntervalStore } from "../stores/createIntervalStore";

  export let event: ethers.Event;

  const { transactionHash } = event;
  const [, from, content] = event.args;

  $: userProfileUri = `https://rainbow.me/${from}`;
  $: explorerUri = `${CHAN_CHAIN.blockExplorers.default.url}/tx/${transactionHash}#eventlog`;
  $: avatarUrl = fetchEnsAvatar({ address: from as Address, chainId: 1 });

  $: block = asyncReadable(null, () =>
    getProvider({ chainId: CHAN_CHAIN.id }).getBlock(event.blockHash)
  );

  const now = createIntervalStore(10_000);

  $: timeAgo = asyncDerived([block, now], async ([$block, $now]) =>
    formatTimeAgo($block.timestamp * 1000, $now.getTime())
  );
</script>

<div class="bg-slate-50 border-1 border-slate-100 p-4 flex flex-col gap-2">
  <a
    class="underline inline-flex flex-row items-center gap-2"
    href={userProfileUri}
    use:external
  >
    {#await avatarUrl}
      <zora-zorb class="h-8 w-8" address={from} />
    {:then avatar}
      {#if avatar}
        <img
          class="h-8 w-8 rounded-full"
          src={avatar}
          alt="avatar for {from}"
        />
      {:else}
        <zora-zorb class="h-8 w-8" address={from} />
      {/if}
    {:catch}
      <zora-zorb class="h-8 w-8" address={from} />
    {/await}
    <div class="font-mono text-xs">
      <AddressOrEns address={from} />
    </div>
  </a>
  <p class="text-base">{content}</p>
  <div class="flex flex-row gap-2 justify-end">
    <a class="text-xs underline text-gray-400" href={explorerUri} use:external>
      {#await timeAgo.load()}
        tx hash
      {:then timeAgo}
        {timeAgo}
      {:catch}
        tx hash
      {/await}
    </a>
  </div>
</div>
