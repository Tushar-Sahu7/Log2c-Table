import { Routes, Route, Navigate } from 'react-router'
import LoginForm from "./components/auth/LoginForm"
import RegisterForm from "./components/auth/ResgisterForm"
import ProtectedRoute from "./components/ProtectedRoute"
import Dashboard from "./components/dashboard/Dashboard"
import './App.css'

function App() {

  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path ="/" element={<Navigate to="/login" replace />}/>
    </Routes>
  )
}

export default App
