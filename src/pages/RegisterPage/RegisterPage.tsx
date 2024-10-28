import { useAuth } from "@context/AuthProvider";
import { useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import styles from "@pages/RegisterPage/RegisterPage.module.css";

const RegisterPage = () => {
    const { createUser } = useAuth()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await createUser(email, password)
        navigate('/chat')
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>ChatMate</h1>
                <img src="public\logo-chatmate.svg" alt="ChatMate Logo" />
            </div>

            <div className={styles.register}>
                <form onSubmit={handleSubmit}>
                    <h2>Crea una cuenta</h2>
                    <div>
                        <label><FaCircleUser /></label>
                        <input
                            type="email"
                            placeholder="Correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label><RiLockPasswordFill /></label>
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button className={styles.signin} type="submit">Registrarse</button>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage