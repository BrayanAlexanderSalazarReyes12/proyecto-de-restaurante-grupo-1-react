import React, { useEffect, useState } from 'react'
import { app } from './../../data/bd';

export const Propuesta = () => {

    const [state, setState] = useState([])

    useEffect(() => {

        const docRef = app.database().ref('inicio/propuesta')

        docRef.on('value', (img) => {
            const all = img.val();
            setState(all)
        })
        
    },[])
    console.log(state)

    return (
        <>
            <div class="main_prensent justify-content-center">
                <img src={state.img} alt="" width="100%" height="450px" />  
                <div class="txt_pre" style={mensaje}>
                    <h1>{state.titulo}</h1>
                    <p className="textoo">{state.texto}</p>
                </div> 
            </div>
        </>
    )
}

const mensaje = {
    border: '1px solid white',
    width: '90%',
    backdropFilter: 'blur(8px)',
    borderRadius: '10px',
    color: 'black',
}
