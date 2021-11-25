import React from 'react'
import './css/cardCarousel.css'
export const CardCarousel = ({ img_acordion, idacordion, onAction }) => {

    const handleModal = (d) => {
        //* Abrir modal
        onAction(img_acordion,idacordion,d)
    }

    return (
        <>
            <div className="slideImg s1" id={idacordion}>
                <small onClick={() => handleModal(false)} className="edit-img position-absolute">
                    <i class="far fa-images"></i>
                    <small className="edit">Editar</small>
                </small>
                <small onClick={() => handleModal(true)} className="delete-img position-absolute">
                    <i class="far fa-trash-alt"></i>
                    <small className="delete">Eliminar</small>
                </small>
                <img src={ img_acordion } style={imagen} className="d-block w-100 h-100" alt="imagen1"  />
            </div>
        </>
    )
}


const imagen = {
    objectFit: 'cover'
}

