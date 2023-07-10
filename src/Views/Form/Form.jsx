import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getPokemons, getTypes} from "../../redux/actions"
import {useNavigate} from "react-router-dom"
import axios from "axios";
import style from "./Form.module.css"

const Form= () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getTypes())
    },[])
    const types = useSelector(state=>state.types)
    const [form,setForm] = useState({
        name:"",
        image:"",
        life:50,
        attack:50,
        defense:50,
        speed:50,
        height:250,
        weight:500,
        types:[]
    })

    const [poketypes,setPoketypes] = useState({type1:"",type2:""})
    const [disabled, setDisabled] = useState(false);
    const [letcreate,setLetcreate] = useState(true)
    const [showCheckbox, setShowCheckbox] = useState(false);
    const [errors,setErrors] = useState({
        name:"Complete this field",
        image:"Only URL .jpg or .png",
        types:"Completar los types"
    })

    const validate = (form)=>{
        const newErrors = {
            name:"Complete this field",
            image:"Only URL .jpg or .png",
            types:"Completar los types"
        }

        if (/^[A-Z]+$/i.test(form.name)) {
            newErrors.name = ""
        } else{
            newErrors.name ="Only letters withouth spaces"
        }
        if (form.name ==="") newErrors.name = "Complete this field"

        if (/https?:\/\/.*\.(?:png|jpg)/i.test(form.image)){
            newErrors.image = ""
        } else{
            newErrors.image ="Only URL .jpg or .png"
        }
        if (disabled){
            newErrors.types = ""
        } else{
            newErrors.types = "Completar los types"
        }
        if (!newErrors.name && !newErrors.image && !newErrors.types){
            setLetcreate(false)
        } else {
            setLetcreate(true)
        }
        return newErrors
        
    }

    const navigate = useNavigate()
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/pokemons", form);
            alert("Pokemon creado con éxito, aguarde y será redireccionado");
            dispatch(getPokemons(0,() => {
                navigate('/home');
              }));
        } catch (err) {
            alert(err);
        }
    }


    const handleInputChange = (event) => {
        const property = event.target.name
        const value = event.target.value
        setForm({...form, [property]:value})
        validate({...form, [property]:value})
    }

    const handleSelectChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        
        if (name ==="type1") setPoketypes({...poketypes, type1:value})
        if (name ==="type2") setPoketypes({...poketypes, type2:value})
        setShowCheckbox(true)
    }

    const handleCheck = (event) => {
        if (poketypes.type1 !== "" && poketypes.type2 !== "") setForm({...form,types:[poketypes.type1, poketypes.type2]})
        if (poketypes.type1 !== "" && poketypes.type2 === "") setForm({...form,types:[poketypes.type1]})
        if (poketypes.type1 === "" && poketypes.type2 !== "") setForm({...form,types:[poketypes.type2]})

        
        setDisabled(event.target.checked);
        if (event.target.checked){
            setErrors({...errors,types:""})
        } else {
            setErrors({...errors,types:"Completar los types"})
        }
    }

    useEffect(()=>{
        const errors = validate(form);
        setErrors(errors);
    },[form])

    

    return (
        <div className={style.formContainer}>
        <form onSubmit={handleSubmit} className={style.form}>

            <div className={style.containers}>
                <label htmlFor="" className={style.labelName}>NAME </label>
                <input className={style.textInput} type="text" name="name" placeholder="Name" onChange={handleInputChange}/>
                {errors.name && <span>  {errors.name}</span>}
            </div>

            <div className={style.containers}>
                <label htmlFor="">IMAGE </label>
                <input className={style.textInput} type="url" name="image" placeholder="URL image" onChange={handleInputChange}/>
                {errors.image && <span>  {errors.image}</span>}
            </div>

            <div className={style.containers}>
                <label htmlFor="">TYPE 1 </label>
                <select name="type1" id="" onChange={handleSelectChange} disabled={disabled}>
                    <option value=""selected disabled>SELECT TYPE 1</option>
                    {types.map(type => <option id="" value={type.name}>{type.name.toUpperCase()}</option>)}
                </select>
            </div>

            <div className={style.containers}>
                <label htmlFor="">TYPE 2 </label>
                <select name="type2" id="" onChange={handleSelectChange} disabled={disabled}>
                    <option value="" selected disabled>SELECT TYPE 2</option>
                    {types.map(type => <option id=""value={type.name}>{type.name.toUpperCase()}</option>)}
                </select>
            </div>

                {showCheckbox &&
            <div className={style.checkbox}>
                <label htmlFor="">CONFIRM TYPES
                </label>
                <input type="checkbox" onChange={handleCheck} />
            </div>
                }


            <div className={style.ranges} >

                <div className={style.rangeDiv}>
                <label htmlFor=""> LIFE
                </label>
                    <input className={style.rangeInput}type="range" name="life" min="1" max="100" required value={form.life} onChange={handleInputChange} />
                    <span id="hp-value">{form.life}</span>
                </div>

                <div className={style.rangeDiv}>
                <label htmlFor="" > ATTACK
                </label>
                    <input className={style.rangeInput}  type="range" name="attack" min="1" max="100" required value={form.attack} onChange={handleInputChange} />
                    <span id="hp-value">{form.attack}</span>
                </div>

                <div className={style.rangeDiv}>
                <label htmlFor=""> DEFENSE
                </label>
                    <input className={style.rangeInput} type="range" name="defense" min="1" max="100" required value={form.defense} onChange={handleInputChange} />
                    <span id="hp-value">{form.defense}</span>
                </div>

                <div className={style.rangeDiv}>
                <label htmlFor=""> SPEED
                </label>
                    <input className={style.rangeInput} type="range" name="speed" min="1" max="100" required value={form.speed} onChange={handleInputChange} />
                    <span id="hp-value">{form.speed}</span>
                </div>

                <div className={style.rangeDiv}>
                <label htmlFor=""> HEIGHT
                </label>
                    <input className={style.rangeInput} type="range" name="height" min="1" max="500" required value={form.height} onChange={handleInputChange} />
                    <span id="hp-value">{form.height}</span>
                </div>

                <div className={style.rangeDiv}>
                <label htmlFor=""> WEIGHT
                </label>
                    <input className={style.rangeInput} type="range" name="weight" min="1" max="1000" required value={form.weight} onChange={handleInputChange} />
                    <span id="hp-value">{form.weight}</span>
                </div>




            </div>
            <div className={style.buttonDiv}>
                <button type="submit" disabled={letcreate}>CREATE POKEMON</button>
            </div>
        </form>
        </div>
    )
}

export default Form;