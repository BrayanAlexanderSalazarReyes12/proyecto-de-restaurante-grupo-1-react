import React from 'react'
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { InicioScreen } from '../components/Inicio/InicioScreen';
import { Footer } from '../components/Ui/Footer';
import { Navbar } from '../components/Ui/Navbar';
import './css/Router.css'
import { BtnCart } from './../components/Ui/BtnCart';
import { Nosotros } from '../components/nosotros/Nosotros';
import { Menu } from '../components/menu/Menu';
import { Servicios } from '../components/servicios/Servicios';
import { Contactanos } from '../components/contactanos/Contactanos';
import { Reservas } from '../components/reservas/Reservas';
import { Mapa } from '../components/mapa/Mapa';
import { Carrito } from '../components/carrito/Carrito';


export const RouterApp = () => {
    return (
        <Router>

            <Navbar />
            
            <div className="router">
                <Switch>

                    <Route exact path="/"            component={ InicioScreen } />

                    <Route exact path="/nosotros"    component={ Nosotros } />

                    <Route exact path="/menu"        component={ Menu } />

                    <Route exact path="/servicios"   component={ Servicios } />

                    <Route exact path="/contactanos" component={ Contactanos } />

                    <Route exact path="/reservas"    component={ Reservas } />

                    <Route exact path="/mapa"        component={ Mapa } />

                    <Route exact path="/carrito"     component={ Carrito } />

                    {/* 
                    <Route exact path="/nosotros" component={ nosotros } />
                    <Route exact path="/menu" component={ MenuScreem } />

                    <Route exact path="/search" component={ SearchScreen } />
                    */}

                    <Redirect to="/"/> 
                
                </Switch>

                <BtnCart /> {/*  */}
                
            </div>

            <Footer />
            
        </Router>
    )
}
