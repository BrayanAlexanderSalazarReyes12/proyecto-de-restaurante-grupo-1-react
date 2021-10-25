import React from 'react'
import { Link } from 'react-router-dom'
import './mapa.css'
import GoogleMaps from "simple-react-google-maps";

export const Mapa = () => {
    return (
        
        <>
        <div className="txt_mapa"><h2>Mapa Del Sitio</h2></div>
        <div className="container">
            
            <div className="lista_mapa border-danger row col-xs-12 col-md-12">
                <div className="col-md-2">
                    <br></br>
                    <Link to="/inicio">
                        <h5>GENERAL</h5>
                    </Link>
                    <Link to="/inicio">Inicio</Link>
                </div>
                <div className="col-md-2">
                    <br></br>
                    <Link to="/nosotros"><h5>NOSOTROS</h5></Link>
                    <Link to="/nosotros">Nuestra Historia</Link>
                    <br></br>
                    <Link to="/nosotros">Nuestra Propuesta</Link>
                </div>
                <div className="col-md-2">
                    <br></br>
                    <Link to="/menu"><h5>MENÚ</h5></Link>
                    <Link to="/menu">Ensaladas</Link>
                    <br></br>
                    <Link to="/menu">Bebidas</Link>
                    <br></br>
                    <Link to="/menu">Aperitivos</Link>
                    <br></br>
                    <Link to="/menu">Sopas</Link>
                    <br></br>
                    <Link to="/menu">Postres</Link>
                </div>
                <div className="col-md-2">
                    <br></br>
                    <Link to="/servicios">
                        <h5>SERVICIOS</h5>
                    </Link>
                    <Link to="/servicios">Cumpleaños</Link>
                    <br></br>
                    <Link to="/servicios">Aniversarios</Link>
                    <br></br>
                    <Link to="/servicios">Fiestas Infantiles</Link>
                    <br></br>
                    <Link to="/servicios">Declaraciones y Propuestas</Link>
                    <br></br>
                    <Link to="/servicios">Despedidas</Link>
                    <br></br>
                    <Link to="/servicios">Cena con Amigos</Link>
                </div>
                <div className="col-md-2">
                    <br></br>
                    <Link to="/contactanos">
                        <h5>CONTACTO</h5>
                    </Link>
                </div>
            </div>


            <div className="mapa_lugar">
                <div className="txt_mapa"><h2>Ubicanos</h2></div>
                <GoogleMaps
                    apiKey={"AIzaSyD_vldU89p9AHSTmRUSQwukMpp6DI6daOg"}
                    style={{height:"300px", width:"1100px"}}
                    zoom={15}
                    center={{
                        lat:4.647255, 
                        lng:-74.107864
                    }}
                    markers={{lat:4.647255, lng:-74.107864}}
                />
            </div>
        </div>
    </>
    
    )
}
