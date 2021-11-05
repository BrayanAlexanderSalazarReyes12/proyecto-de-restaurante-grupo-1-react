import React from 'react'
import { Link } from 'react-router-dom'

export const CardServices = ({id,nombreServicio, descripcion, img}) => {

    return (
        <>
            <div className="cards_serv_usuario col-lg-6">
                <div className="card card-">
                    <img id="img-card" src={img} className="card-img-top card-imf-radius"  width="285" height="202" alt="Esto es una imagen"></img>
                    <div className="card-body">
                        <h5 className="card-title">{nombreServicio}</h5>
                        <p className="card-text">{descripcion}</p>
                        <Link to="/contactanos"><button>¿Preguntas? Contactanos</button></Link>
                        
                    </div>
                </div>
            </div>
        </>
    )
}