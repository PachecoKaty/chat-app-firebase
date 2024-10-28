import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@context/AuthProvider";
import { FaCircleUser } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import styles from "@pages/HomePage/HomePage.module.css";

const HomePage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await signIn(email, password)
      navigate('/chat')
    } catch (err) {
      console.log("Error: ",err );
    }
  };

  const handleRegister = () => {
    navigate('/register')
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>ChatMate</h1>
          <img src="public\logo-chatmate.svg" alt="ChatMate Logo" />
        </div>

        <div className={styles.login}>
          <h2>Iniciar Sesión</h2>
          <form onSubmit={handleSignIn}>
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
            <button className={styles.signin} type="submit">Iniciar sesión</button>
          </form>
          <p>¿No tienes una cuenta?</p>
          <button className={styles.register} onClick={handleRegister}>Regístrate aquí</button>
        </div>
      </div>
    </>
  );
}

export default HomePage