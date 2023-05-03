<script lang="ts">
  import { link } from "svelte-spa-router";
</script>

<main class="max-w-4xl mx-auto flex flex-col gap-8">
  <h1 class="text-3xl">on chain chan for any nft</h1>

  <ul class="list-disc list-inside">
    <li>
      <code
        >{"#/eip155:<chain id>/<token standard>:<token contract>/<token id>"}</code
      >
    </li>
    <li>
      example: <a
        href="/eip155:1/erc721:0x1b0aebafeb9452c7abbda0b920bb1a272182aacb/69"
        use:link>a mainnet nft</a
      >
    </li>
    <li>
      example: <a
        href="/eip155:1/erc1155:0x28959cf125ccb051e70711d0924a62fb28eaf186/0"
        use:link>a mainnet ERC1155</a
      >
    </li>
    <li>
      <a>a goerli nft</a>
    </li>
  </ul>
</main>

<style lang="postcss">
  code {
    @apply bg-slate-200 rounded-sm p-1;
  }

  li {
    @apply py-2;
  }

  a {
    @apply underline;
  }
</style>
