import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Servicios.css'
import { app } from '../../data/bd'
import { CardServices } from './cardServices'

export const Servicios = () => {


    const carpeta = 'Servicios';
    const [ servicios, setServicios ] = useState([])


    useEffect(() => { // Obtener datos de la base de datos
        const docRef = app.database().ref(carpeta)
        docRef.on('value', (data) => {
            const all = data.val();
            let arrayImg = []
            for (const id in all) {
                arrayImg.push({ id,...all[id] })
            }
            
            setServicios(arrayImg)
        })
    },[])


    return (
        <>
    <div className="" id="servicios">
        <section id="Servicios" className="servicios row m-1">
            <div className="texto col-12 col-md-6 d-flex justify-content-center">
                <div>
                    <h1 className="text-center">Servicios</h1>
                    <p className="text-center">Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                        Esse eius, architecto ipsum delectus placeat odit veritatis reprehenderit vero
                        assumenda id? Laborum quo numquam nihil enim, odit consequatur quasi cum.
                        Exercitationem odit ea qui quo fugit id ipsa quos voluptatum, beatae placeat
                        culpa at dolorum consequatur tempore facere modi quasi. Nobis?</p>
                        <Link to="/reservas"><button>¡Reserva Ahora!</button></Link>
                </div>
            </div>
            <div className="serviciosof col-12 col-md-6">
                <div className="Servicios_card ">
                    <div className="container">
                        <div id="cards" className="row">
                            
                            {
                                servicios.map(servicio => (
                                <CardServices
                                key={servicio.id} {...servicio}/>
                                ))
                            }
                        
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
        </>
    )
}
