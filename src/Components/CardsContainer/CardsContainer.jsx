import Card from "../Card/Card"
import { useSelector } from "react-redux"
import styles from "./CardsContainer.module.css"
import cargando from "../../Utils/Cargando.gif"

const CardsContainer = ({count}) => {
    const pokemons = useSelector(state=>state.filteredPokemons)

    const sortedPokemons = useSelector(state=>state.sortedPokemons)

    const sortType = useSelector(state=>state.sortType)

    return(
        pokemons.length === 0 ? (
            <div className={styles.imageContainer}>
                <img src={cargando} alt="" />
            </div>
        ):(
        sortType != ""? (
        <div className={styles.cardsContainer}>
        {sortedPokemons.slice(count,count+12).map(pokemon => {
            return <Card
            id = {pokemon.id}
            image = {pokemon.image}
            name = {pokemon.name}
            attack = {pokemon.attack}
            type = {pokemon.type ? pokemon.type : pokemon.types.length === 1 ? pokemon.types[0].name : `${pokemon.types[0].name}, ${pokemon.types[1].name}`}
            />
        })}
            
        </div>
        ):
        (
            <div className={styles.cardsContainer}>
        {pokemons.slice(count,count+12).map(pokemon => {
            return <Card
            id = {pokemon.id}
            image = {pokemon.image}
            name = {pokemon.name}
            attack = {pokemon.attack}
            type = {pokemon.type ? pokemon.type : pokemon.types.length === 1 ? pokemon.types[0].name : `${pokemon.types[0].name}, ${pokemon.types[1].name}`}
            />
        })}
            
        </div>)
        )
    )
}
  
export default CardsContainer