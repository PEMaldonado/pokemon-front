import { useState, useEffect } from "react";
import CardsContainer from "../../Components/CardsContainer/CardsContainer";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons,getTypes } from "../../redux/actions";
import styles from "./Home.module.css"

const Home= () => {

    const pokemons = useSelector(state=>state.filteredPokemons)
    const [count, setCount] = useState(0)
    const [nextDisabled, setNextDisabled] = useState(false)
    const [prevDisabled, setPrevDisabled] = useState(true)

    const dispatch = useDispatch()
    
    useEffect(()=>{
        if (pokemons.length === 0){
            dispatch(getPokemons(0))
            dispatch(getTypes())
        }
        
    },[])

    useEffect(()=>{
        setCount(0)
        if (pokemons.length <= 12){
            setNextDisabled(true)
        } else {
            setNextDisabled(false)
        }
        setPrevDisabled(true)
    },[pokemons])



    const nextPageHandler = (event) =>{
        event.preventDefault()
        setCount(count+12)
        setPrevDisabled(false)
        if (count+12>=pokemons.length-12){
            setNextDisabled(true)
        }
    }
    const lastPageHandler = (event) => {
        event.preventDefault()
        setCount(pokemons.length-12)
        setPrevDisabled(false)
        setNextDisabled(true)
    }
    const previousPageHandler = (event) => {
        event.preventDefault()
        setCount(count-12)
        setNextDisabled(false)
        if(count<=12){
            setPrevDisabled(true)
        }
    }
    const firstPageHandler = (event) => {
        event.preventDefault()
        setCount(0)
        setNextDisabled(false)
        setPrevDisabled(true)
    }


    
    return (
        <div className={styles.home}>
            <CardsContainer count={count} />
            <div className={styles.pagination}>
                <button onClick={firstPageHandler} disabled={prevDisabled}>{`<<`}</button>
                <button onClick={previousPageHandler} disabled={prevDisabled}>{`<`}</button>
                <button onClick={nextPageHandler} disabled={nextDisabled}>{`>`}</button>
                <button onClick={lastPageHandler} disabled={nextDisabled}>{`>>`}</button>
            </div>
        </div>
    )
}

export default Home;