<script lang="ts">
  import {
    writeContract,
    prepareWriteContract,
    switchNetwork,
    getNetwork,
  } from "@wagmi/core";
  import { CHAN_ADDRESS, CHAN_CHAIN } from "../lib/constants";
  import { OnChainChanABI } from "../lib/OnChainChan.sol";

  export let topic: string;

  async function handleSubmit(event: SubmitEvent) {
    const data = new FormData(event.target as HTMLFormElement);
    const content = data.get("content") as string;

    if (getNetwork().chain.id !== CHAN_CHAIN.id) {
      try {
        await switchNetwork({ chainId: CHAN_CHAIN.id });
      } catch (error) {
        alert(
          `Your provider doesn't support automatic chain switching, please manually switch to ${CHAN_CHAIN.name} and try again.`
        );
      }
    }

    const config = await prepareWriteContract({
      address: CHAN_ADDRESS,
      abi: OnChainChanABI,
      chainId: CHAN_CHAIN.id,
      functionName: "post",
      args: [topic as `0x${string}`, content],
    });

    const result = await writeContract(config);
    (event.target as HTMLFormElement).reset();
  }
</script>

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
