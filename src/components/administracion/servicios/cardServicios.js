import React from 'react'

export const CardServicios = ({
    id,nombreServicio, descripcion, img,setOpen, onAction}) => {


        const handleEditar = () => {
            setOpen(true)
            const data = {
                id,
                img,
                nombreServicio, 
                descripcion
            }
            onAction(data)
        }

    return (
        <>
            <div className="cards_serv_usuario col-lg-6">
                <div className="cards_servicios">
                    
                    <div className="card-body ">
                    <img id="img-card" src={img} className="card-img-top card-imf-radius"  width="285" height="202" alt="Esto es una imagen"></img>
                        <h5 className="card-title">{nombreServicio}</h5>
                        <p className="card-text">{descripcion}</p>
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
