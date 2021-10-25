import React from 'react'
import { Link } from "react-router-dom";
import './css/redes.css'
/* style={{
    display: state.redes ? 'inline' : 'none'
  }} */
export const Redes = () => {


    return (
        <div  className="redes position-fixed animate__animated animate__slideInDown">
            <ul>
                <li>
                    <Link className="" to="/">
                        <i className="fab fa-facebook"></i>
                    </Link>
                </li>
                <li>
                    <Link className="" to="/">
                        <i className="fab fa-twitter"></i>
                    </Link>
                </li>
                <li>
                    <Link className="" to="/">
                        <i className="fab fa-youtube"></i>
                    </Link>
                    
                </li>
            </ul>
        </div>
    )
}
