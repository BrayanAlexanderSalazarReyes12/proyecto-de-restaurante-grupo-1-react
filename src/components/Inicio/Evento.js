import React,{ useState, useEffect } from 'react'
import { UseFetch } from '../../hooks/UseFetch';


export const Evento = () => {
    
    const [ da, setData ] = useState([])

    useEffect(() => {
        fetch( `https://restaurante2021.herokuapp.com/api/eventos`)
        .then( res => res.json() )
        .then( data => {
            setData(data[0])
        })
        }
    ,[])
    

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