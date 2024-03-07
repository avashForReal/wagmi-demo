import { createWeb3Modal } from '@web3modal/wagmi/react'
import { http, createConfig } from "wagmi"
import { sepolia } from "wagmi/chains"
import { walletConnect } from "wagmi/connectors"

const WALLET_CONNECT_PROJECT_ID = "08622c6f40975ad1d52571eac92c8898"

const walletConnectMetadata = {
    name: 'WalletConnectDemo',
    description: 'WalletConnectDemo',
    url: 'http://127.0.0.1:5173', // origin must match your domain & subdomain
    icons: ['https://static.thenounproject.com/png/317767-200.png']
}

export const wagmiConfig = createConfig({
    chains: [sepolia],
    connectors: [
        walletConnect({
            projectId: WALLET_CONNECT_PROJECT_ID,
            metadata: walletConnectMetadata
        })
    ],
    transports: {
        [sepolia.id]: http()
    }
})

createWeb3Modal({
    wagmiConfig: wagmiConfig,
    projectId: WALLET_CONNECT_PROJECT_ID,
    enableAnalytics: true
})

