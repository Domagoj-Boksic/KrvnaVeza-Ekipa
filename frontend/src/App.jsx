import { Routes, Route } from 'react-router'

import ProtectedRoute from './components/ProtectedRoute'
import AuthPage from './pages/AuthPage'
import HomePage from './pages/HomePage'

const App = () => {
  return (
    <Routes>
        <Route path='/login' element={<AuthPage />} />

        <Route element={<ProtectedRoute />}>
            <Route path='/' element={<HomePage />} />
        </Route>
    </Routes>
  )
}

export default App