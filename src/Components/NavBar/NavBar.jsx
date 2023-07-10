import { Link, useLocation } from "react-router-dom"
import SearchBar from "../SearchBar/SearchBar"
import { filterByType, nameSort, attackSort } from "../../redux/actions"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import styles from "./NavBar.module.css"
import pikachu from "../../Utils/pikachu-icon-8.gif"

const NavBar = () => {
    const dispatch = useDispatch()
    const types = useSelector(state=>state.types)

    const location = useLocation()

    const [name,setName] = useState("")
    const [nameSortType, setNameSortType] = useState("asc");
    const [attackSortType, setAttackSortType] = useState("asc");
    const [selectedType, setSelectedType] = useState("ALL")
 

    const home = () =>{
        dispatch(filterByType("ALL"))
        setNameSortType("asc")
        setAttackSortType("asc")
        setSelectedType("ALL")
        setName("")
    }

    //Funcion que despacha la accion para filtrar los pokemons.
    const typeHandler = (event) =>{
        setNameSortType("asc")
        setAttackSortType("asc")
        const type = event.target.value
        dispatch(filterByType(type))
        setSelectedType(type);
    }

    const handleNameSort = () => {
        setAttackSortType("asc")
        if (nameSortType === "asc") {
            setNameSortType("desc");
        } else {
            setNameSortType("asc");
        }
        dispatch(nameSort(nameSortType))
    };
    const handleAttackSort = () => {
        setNameSortType("asc")
        if (attackSortType === "asc") {
            setAttackSortType("desc");
        } else {
            setAttackSortType("asc");
        }
        dispatch(attackSort(attackSortType))
    };

    const detailRegex = /^\/detail\/[\w-]+$/;
    
    return (
        <div className={styles.nav}>
            <Link style={{ textDecoration: "none" }} to ="/home" onClick={()=>home() }>
                <div className={styles.iconWrapper}>
                    <img src={pikachu} alt="Home" className={styles.icon}/>
                    <label htmlFor="">HOME</label>
                </div>
            </Link>
            {
                location.pathname !== "/create" && 
                <Link to ="/create">
                <button className={styles.createPok}>CREATE POKEMON</button>
                </Link>
            }
                
            <div className={styles.searchDiv}>
                {!detailRegex.test(location.pathname) && location.pathname !== "/create" && <SearchBar name={name} setName={setName} />}
                
            </div>
            {
                location.pathname == "/home" &&
                <div className={styles.sorters}>
                <button name= "name" onClick={handleNameSort} className={styles.nameButton}>
                    SORT BY NAME {nameSortType === "asc" ? "↑" : "↓"}
                </button>
                <button name= "attack" onClick={handleAttackSort} className={styles.attackButton}>
                    SORT BY ATTACK {attackSortType === "asc" ? "↑" : "↓"}
                </button> 
                <label>SORT BY TYPE/SOURCE</label>
                
                <select name="tipo" id="" onChange={typeHandler} value={selectedType} >
                    <option>ALL</option>
                    <option>API</option>
                    <option>DB</option>
                    {types.map(type => <option id="">{type.name.toUpperCase()}</option>)}
                </select>
                </div>
            }
            
        </div>
    )
}

export default NavBar