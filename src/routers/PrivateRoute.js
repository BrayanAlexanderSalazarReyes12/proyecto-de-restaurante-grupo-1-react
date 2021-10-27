import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'



export const PrivateRoute = ({
    component: Component,
    isAuth,
    ...rest
}) => {
    
    return (
        
        <Route {...rest} >
            {(isAuth) ? <Component /> : <Redirect to="/login"/>}
        </Route>
    )
}


PrivateRoute.prototype = {
    isAuth   : PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}

