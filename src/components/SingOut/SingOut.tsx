import { useNavigate } from "react-router-dom"

export const SingOut = () => {
    const navigate = useNavigate()
    const handleSingOut = () => {
        navigate('/')
    }
    return (
        <div>
            <button onClick={handleSingOut}>Cerrar sesión</button>
        </div>
    )
}
