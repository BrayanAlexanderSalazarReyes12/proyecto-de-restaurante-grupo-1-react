import React from 'react'
import './css/btnCart.css'
import { Link } from "react-router-dom";

export const BtnCart = () => {
    return (
        <Link to="/carrito" class="icon-carrito" id="carrito_de_compras">
            <small id="num_cart" class="num_cart"></small>
            <i class="fas fa-cart-arrow-down w-100 h-100 d-flex justify-content-center align-items-center"
            data-bs-toggle="modal" href="#exampleModalToggle"></i>
        </Link>
    )
}
