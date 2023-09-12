import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import AuthProvider from '@/contexts/auth.context'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import App from '@/App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <AuthProvider>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </AuthProvider>
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
