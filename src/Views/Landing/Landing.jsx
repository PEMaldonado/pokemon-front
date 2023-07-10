import { Link } from "react-router-dom"
import styles from "./Landing.module.css";

const Landing= () => {
    
    return (
        <div className={styles.landing}>
            <Link to="/home" >
                <button className={styles.pokedex}>POKÉDEX</button>
            </Link>
            <h3 className={styles.developer}>Application made by <a href="https://www.linkedin.com/in/pablo-maldonado-528972144/">Pablo Maldonado</a></h3>
        </div>
    )
}

export default Landing;