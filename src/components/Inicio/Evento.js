import React,{ useState, useEffect } from 'react'
import { UseFetch } from '../../hooks/UseFetch';
import { app } from './../../data/bd';

export const Evento = () => {
    
    const [ da, setData ] = useState([])
    const { data } = UseFetch(`https://localhost:44380/api/eventos`)
    useEffect(() => {
        if(!!data){
            setData(data[0])
        }
    }, [data])

    return (
        <>
            <div class="main_prensent justify-content-center position-relative">
                    
                    <img style={img} src={da.ImgEventos} alt="" />  
                    
                    <div class="position-absolute text-center" style={mensaje}>
                        <h1>{da.TituloEvento}</h1>
                        <p className="textoo">{da.TextoEvento}</p>
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