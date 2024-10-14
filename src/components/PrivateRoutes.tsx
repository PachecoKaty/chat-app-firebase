import { useAuth } from "@context/AuthProvider"
import { Navigate, Outlet } from "react-router-dom"

const PrivateRoutes = () => {
    const { user } = useAuth()

    return user ? <Outlet /> : <Navigate to={'/'} />
}

export default PrivateRoutes