<script lang="ts">
  import type { AssetId } from "caip";
  import ImagePlaceholder from "./ImagePlaceholder.svelte";
  import { asyncReadable } from "@square/svelte-store";
  import { Networks, Strategies } from "@zoralabs/nft-hooks";
  import { convertURIToHTTPS } from "@zoralabs/nft-hooks/dist/fetcher/UriUtils";
  import AddressOrEns from "./AddressOrENS.svelte";
  import { external, profile } from "../lib/actions";
  import { erc721ABI, readContracts, type Address } from "@wagmi/core";
  import { BigNumber } from "ethers";
  import { RENDERABLE_CHAINS } from "../lib/ethereum";

  export let assetId: AssetId;

  const {
    chainId: { reference: chainId },
    assetName: { reference: tokenContract },
    tokenId,
  } = assetId;

  const chain = RENDERABLE_CHAINS.find(
    (chain) => chain.id.toString() === chainId
  );

  const strategy = new Strategies.ZDKFetchStrategy(Networks.MAINNET);

  const { store: nft, state: nftState } = asyncReadable(
    null,
    () => strategy.fetchNFT(tokenContract, tokenId),
    { trackState: true }
  );

  const contractInfo = {
    chainId: parseInt(chainId),
    address: tokenContract as Address,
    abi: erc721ABI,
  };

  const infos = asyncReadable([null, null], () => {
    if (assetId.assetName.namespace !== "erc721") throw new Error("nope");
    return readContracts({
      allowFailure: true,
      contracts: [
        {
          ...contractInfo,
          functionName: "name",
        },
        {
          ...contractInfo,
          functionName: "ownerOf",
          args: [BigNumber.from(tokenId)],
        },
      ],
    });
  });

  $: process.env.NODE_ENV === "development" && console.log($nft, $infos);

  $: tokenName = $nft?.metadata.name;
  $: contractName = $nft?.nft.contract.name ?? $infos[0];
  $: tokenDisplayName =
    tokenName ?? (contractName && `${contractName} (#${tokenId})`);
  $: mimeType = $nft?.media.mimeType;
  $: imageUri = $nft?.media.image?.uri;
  $: owner = $nft?.nft.owner?.address ?? $infos[1];
</script>

<div class="w-full">
  {#if mimeType?.startsWith("image/") && imageUri}
    <img src={imageUri} alt={tokenName} />
  {:else if mimeType?.startsWith("video/") && imageUri}
    <!-- svelte-ignore a11y-media-has-caption -->
    <video controls autoplay loop muted src={convertURIToHTTPS(imageUri)} />
  {:else}
    <div class="h-80">
      <ImagePlaceholder error={$nftState.isSettled} />
    </div>
  {/if}
</div>
{#if assetId.assetName.namespace !== "erc721" && $nftState.isSettled && !tokenDisplayName}
  unable to fetch name (is not erc721)
{:else if tokenDisplayName}
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
  <!-- best shot on opensea url -->
  <li>
    <a
      class="text-xs underline"
      href="https://{chain.id === 5
        ? 'testnets.'
        : ''}opensea.io/assets/{chain?.network}/{tokenContract}/{tokenId}"
      use:external>opensea</a
    >
  </li>
  <!-- blur only supports mainnet -->
  {#if chain?.id === 1}
    <li>
      <a
        class="text-xs underline"
        href="https://blur.io/asset/{tokenContract}/{tokenId}"
        use:external>blur</a
      >
    </li>
  {/if}
  <li>
    <a
      class="text-xs underline"
      href="{chain.blockExplorers.default.url}/nft/{tokenContract}/{tokenId}"
      use:external>etherscan</a
    >
  </li>
</ul>
