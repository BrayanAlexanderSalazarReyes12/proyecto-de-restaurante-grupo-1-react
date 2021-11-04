import React from 'react'

export const CardPlatos = ({
    id,titulo, descripcion, img,setOpen, onAction}) => {


        const handleEditar = () => {
            setOpen(true)
            const data = {
                id,
                img,
                titulo, 
                descripcion
            }
            onAction(data)
        }

    return (
        <>
            <div className="col">
                <div className="card">
                    <img src={img} className="card-img-top" alt={titulo} />
                    <div className="card-body">
                        <h5 class="card-title">{titulo}</h5>
                        <p class="card-text">{descripcion}</p>
                        <div className="text-center">
                            <button type="button"
                                    onClick={handleEditar}
                                    className="btn btn-outline-success">
                                Editar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
