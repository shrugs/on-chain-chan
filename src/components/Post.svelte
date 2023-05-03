<script lang="ts">
  import "@zoralabs/zorb/dist/component.umd";
  import { fetchEnsAvatar, type Address, getProvider } from "@wagmi/core";
  import { external } from "../lib/actions";
  import type { ethers } from "ethers";
  import { asyncDerived, asyncReadable } from "@square/svelte-store";
  import { CHAN_CHAIN_ID } from "../lib/constants";
  import { formatTimeAgo } from "../lib/time";
  import AddressOrEns from "./AddressOrENS.svelte";
  import { CHAN_CHAIN } from "../lib/ethereum";

  export let event: ethers.Event;

  const { transactionHash } = event;
  const [, from, content] = event.args;

  $: userProfileUri = `https://rainbow.me/${from}`;
  $: explorerUri = `${CHAN_CHAIN.blockExplorers.default.url}/tx/${transactionHash}#eventlog`;
  $: avatarUrl = fetchEnsAvatar({ address: from as Address, chainId: 1 });

  $: block = asyncReadable(null, () =>
    getProvider({ chainId: CHAN_CHAIN_ID }).getBlock(event.blockHash)
  );

  $: timeAgo = asyncDerived([block], async ([$block]) =>
    formatTimeAgo($block.timestamp * 1000)
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
