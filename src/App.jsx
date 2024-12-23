import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/Homepage/HomePage'
import SignupPage from './pages/Signup/Signup'
import SigninPage from './pages/Signin/Signin'
import ProtectedRoute from "./ProtectedRoutes"
import AuthProvider from './context/Auth'
import { AlertProvider } from './context/Alert'
import Reservation from './pages/Reservation/Reservation'
import { Graphics } from './pages/Graphics/Graphics'

function App() {

  return (
    <>
      <AlertProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={
                <ProtectedRoute><HomePage />
                </ProtectedRoute>
              } />
            <Route path="/reservations" element={<ProtectedRoute><Reservation /></ProtectedRoute>} />
              <Route path="/graphics" element={
                <ProtectedRoute><Graphics />
                </ProtectedRoute>
              } />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/signin" element={<SigninPage />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </AlertProvider>
    </>
  )
}

export default App