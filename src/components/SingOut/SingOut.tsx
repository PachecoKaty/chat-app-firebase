import { useAuth } from "@context/AuthProvider"
import { useNavigate } from "react-router-dom"

export const SingOut = () => {
    const {signOut} = useAuth()
    const navigate = useNavigate()
    const handleSingOut = async () => {
        try {
            await signOut()
            navigate('/')
        } catch (error) {
            console.log("error", error);
        }
    }
    return (
        <div>
            <button onClick={handleSingOut}>Cerrar sesión</button>
        </div>
    )
}
