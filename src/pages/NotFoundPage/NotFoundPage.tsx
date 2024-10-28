import styles from "./notFoundPage.module.css"
import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <>
        <div className={styles.container}>
            <div className={styles.message}>
                <h1>404 - Ups, parece que te perdiste </h1>
                <Link to={'/'} className={styles.button}>Volver al inicio</Link>
            </div>
            <div className={styles.image}>
                <img src="https://res.cloudinary.com/devpkaty/image/upload/v1730089032/notFound_izbfv7.png" alt="pagina no encontrada"/>
            </div>
        </div>
    </>
)
}
