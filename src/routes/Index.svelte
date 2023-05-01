<script lang="ts">
  import { link } from "svelte-spa-router";
</script>

<main class="max-w-4xl mx-auto flex flex-col gap-8">
  <h1>on chain chan</h1>

  <h2>a contract chan</h2>
  <ul>
    <li>
      <code>{"#/eip155:<chain id>/<token standard>:<token contract>"}</code>
    </li>
    <li>
      <a
        href="/eip155:1/erc20:0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
        use:link>mainnet USDC</a
      >
    </li>
  </ul>

  <h2>a token chan</h2>
  <ul>
    <li>
      <code
        >{"#/eip155:<chain id>/<token standard>:<token contract>/<token id>"}</code
      >
    </li>
    <li>
      <a
        href="/eip155:1/erc721:0x1b0aebafeb9452c7abbda0b920bb1a272182aacb/69"
        use:link>a mainnet nft</a
      >
    </li>
    <!-- <li>
      <a>a mainnet ERC1155</a>
    </li>
    <li>
      <a>a goerli nft</a>
    </li> -->
  </ul>
</main>

<style lang="postcss">
  h1 {
    @apply text-3xl;
  }

  h2 {
    @apply text-2xl;
  }

  code {
    @apply bg-slate-200 rounded-sm p-1;
  }

  ul {
    @apply list-disc list-inside;
  }

  a {
    @apply underline;
  }
</style>
