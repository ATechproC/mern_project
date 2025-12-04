import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AdminProvider from './providers/AdminProvider.jsx'
import DoctorProvider from './providers/DoctorProvider.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AdminProvider>
      <DoctorProvider>
        <App />
      </DoctorProvider>
    </AdminProvider>
  </React.StrictMode>
)
