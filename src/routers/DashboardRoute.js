import React from 'react'
import { Redirect, Route, Switch } from 'react-router';
import { Carrito } from '../components/carrito/Carrito';
import { Contactanos } from '../components/contactanos/Contactanos';
import { InicioScreen } from '../components/Inicio/InicioScreen';
import { Mapa } from '../components/mapa/Mapa';
import { Menu } from '../components/menu/Menu';
import { Nosotros } from '../components/nosotros/Nosotros';
import { Reservas } from '../components/reservas/Reservas';
import { Servicios } from '../components/servicios/Servicios';
import { BtnCart } from '../components/Ui/BtnCart';
import { Navbar } from '../components/Ui/Navbar';
import { Redes } from '../components/Ui/Redes';
import { Footer } from './../components/Ui/Footer';
import './css/Router.css'

export const DashboardRoute = () => {
    return (
        <>
        <Navbar />
            <div className="router">
                <Switch>

                    <Route exact path="/inicio" component={ InicioScreen } />
                    
                    <Route exact path="/nosotros"    component={ Nosotros } />

                    <Route exact path="/menu"        component={ Menu } />

                    <Route exact path="/servicios"   component={ Servicios } />

                    <Route exact path="/contactanos" component={ Contactanos } />

                    <Route exact path="/reservas"    component={ Reservas } />

                    <Route exact path="/mapa"        component={ Mapa } />

                    <Route exact path="/carrito"     component={ Carrito } />
                    
                    <Redirect to="/inicio"/>
                
                </Switch>
                
                <Redes /> 

                <BtnCart /> {/*  */}

            </div>
                <Footer />
        </>
    )
}
