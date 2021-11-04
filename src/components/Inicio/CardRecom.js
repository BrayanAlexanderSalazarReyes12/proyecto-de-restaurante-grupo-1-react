import React from 'react'

export const CardRecom = ({id,titulo, descripcion, img}) => {

    return (
        <>
            <div className="col">
                <div className="card">
                    <img src={img} className="card-img-top" alt={titulo} />
                    <div className="card-body">
                        <h5 class="card-title">{titulo}</h5>
                        <p class="card-text">{descripcion}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
