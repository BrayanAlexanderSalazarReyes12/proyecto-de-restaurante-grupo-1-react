import React, { useEffect, useState } from 'react'
import { UseFetch } from '../../hooks/UseFetch';

export const Propuesta = () => {

    const [state, setState] = useState([])

    useEffect(() => {
        fetch(`https://restaurante2021.herokuapp.com/api/propuesta`)
        .then( res => res.json() )
        .then( data => {
            setState(data[0])
        })
    }
    ,[])

    return (
        <>
            <div class="main_prensent justify-content-center">
                <img src={state.ImgPropuesta} alt="" width="100%" height="450px" />  
                <div class="txt_pre" style={mensaje}>
                    <h1>{state.TituloPropuesta}</h1>
                    <p className="textoo">{state.TextoPropuesta}</p>
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
