<script lang="ts">
  import { querystring } from "svelte-spa-router";

  $: params = new URLSearchParams($querystring);
  $: location = params.get("location");
</script>

<p><code>{location}</code> is not a valid route</p>
