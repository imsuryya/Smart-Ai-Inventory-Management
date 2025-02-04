// src/adminEntry.jsx
import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import Admin from './pages/Admin'
import PrivateLogin from './pages/PrivateLogin'
import './index.css'

function AdminApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogin = (username, password) => {
    // Default credentials - in production, use proper authentication
    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true)
      return true
    }
    return false
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
  }

  // Pass logout handler to Admin component
  if (isAuthenticated) {
    return <Admin onLogout={handleLogout} />
  }

  return <PrivateLogin onLogin={handleLogin} />
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AdminApp />
  </React.StrictMode>
)