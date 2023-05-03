<script lang="ts">
  import Router, {
    replace,
    type ConditionsFailedEvent,
  } from "svelte-spa-router";
  import { wrap } from "svelte-spa-router/wrap";

  import "./lib/ethereum";

  import Index from "./routes/Index.svelte";
  import AssetIdPage from "./routes/AssetIdPage.svelte";
  import NotFound from "./routes/NotFound.svelte";
  import InvalidPage from "./routes/InvalidPage.svelte";
  import { getAssetIdFromParams } from "./lib/caip";
  import { external } from "./lib/actions";
  import { CHAN_CHAIN } from "./lib/ethereum";
  import { CHAN_ADDRESS, CHAN_CHAIN_ID } from "./lib/constants";

  const routes = {
    "/": Index,
    "/:chainId/:assetNamespace/:tokenId": wrap({
      component: AssetIdPage,
      conditions: [
        (detail) => {
          try {
            getAssetIdFromParams(detail.params);
            return true;
          } catch {
            return false;
          }
        },
      ],
    }),
    "/invalid": InvalidPage,
    "*": NotFound,
  };

  function conditionsFailed(event: ConditionsFailedEvent) {
    replace(
      `/invalid?${new URLSearchParams({ location: event.detail.location })}`
    );
  }
</script>

<div class="min-h-screen grid" style="grid-template-rows: 1fr auto;">
  <Router {routes} on:conditionsFailed={conditionsFailed} restoreScrollState />
  <footer class="sticky bottom-0 bg-white flex flex-row justify-center p-4">
    <ul class="flex flex-row gap-4 text-xs text-slate-500">
      <li>
        nft rendering powered by <a
          class="underline"
          href="https://api.zora.co/"
          use:external>zora</a
        >
      </li>
      <li>
        web3 by <a
          class="underline"
          href="https://docs.walletconnect.com/2.0/web3modal/about"
          use:external>wallet connect</a
        >
      </li>
      <li>
        posts <a
          class="underline"
          href="{CHAN_CHAIN.blockExplorers.default}/address/{CHAN_ADDRESS[
            CHAN_CHAIN_ID
          ]}"
          use:external>on {CHAN_CHAIN.name.toLowerCase()}</a
        >
      </li>
    </ul>
  </footer>
</div>
