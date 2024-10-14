import { useAuth } from "@context/AuthProvider";
import { useNavigate } from "react-router-dom";

const Chat = () => {
    const { user } = useAuth()
    const navigate = useNavigate()
    const {signOut} = useAuth()

    const handleLogout = async () => {
        await signOut()
        navigate('/') 
    };
    
    return (
        <div>
            <div>
                <h1>Chat</h1>
                <button onClick={handleLogout}>Log out</button>
            </div>
            <div>
                <h3>Mensajes {user?.email} </h3>
                <form action="">
                    <textarea name="" id="">Escribe un mensaje</textarea>
                    <button>Enviar</button>
                </form>
            </div>
        </div>
    )
}

export default Chat