<script lang="ts">
  import Router, {
    replace,
    type ConditionsFailedEvent,
  } from "svelte-spa-router";
  import { wrap } from "svelte-spa-router/wrap";

  import "./lib/wagmi";

  import Index from "./routes/Index.svelte";
  import AssetIdPage from "./routes/AssetIdPage.svelte";
  import NotFound from "./routes/NotFound.svelte";
  import InvalidPage from "./routes/InvalidPage.svelte";
  import { getAssetIdFromLocation } from "./lib/caip";

  const routes = {
    "/": Index,
    "/:chainId/:assetNamespace/:assetId": wrap({
      component: AssetIdPage,
      conditions: [
        (detail) => {
          try {
            getAssetIdFromLocation(detail.location);
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

<Router {routes} on:conditionsFailed={conditionsFailed} restoreScrollState />
