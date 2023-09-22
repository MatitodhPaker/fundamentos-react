export const FormularioTarea = ({handelSubmit,handleInputChange,descripcion}) => {
    
    return (
        <>
            <div className="card bg-secondary" style={{width: "25rem"}}>
                <div className="card-body">
                    <h3>Agregar tarea</h3>
                    <hr />
                    <form onSubmit={(e)=>{handelSubmit(e)}}>
                        <div className="mb-3">
                            <label htmlFor="inputTarea" className="form-label">Descripcion</label>
                            <input onChange={(e)=>handleInputChange(e)} value={descripcion} type="text" className="form-control" id="inputTarea" aria-describedby="descripcionText"/>
                            <div id="descripcionText" className="form-text">Agregar descripcion de la tarea</div>
                        </div>
                        <button type="submit" className="btn btn-success container-fluid">Agregar</button>
                    </form>
                </div>
            </div>
        </>
    )
}
