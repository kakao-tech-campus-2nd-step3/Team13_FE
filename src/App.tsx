import '@/App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
// import AppRoutes from './routes/AppRoutes'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <BrowserRouter>{/*<AppRoutes />*/}</BrowserRouter>
      </div>
    </QueryClientProvider>
  )
}

export default App
