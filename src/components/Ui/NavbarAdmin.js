import React, { useContext } from 'react'
import { Link, NavLink, useHistory } from "react-router-dom";
import { AuthContext } from '../../auth/AuthContext';
import './css/navbar.css'
import { types } from './../../types/types';
import { useFirebaseApp } from 'reactfire';
import { getAuth, signOut } from 'firebase/auth'

export const NavbarAdmin = () => {

    const { user, dispatch} = useContext(AuthContext)
    const firebase = useFirebaseApp()

    const history = useHistory()
    const auth = getAuth();

    const handleLogout = async () => {

        signOut(auth).then(() => {
            dispatch({
                types: types.logout
            })
    
            history.replace("/login")
        }).catch((error) => {
            alert("Error al cerrar sesion" + error)
        });

        
    }

    return (
        <header>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">

                    <Link className="navbar-brand" to="/inicio">
                        Restaurante
                    </Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <i className=" text-white fas fa-bars"></i>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 animate__animated animate__fadeIn">
                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="active" exact to="/admin/inicio">
                                    Inicio
                                </NavLink>
                            </li>
                            
                        </ul>

                        <div>
                            <strong className="m-2 text-white">
                                {user.name}
                            </strong>
                            <button onClick={handleLogout} className="btn btn-outline-light" type="button">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
