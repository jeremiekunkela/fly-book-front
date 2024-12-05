import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import SignupPage from './pages/Signup/Signup.jsx'
import SigninPage from './pages/Signin/Signin.jsx'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/signup" element={<SignupPage/>} />
          <Route path="/signin" element={<SigninPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App