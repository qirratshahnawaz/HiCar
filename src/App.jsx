
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useAuth } from './context/AuthContext'

import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import Home from './pages/Home'

function App() {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/home" /> : <LoginPage />} 
        />
        <Route 
          path="/signup" 
          element={isAuthenticated ? <Navigate to="/home" /> : <SignupPage />} 
        />
        <Route 
          path="/home/*" 
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />} 
        />
       
       
      </Routes>
    </AnimatePresence>
  )
}

export default App