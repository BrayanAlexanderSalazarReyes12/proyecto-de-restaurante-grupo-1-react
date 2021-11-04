import React from 'react'
import { useMediaQuery } from '../../../hooks/useMediaQuery'

export const CardTestimonio = ({onAction, img, texto, id,setOpen}) => {

    const mediaQ1 = useMediaQuery('(max-width: 720px)')

    const handleImage = (d) => {
        onAction(img,texto,id,d)
        setOpen(true)
    }
    
    return (
        <>
            <div style={item} className="position-relative item d-flex flex-column flex-md-row">
                <small style={editar} onClick={() => handleImage(false)}>
                    <i class="far fa-images"></i>
                </small>
                <small onClick={() => handleImage(true)} style={deleteImg} className=" position-absolute">
                    <i class="far fa-trash-alt"></i>
                    <small className="delete">Eliminar</small>
                </small>
                <div style={query1.container(mediaQ1)} className="col-4 d-flex justify-content-center align-items-center">
                    <img style={imagen} src={img} alt="" />
                </div>
                <div style={query1.container(mediaQ1)} className="h-100 col-8 d-flex align-items-center justify-content-sm-center">
                    <p className="text-break m-0 text-center">{texto}</p>
                </div>
            </div>
        </>
    )
}


const deleteImg = {
    border: '1px solid white',
    color: 'white',
    padding: '0.5rem',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    top: '0rem',
    right: '0rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '20px',
    background: 'red',
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

const editar = {
    position: 'absolute',
    width: '50px',
    height: '50px',
    padding: '.5rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: '.1rem',
    left: '.1rem',
    borderRadius: '50%',
    fontSize: '20px',
    background: 'rgb(68, 228, 68)',
    color: 'white',
}