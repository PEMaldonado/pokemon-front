import { Link } from "react-router-dom"
import styles from "./Card.module.css"
import noDisponible from "../../Utils/No disponible.jpg"

const Card = ({image,name,type,id, attack}) => {
    return(
        <div className={styles.card}>
            <Link style={{ textDecoration: "none" }} to={`/detail/${id}` }>
                {image ? <img src={image} alt="" /> : <img src={noDisponible} alt="No disponible" />}
                <h2>{name.toUpperCase()}</h2>
                <h3>{type.toUpperCase()}</h3>
                <h3>Ataque: {attack}</h3>
            </Link>
        </div>
    )
}

export default Card