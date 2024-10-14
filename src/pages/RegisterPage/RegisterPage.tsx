import { useAuth } from "@context/AuthProvider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Registro de Usuario</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Registrarse</button>
            </form>
        
        </div>
    );
}

export default RegisterPage