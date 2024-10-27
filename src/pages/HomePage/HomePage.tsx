import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSignIn = () => {
    navigate('/chat') 
  };

  const handleRegister = () => {
    navigate('/register')
  }

  return (
    <>
      <div>
        <h1>Homepage</h1>
      </div>

      <div>
      <h1>Bienvenido a la App</h1>

      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSignIn}>
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
        <button type="submit">Iniciar sesión</button>
      </form>

      <p>¿No tienes una cuenta?</p>
      <button onClick={handleRegister}>Regístrate aquí</button>
    </div>
    </>
  );
}

export default HomePage