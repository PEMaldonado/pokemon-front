import { useState } from "react";
import { useDispatch } from "react-redux"
import { filterByType, getPokemonByName } from "../../redux/actions";
import styles from "./SearchBar.module.css"

export default function SearchBar({ name, setName }) {

   const dispatch = useDispatch()

   

   const handleChange = (event) => {
      const regex = /^[a-zA-Z\s]*$/; 
      const inputValue = event.target.value;
    
      if (regex.test(inputValue)) { 
         setName(inputValue);
      }
  
   }

   const onSearch = (name) =>{
      
      if (name === ""){
         dispatch(filterByType("ALL"))
      }else {
         dispatch(getPokemonByName(name))
      }
   }
   
   return (
      <div className={styles.search}>
         <input placeholder="Name" type='search' onChange={handleChange} value={name} />
         <button onClick={() => {onSearch(name)}}>Search</button>
      </div>
   );
}
