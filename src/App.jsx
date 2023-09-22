import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { FormularioTarea } from "./components/Formulario-tarea/FormularioTarea";
import { Tarea } from "./components/Tarea/Tarea";
import { useReducer } from "react";
import { tareaReducer } from "./reducers/tareaReducer";
import { useState } from "react";
import { useEffect } from "react";
export const App = () => {
    const init=()=>{
        return JSON.parse(localStorage.getItem("tareas"))||[]
    }
    const [state, dispatch] = useReducer(tareaReducer, [], init)
    const [descripcion, setDescripcion] = useState("")
    useEffect(() => {
        localStorage.setItem("tareas",JSON.stringify(state))
    }, [state])
    const handleInputChange=(evento)=>{
        setDescripcion(evento.target.value);
        console.log(descripcion);
    }
    const handelSubmit=(evento)=>{
        evento.preventDefault();
        const tareanueva={
            id: new Date().getTime(),
            descripcion: descripcion,
            realizado: false
        }
        const action={
            type:"agregar",
            payload: tareanueva
        }
        dispatch(action);
        setDescripcion("")
    };
    const handleCambiar=(id)=>{
        dispatch({
            type:"cambiar",
            payload: id
        })
    }
    const handleEliminar=(id)=>{
        dispatch({
            type: "borrar",
            payload: id
        })
    }
    let terminadas=0
    for (let i = 0; i < state.length; i++) {
        if (state[i].realizado===true) {
            terminadas++
        }
        
    }
    let porcentaje=terminadas/state.length
    return (
        <>
            <Header/>
            <div className="container">
                <div className="row">
                    <div className="col-sm-4 md-4 lg-6 ">
                        <FormularioTarea handelSubmit={handelSubmit} handleInputChange={handleInputChange} descripcion={descripcion}/>
                    </div>
                    <div className="col-sm-8">
                        <div className="row row-cols-1 row-cols-md-2 g-4">
                            {
                                state.map((tarea,index)=>{
                                    return <Tarea key={index} handleEliminar={handleEliminar} handleCambiar={handleCambiar} tarea={tarea} id={tarea.id} index={index} />
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Footer porcentaje={porcentaje}/>
        </>
    )
}
