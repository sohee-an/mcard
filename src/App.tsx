import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from '@pages/Home'
import TestPage from '@pages/Testpage'
import Card from '@pages/Card'
import ScrollToTop from '@components/share/ScrollToTop'
import Signin from '@pages/Signin'
import Navbar from '@components/share/Navbar'
import Signup from '@pages/Signup'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/signin" Component={Signin} />
        <Route path="/signup" Component={Signup} />
        <Route path="/" Component={HomePage} />
        <Route path="/test" Component={TestPage} />
        <Route path="/card/:id" Component={Card} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
