import React from 'react'
import { Link, NavLink } from "react-router-dom";
import './css/navbar.css'

export const Navbar = () => {
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
                                <NavLink className="nav-link" activeClassName="active" exact to="/inicio">
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="active" exact to="/nosotros">
                                    Nosotros
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="active" exact to="/menu">
                                    Menu
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="active" exact to="/servicios">
                                    Servicios
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="active" exact to="/contactanos">
                                    Contactanos
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="active" exact to="/reservas">
                                    Reservas
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="active" exact to="/mapa">
                                    Mapa
                                </NavLink>
                            </li>

                        </ul>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-light" type="submit">Search</button>
                        </form>
                        <NavLink style={Admin}  className="nav-link d-flex justify-content-center align-items-center" activeClassName="active" exact to="/login">
                                    ADM
                                </NavLink>
                    </div>
                </div>
            </nav>
        </header>
    )
}


const Admin= {
    width: '50px',
    height:'50px',
    border: '1px solid white',
    borderRadius: '50%',
    padding:'5px',
    marginLeft: '15px',
    
   
}