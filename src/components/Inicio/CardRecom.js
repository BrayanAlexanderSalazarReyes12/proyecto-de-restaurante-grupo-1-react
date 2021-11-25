import React from 'react'

export const CardRecom = ({ IdRecom,TituloRecom,TextoRecom,ImgRecom }) => {

    return (
        <>
            <div className="col">
                <div className="card">
                    <img src={ImgRecom} className="card-img-top" alt={TituloRecom} />
                    <div className="card-body">
                        <h5 class="card-title">{TituloRecom}</h5>
                        <p class="card-text">{TextoRecom}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
