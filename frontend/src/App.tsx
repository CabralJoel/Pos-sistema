//import { useState } from 'react'
import './App.css'
import { usePageTracking } from './hooks/usePageTracking'

import { AppRoutes } from './routes/routes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function App() {
  usePageTracking();
  return (
    <>
      <AppRoutes />
      <ToastContainer position="bottom-right" autoClose={2000} pauseOnHover={false} limit={3}/>
    </>
  )
}