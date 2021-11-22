import React, { useEffect, useState } from 'react'
import { app } from '../../data/bd'
import { UseFetch } from '../../hooks/UseFetch'
import { CardRecom } from './CardRecom'

export const Recomendaciones = () => {

    const carpeta = 'inicio/recomendaciones'
    const [ platos, setPlatos ] = useState([])

    const { data } = UseFetch(`https://localhost:44380/api/recomendaciones`)

    useEffect(() => { // Obtener datos de la base de datos
        if (!!data) {
            setPlatos(data)
            console.log(data)
        }
        
    },[data])

    return (
        <>
            <section id="recomendaciones">
                <div class="container">
                    <div class="row">
                    <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 p-5">
                        <h1 class="ca_title">Recomendaciones del chef</h1>
                        <br/><br/>
                        <div class="row row-cols-1 row-cols-md-2 g-4">


                            {/* Platosrecomendados por el cheft */}
                                {
                                    platos.map(plato => (
                                        <CardRecom
                                            key={plato.IdRecom} {...plato}/>
                                    ))
                                }
                            {/* Platosrecomendados por el cheft */}

                        </div>

                            </div >
                            <div className="col position-relative d-flex justify-content-center align-items-center">
                                <img src={process.env.PUBLIC_URL + '/assets/menu@2x.png'}  class="img-thumbnail" alt="menu" />
                            </div>
                    </div>
                </div>
            
            </section>
        </>
    )
}
