<script lang="ts">
  import { fetchEnsAvatar, type Address, fetchEnsName } from "@wagmi/core";
  import { external } from "../lib/actions";
  import type { ethers } from "ethers";

  export let event: ethers.Event;

  const { transactionHash, blockNumber } = event;
  const [, from, content] = event.args;

  $: userProfileUri = `https://rainbow.me/${from}`;
  $: explorerUri = `https://etherscan.io/tx/${transactionHash}`;
  $: ensName = fetchEnsName({ address: from as Address });
  $: avatarUrl = fetchEnsAvatar({ address: from as Address });
</script>

<div class="bg-amber-100 border-1 border-slate-100 p-4 flex flex-col gap-2">
  <a
    class="underline inline-flex flex-row items-center gap-2"
    href={userProfileUri}
    use:external
  >
    {#await avatarUrl}
      <div class="h-8 w-8 rounded-full bg-gray-100" />
    {:then avatar}
      {#if avatar}
        <img
          class="h-8 w-8 rounded-full"
          src={avatar}
          alt="avatar for {from}"
        />
      {:else}
        <div class="h-8 w-8 rounded-full bg-gray-100" />
      {/if}
    {/await}
    <div class="font-mono text-xs">
      {#await ensName}
        {from}
      {:then name}
        {name ?? from}
      {/await}
    </div>
  </a>
  <p class="text-base">{content}</p>
  <div class="flex flex-row gap-2">
    <a class="text-xs underline" href={explorerUri} use:external>tx hash</a>
    <!-- TODO: timestamp, etc -->
  </div>
</div>
