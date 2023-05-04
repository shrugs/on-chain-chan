<script lang="ts">
  import type { AssetType } from "caip";
  import { RENDERABLE_CHAINS } from "../lib/ethereum";
  import { external } from "../lib/actions";

  export let assetType: AssetType;

  const {
    chainId: { reference: chainId },
    assetName: { reference: tokenContract },
  } = assetType;

  const chain = RENDERABLE_CHAINS.find(
    (chain) => chain.id.toString() === chainId
  );
</script>

<h1 class="text-xl">posting about contract</h1>
<ul>
  <li>
    <a
      class="text-xs underline"
      href="{chain.blockExplorers.default.url}/address/{tokenContract}"
      use:external>{tokenContract}</a
    >
  </li>
</ul>
