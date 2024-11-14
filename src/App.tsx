import '@/App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Routes } from './routes/routes'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider value={defaultSystem}>
        <div className="App">
          <Routes />
        </div>
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default App
