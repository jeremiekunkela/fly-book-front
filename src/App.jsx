import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/Homepage/HomePage'
import SignupPage from './pages/Signup/Signup'
import SigninPage from './pages/Signin/Signin'
import ProtectedRoute from "./ProtectedRoutes"
import AuthProvider from './AuthContext'

function App() {

  return (
    <>
    <AuthProvider>
        <BrowserRouter>
          <Routes>
          <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
            <Route path="/signup" element={<SignupPage/>} />
            <Route path="/signin" element={<SigninPage/>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App