import React from 'react'

export const Slide = ({ img, id }) => {
    return (
        <>
            <div className="slideImg s1" id={id}>
                <img src={ img } style={imagen} className="d-block w-100 h-100" alt="imagen1"  />
            </div>
        </>
    )
}


const imagen = {
    objectFit: 'cover'
}