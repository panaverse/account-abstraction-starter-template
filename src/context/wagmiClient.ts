import { configureChains, createClient, WagmiConfig } from "wagmi";
import { goerli } from "wagmi/chains";
import {
    googleWallet,
    facebookWallet,
    githubWallet,
    discordWallet,
    twitchWallet,
    twitterWallet,
} from "@zerodevapp/wagmi/rainbowkit";

import { publicProvider } from "wagmi/providers/public";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";

const options = {
    options: { projectId: process.env.PROJECT_ID!, shimDisconnect: true },
};

const { chains, provider, webSocketProvider } = configureChains([goerli], [publicProvider()]);

const connectors = connectorsForWallets([
    {
        groupName: "Social",
        wallets: [
            googleWallet(options),
            facebookWallet(options),
            githubWallet(options),
            discordWallet(options),
            twitchWallet(options),
            twitterWallet(options),
        ],
    },
]);

export const WagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
    webSocketProvider,
});

export {chains}
