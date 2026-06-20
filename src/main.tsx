import React from 'react'
import ReactDOM from 'react-dom/client'
import { inject } from '@vercel/analytics'
import * as Sentry from '@sentry/react'
import App from './App'
import '@/styles/global.css'
import '@/styles/components.css'

inject()

Sentry.init({
  dsn: 'https://9891cb9f65568d26a896fe220fac9b42@o4511597616955392.ingest.de.sentry.io/4511597625016400',
  integrations: [Sentry.browserTracingIntegration()],
  tracesSampleRate: 0.2,
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
