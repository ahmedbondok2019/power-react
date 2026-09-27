import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App.jsx'
import { LanguageProvider } from './contexts/LanguageContext.jsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,       // 5 minutes before considering data stale
      gcTime: 60 * 60 * 1000,         // 1 hour in memory cache
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,           // use cache if available on remount
      retry: 2,
      retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 8000), // exponential backoff
      networkMode: 'online',
    },
    mutations: {
      retry: 1,
    },
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)

