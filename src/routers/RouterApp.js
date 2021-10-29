import React, { useContext } from 'react'
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import './css/Router.css'

import { DashboardRoute } from './DashboardRoute';
import { AdministracionRoute } from './AdministracionRoute';
import { Login } from './../components/login/Login';
import { PrivateRoute } from './PrivateRoute';
import { AuthContext } from '../auth/AuthContext';


export const RouterApp = () => {

    const { user } = useContext(AuthContext)
    

    return (
        <Router>

            <div className="router">
                <Switch>
                    
                    <Route path="/login"  component={ Login } />
                    
                    <PrivateRoute
                                path="/admin"  
                                component={ AdministracionRoute } 
                                isAuth={ user.login }
                                />
                    
                    <Route path="/" component={ DashboardRoute } />
                    
                    <Redirect to="/"/> 
                
                </Switch>
                
            </div>

            {/* <Footer /> */}
            
        </Router>
    )
}

