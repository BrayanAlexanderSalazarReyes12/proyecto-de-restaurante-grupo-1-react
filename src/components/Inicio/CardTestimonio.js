import React from 'react'
import { useMediaQuery } from '../../hooks/useMediaQuery'

export const CardTestimonio = ({img,texto}) => {

    const mediaQ1 = useMediaQuery('(max-width: 720px)')
    const defaultI = 'https://firebasestorage.googleapis.com/v0/b/restaurantetic21.appspot.com/o/carousel%2Fdefault-featured-image.jpg?alt=media&token=525b974e-724a-44c4-8821-c8fae2286fe3'
    return (
        <>
            <div style={item} className="position-relative item d-flex flex-column flex-md-row">
                <div style={query1.container(mediaQ1)} className="col-4 d-flex justify-content-center align-items-center">
                    <img style={imagen} src={img === '' ? defaultI : img} alt="" />
                </div>
                <div style={query1.container(mediaQ1)} className="h-100 col-8 d-flex align-items-center justify-content-sm-center">
                    <p className="text-break m-0 text-center">{texto}</p>
                </div>
            </div>
        </>
    )
}


const query1 = {
    container:  (mediaQ1) => ({
        width: (mediaQ1) ? '100%' : ''
    })
}

const item = {
    minWidth: '100%',
}

const imagen = {
    objectFit: 'cover',
    width: '80px',
    height: '80px',
    borderRadius: '50%'
}
