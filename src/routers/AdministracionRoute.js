import React from 'react'
import { Redirect, Route, Switch } from 'react-router';


import { AdminInicio } from '../components/administracion/inicio/AdminInicio';
import { AdminMenu } from '../components/administracion/menu/AdminMenu';
import { AdminNosotros } from '../components/administracion/nosotros/AdminNosotros';
import { AdminServicios } from '../components/administracion/servicios/AdminServicios';
import { Adminreservas } from '../components/administracion/reservas/Adminreservas';
import { NavbarAdmin } from '../components/Ui/NavbarAdmin';
import './css/Router.css'

export const AdministracionRoute = () => {
    return (
        <>
        <NavbarAdmin />
            <div className="router">
                <Switch>

                    <Route path="/admin/inicio"         component={ AdminInicio } />

                    <Route exact path="/admin/nosotros" component={ AdminNosotros } />
                    
                    <Route exact path="/admin/menu"      component={ AdminMenu } />

                    <Route exact path="/admin/servicios"  component={ AdminServicios } />

                    <Route exact path="/admin/reservas"  component={ Adminreservas } />
                    
                    <Redirect to="/admin/inicio"/>
                
                </Switch>
            </div>
        </>
    )
}

