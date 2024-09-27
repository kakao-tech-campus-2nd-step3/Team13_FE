import '@/App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Routes } from './routes'
// import AppRoutes from './routes/AppRoutes'

const queryClient = new QueryClient()

// function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <div className="App">
//         <BrowserRouter>{/*<AppRoutes />*/}</BrowserRouter>
//       </div>
//     </QueryClientProvider>
//   )
// }

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes />
    </QueryClientProvider>
  )
}

export default App
