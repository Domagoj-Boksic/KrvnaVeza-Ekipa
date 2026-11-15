import { Outlet, Navigate } from 'react-router'
import { useAuth } from '../hooks/AuthContext'
import { hasRole } from '../utils/uloge';

const ProtectedRoute = ({ roles }) => {
    const { user, loading } = useAuth(); 
    
    if (loading) {
        return <p>Loading...</p>
    }

    if (!user) {
        return <Navigate to="/login" replace/>
    }

    if (roles && !hasRole(user, ...roles)) {
        return <Navigate to="/" replace />
    }

    return <Outlet/>
}

export default ProtectedRoute