import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from './components/theme-provider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider storageKey="vite-ui-theme">
        <main className='w-full h-screen '>
          <App />
          <Toaster />
        </main>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
