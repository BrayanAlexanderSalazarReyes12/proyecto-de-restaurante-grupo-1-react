import React, { useState, useEffect } from 'react'
import { app } from '../../data/bd'
import { Carousel } from './Carousel'

//import { UseInicio } from '../../hooks/inicio/useInicio'
import './css/inicioScreen.css'
import { Propuesta } from './Propuesta'
import { CardRecom } from './CardRecom';
import { Recomendaciones } from './Recomendaciones'
import { Evento } from './Evento'
import { Testimonios } from './Testimonios'
import { UseFetch } from '../../hooks/UseFetch'

export const InicioScreen = () => {
   /*  const { data } = UseFetch(`https://localhost:44380/api/inicio`,{
        method: 'POST',
        body: JSON.stringify({"img_acordion": "Funciona Plisss"})
    })

    
    useEffect(() => {
        console.log(data)
    }, [data]) */
    return (
        <>
            <section class="ctn" id="Home">
                <div class="main_carr">
                    {/* Carousel de imagenes */}
                        <Carousel />
                    {/* Carousel de imagenes */}
                </div>

                {/* Propuesta */}
                    <Propuesta />
                {/* Propuesta */}

                {/* Recomendaciones */}
                    <Recomendaciones />
                {/* Recomendaciones */}

                {/* Evento */}
                    <Evento />
                {/* Evento */}

                {/* Testimonios */}
                    <Testimonios />
                {/* Testimonios */}
    
            </section>
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
