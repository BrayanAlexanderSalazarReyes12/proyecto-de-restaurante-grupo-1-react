import React from 'react'
import { UseCounter } from '../../hooks/UseCounter'

export const CartProd = ({
    id, titulo, descripcion, precio, cantidad, onAction, onDelt
}) => {

    
    const { state, increment, decrement, deleteS } = UseCounter(cantidad);
    

    const handleincrement = (id, precio) => {
        increment(id)
        onAction(precio)
    }

    const handledecrement = (id, precio) => {
        if(state > 1){
            decrement(id)
            onAction(-precio)
        }
        
    }

    const handleDelete = (id,cantidad) => {
        deleteS(id) // Eliminar del storage
        onDelt(id,cantidad)
    }
    
    return (
        
        <div className="producto" id="producto">
            <img className="col-5" src="" alt="" />
            <div className="descripcion col-7 position-relative">
                <div className="d-flex">
                    <strong id="cambiar_tamaño" className="col-6 titulo col-4">{titulo}</strong>
                    <strong className="col-6 precio text-end">$20.000</strong>
                </div>
                <p className="text-break text-wrap">lorem ipsum dolor sit amet, consect lorem ipsum dolor sit amet, consect lorem ipsum dolor sit amet, consect lorem ipsum dolor sit amet, consect lorem ipsum dolor sit amet, consect lorem ipsum dolor sit amet, consect</p>
                <div className="w-100 d-flex justify-content-around position-absolute">
                    <div className="add_delet">
                        <small onClick={()=>  handledecrement(id, precio)}>-</small>
                        <small >{state}</small>
                        <small onClick={() => handleincrement(id, precio)}>+</small>
                    </div>
                    <div className="iconos">
                        <i onClick={() => handleDelete(id,state)} className="far fa-trash-alt" id="eliminar"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}
