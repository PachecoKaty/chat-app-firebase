import { useAuth } from "@context/AuthProvider"
import { useNavigate } from "react-router-dom"
import styles from "@components/SingOut/SingOut.module.css"

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
            <button onClick={handleSingOut} className={styles.singOut}>Cerrar sesión</button>
        </div>
    )
}
