export const Tarea = ({tarea,index,handleCambiar,handleEliminar,id}) => {
    return (
        <>
            <div className="col">
                <div className={tarea.realizado?"card bg-success":"card bg-secondary"} style={{width: "18rem"}}>
                    <div className="card-body">
                        <h5 className="card-title">Tarea {index+1}</h5>
                        <p className="card-text">{tarea.descripcion}</p>
                        <hr />
                        <div className="d-grid gap-2">
                            <button className="btn btn-dark" type="button" onClick={() => handleEliminar(id)}>Borrar</button>
                            <button className="btn btn-info" type="button" onClick={() => handleCambiar(id)}>{tarea.realizado?"Marcar como inconlcusa":"Marcar como terminada"}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
