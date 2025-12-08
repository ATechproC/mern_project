import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AdminProvider from './providers/AdminProvider.jsx'
import DoctorProvider from './providers/DoctorProvider.jsx'
import AppProvider from './providers/AppProvider.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <AdminProvider>
        <DoctorProvider>
          <App />
        </DoctorProvider>
      </AdminProvider>
    </AppProvider>
  </React.StrictMode>
)
