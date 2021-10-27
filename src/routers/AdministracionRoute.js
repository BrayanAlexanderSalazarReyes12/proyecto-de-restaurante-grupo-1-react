import React from 'react'
import { Redirect, Route, Switch } from 'react-router';

import { Inicio } from '../components/administracion/Inicio';
import { NavbarAdmin } from '../components/Ui/NavbarAdmin';
import './css/Router.css'

export const AdministracionRoute = () => {
    return (
        <>
        <NavbarAdmin />
            <div className="router">
                <Switch>

                    <Route path="/admin/inicio" component={ Inicio } />

                    
                    <Redirect to="/admin/inicio"/>
                
                </Switch>
            </div>
        </>
    )
}

