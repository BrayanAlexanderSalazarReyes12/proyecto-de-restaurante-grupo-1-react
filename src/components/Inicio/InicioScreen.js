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

export const InicioScreen = () => {

    const [slideImg, setSlideImg] = useState([])

    useEffect(() => {
        const docRef = app.database().ref('inicio/carousel')
        docRef.on('value', (img) => {
            const all = img.val();
            let arrayImg = []
            for (const id in all) {
                arrayImg.push({ id,...all[id] })
            }
            setSlideImg(arrayImg)
        })
    }, [])
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
