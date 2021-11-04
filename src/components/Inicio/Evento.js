import React,{ useState, useEffect } from 'react'
import { app } from './../../data/bd';

export const Evento = () => {
    
    const [ data, setData ] = useState([])
    
    useEffect(() => {
        const docRef = app.database().ref('inicio/evento')
            docRef.on('value', (img) => {
                const all = img.val();
                setData(all)
            })
    }, [])

    return (
        <>
            <div class="main_prensent justify-content-center position-relative">
                    
                    <img style={img} src={data.img} alt="" />  
                    
                    <div class="position-absolute text-center" style={mensaje}>
                        <h1>{data.titulo}</h1>
                        <p className="textoo">{data.texto}</p>
                    </div>
                    
            </div>
        </>
    )
}


const mensaje = {
    border: '1px solid white',
    width: '90%',
    backdropFilter: 'blur(6px)',
    borderRadius: '10px',
    color: 'black',
    padding: '10px 20px',
}

const img = {
    width: '100%',
    height: '450px',
    objectFit: 'cover'
}