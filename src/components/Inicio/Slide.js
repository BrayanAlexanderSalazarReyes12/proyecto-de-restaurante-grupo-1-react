import React from 'react'

export const Slide = ({ img_acordion, idacordion }) => {
    return (
        <>
            <div className="slideImg s1" id={idacordion}>
                <img src={ img_acordion } style={imagen} className="d-block w-100 h-100" alt="imagen1"  />
            </div>
        </>
    )
}


const imagen = {
    objectFit: 'cover'
}