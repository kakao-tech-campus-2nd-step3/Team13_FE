import '@/App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Routes } from './routes/routes'
import { BrowserRouter } from 'react-router-dom'

const queryClient = new QueryClient()

// function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <div className="App">
//         <BrowserRouter><Routes /></BrowserRouter>
//       </div>
//     </QueryClientProvider>
//   )
// }

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Routes />
      </div>
    </QueryClientProvider>
  )
}

export default App
