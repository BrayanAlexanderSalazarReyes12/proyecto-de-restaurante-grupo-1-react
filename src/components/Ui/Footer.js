import React from 'react'
import './css/footer.css'
import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-md-6">
                        <h6 className="text-footer" >CONTACTO:</h6>
                        <h6 className="text-muted">
                            Direccion<br />
                            XXXXXXXXXXXXX<br />
                            Teléfonos: XXXXXXXXX – XXXXXXXXX.<br />
                        </h6>
                    </div>
                    <div className="col-xs-12 col-md-6">
                        <div className="pull-right">
                            <h6 className="text-footer">ENCUENTRANOS EN LAS REDES</h6>
                            <div className="redes-footer">
                                <Link to="/">
                                    <i className="fab fa-facebook"></i>
                                </Link>
                                <Link to="/">
                                    <i className="fab fa-twitter"></i>
                                </Link>
                                <Link to="/">
                                    <i className="fab fa-youtube"></i>
                                </Link>
                            </div>
                        </div>
                        <div className="row">
                            <p className="text-muted small text-right">XXXXXXXXXXXXXXXXX.<br />
                                Todos los derechos reservados®</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
