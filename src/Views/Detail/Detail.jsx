import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearPokemonDetail, getPokemonDetail } from "../../redux/actions";
import { useParams } from "react-router-dom";
import style from "./Detail.module.css"

const Detail= () => {
    const {id} = useParams()
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getPokemonDetail(id))
        return () => {
            // Limpia el estado de redux al desmontar el componente
            dispatch(clearPokemonDetail());
          }
    },[])

    const pokemon = useSelector(state=>state.pokemonDetail)

    return ( 
        <div className={style.detail}>
            {pokemon.name?(<>
                <p>ID: {pokemon.id}</p>
            <p>Name: {pokemon.name.toUpperCase()}</p>
            <img src={pokemon.image} alt="" />
            <p>Life: {pokemon.life}</p>
            <p>Attack: {pokemon.attack}</p>
            <p>Defense: {pokemon.defense}</p>
            <p>Speed: {pokemon.speed ? pokemon.speed: "No tiene"}</p>
            <p>Height: {pokemon.height? pokemon.height: "No tiene"}</p>
            <p>Weight: {pokemon.weight? pokemon.weight: "No tiene"}</p>
            <p>Types: {pokemon.type ? pokemon.type : pokemon.types.length === 1 ? pokemon.types[0].name : `${pokemon.types[0].name}, ${pokemon.types[1].name}`}</p>
            </>):(<h3>Loading...</h3>
            )}
            
            
        </div>
    )
}

export default Detail;