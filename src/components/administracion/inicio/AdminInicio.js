import React from 'react'




import './css/adminInicio.css'

import { Carousel } from './Carousel';
import { Propuesta } from './Propuesta';
import { Recomendaciones } from './Recomendaciones';
import { Testimonios } from './Testimonios';

export const AdminInicio = () => {


    return (
        <>
            <section className="ctn" id="Home">
                {/* * Carousel de imagenes */}
                    <Carousel />
                {/* * Carousel de imagenes */}
                {/* ********************************* */}

                {/* ********************************* */}
                {/* Nustra propuesta */}
                    <Propuesta path={true}/>
                {/* Nustra propuesta */}
                {/* ********************************* */}
                
                {/* ********************************* */}
                {/* Recomendaciones */}
                    <Recomendaciones />
                {/* Recomendaciones */}
                {/* ********************************* */}

                {/* ********************************* */}
                {/* Nustra propuesta */}
                    <Propuesta path={false}/>
                {/* Nustra propuesta */}
                {/* ********************************* */}

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