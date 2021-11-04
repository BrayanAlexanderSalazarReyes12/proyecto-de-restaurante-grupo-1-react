import React, { useEffect, useState } from 'react'
import { app } from '../../data/bd'
import { CardRecom } from './CardRecom'

export const Recomendaciones = () => {

    const carpeta = 'inicio/recomendaciones'
    const [ platos, setPlatos ] = useState([])

    useEffect(() => { // Obtener datos de la base de datos
        const docRef = app.database().ref(carpeta)
        docRef.on('value', (data) => {
            const all = data.val();
            let arrayImg = []
            for (const id in all) {
                arrayImg.push({ id,...all[id] })
            }
            setPlatos(arrayImg)
        })
    },[])

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
                                            key={plato.id} {...plato}/>
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
