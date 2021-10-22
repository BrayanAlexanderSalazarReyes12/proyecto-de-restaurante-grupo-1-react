import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

import { UseLocalStorage } from '../../hooks/UseLocalStorage'
import { CartProd } from './CartProd'
import './css/carrito.css'
import { ModalForm } from './ModalForm'

const sty = {
    position: 'absolute'
}

const init = () => {
    const storage = JSON.parse(localStorage.getItem('productos')) || []
    let sumaTotal = 0;

    storage.forEach(p => {
        sumaTotal = sumaTotal + p.cantidad * p.precio
    });

    return sumaTotal;
}

const productosS = ( ) => {
    return JSON.parse(localStorage.getItem('productos')) || []
}

export const Carrito = () => {
    
    let productos;

    const [ storageTotal, setTotal ] = useState(init())
    
    const [state, setState] = useState(productosS())

    const [open, setOpen] = useState(false); // Modal
    const handleOpen = () => setOpen(true);
    
   // const { storage } = UseLocalStorage();



    const handleAction = (event) => {
        setTotal(storageTotal + event)
    }

    const handleDelete = (event,cantidad) => {
        let newProducts = state
        let aux = newProducts.filter(p => p.id === event)
        let resta = cantidad * aux[0].precio
        setTotal(storageTotal - resta)
        let newArr = newProducts.filter(p => p.id !== event)
        setState(newArr)
    }

    if(state.length > 0){
        productos = state.map((p) =>
                <CartProd onDelt={handleDelete} onAction={handleAction} key={p.id} {...p} /> 
        );
    }else{
        productos = <div className="alert alert-info text-center m-0" role="alert">
                        <strong>Carrito Vacio</strong>
                    </div>
    }

    

    return (
        <section className="carrito row m-0">
            <div className="carrito-total col-12 col-lg-7 d-flex justify-content-center align-items-center">
                <div id="total_cuenta" className="btn-pagar d-flex flex-column justify-content-around">
                    <div className="d-flex justify-content-around">
                        <strong className="display-6">Total</strong> 
                        <strong id="total" className="display-6">${storageTotal}</strong>
                    </div>
                    <div className="text-center d-flex flex-column">
                        
                        <button type="button" 
                                onClick={handleOpen}
                                className="btn-general"
                                data-bs-toggle="modal" 
                                data-bs-target="#exampleModal" 
                                data-bs-whatever="@mdo">Pagar Ahora</button>
                        <Link className="link-menu btn-general text-decoration-none" to="/menu">
                            Continuar Comprando
                        </Link>
                        
                    </div>
                </div>
                {/* Modal */}
                    <ModalForm  sx={sty} open={open} setOpen={setOpen}/>
                {/* Modal */}
            </div>
            
            <div className="list-prod col-12 col-lg-5 d-flex justify-content-center align-items-center">
            
                <div id="productos" className="scroll">

                    { productos }

                </div>

            </div>
        </section>
    )
}
