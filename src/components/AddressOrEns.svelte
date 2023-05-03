<script lang="ts">
  import { fetchEnsName, type Address } from "@wagmi/core";

  export let address: string;

  const ensName = fetchEnsName({ address: address as Address, chainId: 1 });
</script>

{#await ensName}
  {address}
{:then name}
  {name ?? address}
{/await}
