import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/html";
import { configureChains, createClient } from "@wagmi/core";
import {
  mainnet,
  optimism,
  goerli,
  type Chain,
  polygon,
  arbitrum,
} from "@wagmi/chains";
import { WALLET_CONNECT_PROJECT_ID } from "./constants";

export const RENDERABLE_CHAINS = [mainnet, optimism, goerli, polygon, arbitrum];

export const CHAN_CHAIN: Chain =
  process.env.NODE_ENV === "development" ? goerli : optimism;

// wagmi needs mainnet for ens resolution & lookups
const WAGMI_CHAINS: Chain[] = RENDERABLE_CHAINS;

// web3modal should only know about deployment chain
const CHAN_CHAINS: Chain[] = [CHAN_CHAIN];

const { provider } = configureChains(WAGMI_CHAINS, [
  w3mProvider({ projectId: WALLET_CONNECT_PROJECT_ID }),
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({
    projectId: WALLET_CONNECT_PROJECT_ID,
    version: 1,
    chains: WAGMI_CHAINS,
  }),
  provider,
});

const ethereumClient = new EthereumClient(wagmiClient, CHAN_CHAINS);

export const web3modal = new Web3Modal(
  { projectId: WALLET_CONNECT_PROJECT_ID },
  ethereumClient
);
