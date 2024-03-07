import { QueryClient, QueryClientProvider } from '@tanstack/react-query' 
import { WagmiProvider } from "wagmi"
import { wagmiConfig } from "./config/wagmi"
import Manual from './components/Manual'

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
         <h1>Wagmi Demo</h1>
         <Manual />
        </QueryClientProvider>
      </WagmiProvider>
    </>
  )
}

export default App
