import React from 'react'

export const CardPlatos = ({
    IdRecom,TituloRecom, TextoRecom, ImgRecom,setOpen, onAction}) => {


        const handleEditar = () => {
            setOpen(true)
            const data = {
                IdRecom,
                ImgRecom,
                TituloRecom, 
                TextoRecom
            }
            onAction(data)
        }

    return (
        <>
            <div className="col">
                <div className="card">
                    <img src={ImgRecom} className="card-img-top" alt={TituloRecom} />
                    <div className="card-body">
                        <h5 class="card-title">{TituloRecom}</h5>
                        <p class="card-text">{TextoRecom}</p>
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
