import { Routes, Route } from 'react-router'

import ProtectedRoute from './components/ProtectedRoute'
import AuthPage from './pages/auth/AuthPage'
import HomePage from './pages/home/HomePage'

const App = () => {
  return (
    <Routes>
        <Route path='/login' element={<AuthPage />} />
        <Route path='/' element={<HomePage />} />
    </Routes>
  )
}

export default App