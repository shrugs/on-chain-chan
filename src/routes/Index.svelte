<script lang="ts">
  import { link } from "svelte-spa-router";
</script>

<main class="pt-8 max-w-4xl mx-auto flex flex-col gap-8">
  <h1 class="text-3xl">on chain chan for any asset</h1>

  <p>
    uses ZDK for best-effort NFT rendering, but you can comment on anything,
    even if it isn't rendering
  </p>

  <h2 class="text-2xl">nfts</h2>

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
      example: <a
        href="/eip155:5/erc721:0xf5de760f2e916647fd766b4ad9e85ff943ce3a2b/1"
        use:link>a goerli nft</a
      >
    </li>
  </ul>

  <h2 class="text-2xl">erc20s, contract addresses, etc</h2>

  <ul class="list-disc list-inside">
    <li>
      <code>{"#/eip155:<chain id>/<token standard>:<token contract>"}</code>
    </li>
    <li>
      example: <a
        href="/eip155:1/erc20:0xa35923162c49cf95e6bf26623385eb431ad920d3"
        use:link>$TURBO (ERC20)</a
      >
    </li>
    <li>
      example: <a
        href="/eip155:1/erc721:0x1b0aebafeb9452c7abbda0b920bb1a272182aacb"
        use:link>a mainnet ERC721 contract</a
      >
    </li>
    <li>
      example: <a
        href="/eip155:5/erc721:0xf5de760f2e916647fd766b4ad9e85ff943ce3a2b"
        use:link>a goerli nft contract</a
      >
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
