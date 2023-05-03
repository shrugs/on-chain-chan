<script lang="ts">
  import type { AssetId } from "caip";
  import ImagePlaceholder from "./ImagePlaceholder.svelte";
  import { asyncReadable } from "@square/svelte-store";
  import { Networks, Strategies } from "@zoralabs/nft-hooks";
  import { convertURIToHTTPS } from "@zoralabs/nft-hooks/dist/fetcher/UriUtils";
  import AddressOrEns from "./AddressOrENS.svelte";
  import { external, profile } from "../lib/actions";

  export let assetId: AssetId;

  const strategy = new Strategies.ZDKFetchStrategy(Networks.MAINNET);

  const nft = asyncReadable(null, () =>
    strategy.fetchNFT(assetId.assetName.reference, assetId.tokenId)
  );

  // $: $nft && console.log($nft);

  $: tokenName = $nft?.metadata.name;
  $: contractName = $nft?.nft.contract.name;
  $: tokenId = $nft?.nft.tokenId;
  $: tokenDisplayName =
    tokenName ?? (contractName && `${contractName} (#${tokenId})`);
  $: mimeType = $nft?.media.mimeType;
  $: imageUri = $nft?.media.image?.uri;
  $: owner = $nft?.nft.owner?.address;
</script>

<div class="w-full">
  {#if mimeType?.startsWith("image/") && imageUri}
    <img src={imageUri} alt={tokenName} />
  {:else if mimeType?.startsWith("video/") && imageUri}
    <!-- svelte-ignore a11y-media-has-caption -->
    <video controls autoplay loop muted src={convertURIToHTTPS(imageUri)} />
  {:else}
    <div class="h-80">
      <ImagePlaceholder />
    </div>
  {/if}
</div>

{#if tokenDisplayName}
  <h1 class="text-md font-bold">{tokenDisplayName}</h1>
{:else}
  <div class="h-8 w-full bg-slate-50" />
{/if}

{#if owner}
  <!-- svelte-ignore a11y-missing-attribute -->
  <a class="text-xs underline" use:external use:profile={owner}
    ><AddressOrEns address={owner} /></a
  >
{/if}

<ul class="flex flex-row gap-4">
  <li>
    <a
      class="text-xs underline"
      href="https://opensea.io/assets/ethereum/{assetId.assetName
        .reference}/{assetId.tokenId}"
      use:external>opensea</a
    >
  </li>
  <li>
    <a
      class="text-xs underline"
      href="https://blur.io/asset/{assetId.assetName
        .reference}/{assetId.tokenId}"
      use:external>blur</a
    >
  </li>
  <li>
    <a
      class="text-xs underline"
      href="https://etherscan.io/nft/{assetId.assetName
        .reference}/{assetId.tokenId}"
      use:external>etherscan</a
    >
  </li>
</ul>
