import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { FormularioTarea } from "./components/Formulario-tarea/FormularioTarea";
import { Tarea } from "./components/Tarea/Tarea";
import { useReducer } from "react";
import { tareaReducer } from "./reducers/tareaReducer";
import { useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";
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
        if(descripcion){
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
        }else{
            Swal.fire(
                'No ingresaste nada Idiota',
                'Ingresa algo!!!!',
                'error'
            )
        }
        setDescripcion("")
    };
    const handleCambiar=(id)=>{
        dispatch({
            type:"cambiar",
            payload: id
        })
    }
    const handleEliminar=(id)=>{
        Swal.fire({
            title: 'Estas Seguro de Borrar?',
            text: "Una vez eliminado no recuperaras lo eliminado!!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borralo!'
            }).then((result) => {
            if (result.isConfirmed) {
                dispatch({
                    type: "borrar",
                    payload: id
                })
                Swal.fire(
                'Borrado',
                'La tarea ha sido borrado con exito',
                'success'
                )
            }
            })
    }
    let terminadas=0
    for (let i = 0; i < state.length; i++) {
        if (state[i].realizado===true) {
            terminadas++
        }
        
    }
    let porcentaje=terminadas/state.length
    if (!porcentaje) {
        porcentaje=0;
    }
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
