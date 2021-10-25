import React from 'react'
import { Link } from 'react-router-dom'
import cumple from './img/img_servicios/cumpleanos.webp'
import aniversarios from './img/img_servicios/aniversarios.webp'
import cumple_infantil from './img/img_servicios/infantil.webp'
import declaracion from './img/img_servicios/declaraciones.webp'
import despedida from './img/img_servicios/despedidas.webp'
import cena_amigos from './img/img_servicios/cena_amigos.webp'
import './Servicios.css'

export const Servicios = () => {
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
                        <div className="row row-cols-1 row-cols-md-3 g-4">
                            <div className="col col-lg-6">
                                <div className="card card-">
                                    <img src={cumple} className="card-img-top card-imf-radius"  width="285" height="202" alt="Esto es una imagen"></img>
                                    <div className="card-body">
                                        <h5 className="card-title">Celebración de cumpleaños</h5>
                                        <p className="card-text">This is a longer card with supporting text below as a
                                            natural lead-in to additional content. This content is a little bit longer.
                                        </p>
                                        <Link to="/contactanos"><button>¿Preguntas? Contactanos</button></Link>
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="col col-lg-6">
                                <div className="card card-">
                                    <img src={aniversarios} className="card-img-top card-imf-radius" width="285" height="202" alt="Esto es una imagen"></img>
                                    <div className="card-body">
                                        <h5 className="card-title">Aniversarios</h5>
                                        <p className="card-text">This is a longer card with supporting text below as a
                                            natural lead-in to additional content. This content is a little bit longer.
                                        </p>
                                        <Link to="/contactanos"><button>¿Preguntas? Contactanos</button></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col col-lg-6">
                                <div className="card card-">
                                    <img src={cumple_infantil} className="card-img-top card-imf-radius" width="285" height="202" alt="Esto es imagen"></img>
                                    <div className="card-body">
                                        <h5 className="card-title">Fiestas infantiles</h5>
                                        <p className="card-text">This is a longer card with supporting text below as a
                                            natural lead-in to additional content.This content is a little bit longer.
                                            </p>
                                            <Link to="/reservas"><button>¿Preguntas? Contactanos</button></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col col-lg-6">
                                <div className="card card-">
                                    <img src={declaracion} className="card-img-top card-imf-radius" width="285" height="202" alt="Esto es una imagen"></img>
                                    <div className="card-body">
                                        <h5 className="card-title">Declaraciones y propuestas</h5>
                                        <p className="card-text">This is a longer card with supporting text below as a
                                            natural lead-in to additional content. This content is a little bit longer.
                                        </p>
                                        <Link to="/contactanos"><button>¿Preguntas? Contactanos</button></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col col-lg-6">
                                <div className="card card-">
                                    <img src={despedida} className="card-img-top card-imf-radius" width="285" height="202" alt="Esto es una imagen"></img>
                                    <div className="card-body">
                                        <h5 className="card-title">Despedidas</h5>
                                        <p className="card-text">This is a longer card with supporting text below as a
                                            natural lead-in to additional content. This content is a little bit longer.
                                        </p>
                                        <Link to="/contactanos"><button>¿Preguntas? Contactanos</button></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col col-lg-6">
                                <div className="card card-">
                                    <img src={cena_amigos} className="card-img-top card-imf-radius" width="285" height="202" alt="Esto es una imagen"></img>
                                    <div className="card-body">
                                        <h5 className="card-title">Cena con amigos</h5>
                                        <p className="card-text">This is a longer card with supporting text below as a
                                            natural lead-in to additional content. This content is a little bit longer.
                                        </p>
                                        <Link to="/contactanos"><button>¿Preguntas? Contactanos</button></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
        </>
    )
}
