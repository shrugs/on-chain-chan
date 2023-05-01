<script lang="ts">
  export let params;
  import { location } from "svelte-spa-router";
  import { getAssetIdFromLocation } from "../lib/caip";
  import Post from "../components/Post.svelte";
  import { erc721ABI, readContract, type Address } from "@wagmi/core";
  import ImagePlaceholder from "../components/ImagePlaceholder.svelte";
  import { onDestroy } from "svelte";
  import { ethers } from "ethers";
  import { getChan } from "../lib/chan";

  let events: ethers.Event[] = [];

  $: assetId = getAssetIdFromLocation($location);

  $: name = readContract({
    address: assetId.assetName.reference as Address,
    abi: erc721ABI,
    functionName: "name",
  });

  const occ = getChan();
  $: topic = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes(assetId.toString())
  );
  $: filter = occ.filters.Post(topic);

  //   [
  //     {
  //         "blockNumber": 2,
  //         "blockHash": "0x51aacfe805adbb26260172e43cef77283b264a789d3522df2760cb0c443e2725",
  //         "transactionIndex": 0,
  //         "removed": false,
  //         "address": "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  //         "data": "0x000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb922660000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000001468656c6c6f2066726f6d2074686520636861696e000000000000000000000000",
  //         "topics": [
  //             "0xcca97942c1f31885cdb1547fd62b8b3f74651490a40beac9a97f6f42bf7dceea",
  //             "0xf1c1e55bf8fb23b000aeec32966bb616706afe05b68447db396ff53ab2ddf358"
  //         ],
  //         "transactionHash": "0x01f74492898351d8e8b646c6b247829276708c94f07d771dec9c4696f906891c",
  //         "logIndex": 0,
  //         "event": "Post",
  //         "eventSignature": "Post(bytes32,address,string)",
  //         "args": [
  //             "0xf1c1e55bf8fb23b000aeec32966bb616706afe05b68447db396ff53ab2ddf358",
  //             "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  //             "hello from the chain"
  //         ]
  //     }
  // ]

  $: occ.queryFilter(filter).then((_events) => {
    events = _events;
  });

  // onDestroy(unwatch);
</script>

<main class="p-2 md:p-4 flex flex-row justify-center">
  <div class="min-w-0 flex-1 flex flex-col md:flex-row gap-2 md:gap-4 lg:gap-8">
    <div class="w-full md:w-80 flex flex-col gap-4">
      <ImagePlaceholder />
    </div>
    <div class="min-w-0 flex-1 flex flex-col gap-4">
      <div class="flex flex-col gap-4">
        <textarea
          class="bg-slate-50 p-2 text-base"
          placeholder="write something"
        />
        <div class="flex flex-row justify-end"><w3m-core-button /></div>
      </div>
      {#each events as event}
        <Post {event} />
      {/each}
    </div>
  </div>
</main>
