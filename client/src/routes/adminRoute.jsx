// adminRoute.jsx
import { Navigate, Route } from 'react-router-dom'
import { useState, createContext, useContext } from 'react'
import PrivateLogin from '../pages/PrivateLogin'
import Admin from '../pages/Admin'

// Create auth context
const AuthContext = createContext(null)

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = (username, password) => {
    // Default credentials - in a real app, these should be environment variables
    // and the authentication should be done server-side
    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true)
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }
  
  return children
}

// Updated PrivateLogin component
const EnhancedPrivateLogin = () => {
  const { login, isAuthenticated } = useAuth()
  
  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />
  }
  
  return <PrivateLogin onLogin={login} />
}

// Admin routes configuration
const AdminRoutes = () => {
  return (
    <AuthProvider>
      <Route path="/admin/login" element={<EnhancedPrivateLogin />} />
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      />
    </AuthProvider>
  )
}

export default AdminRoutes