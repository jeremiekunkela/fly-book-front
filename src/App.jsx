import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/Homepage/HomePage'
import SignupPage from './pages/Signup/Signup'
import SigninPage from './pages/Signin/Signin'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage/>} />
          <Route path="/signin" element={<SigninPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App