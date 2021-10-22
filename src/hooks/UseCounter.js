import { useState } from 'react'
import { UseLocalStorage } from './UseLocalStorage';


export const UseCounter = (initialState = 1) => {
    
    const [state, setState] = useState(initialState);

    const { actualizar, stateTotal, deleteStorage } = UseLocalStorage()

    const increment = (id) => {
        setState(state + 1)
        actualizar(id,true)
    }

    const decrement = (id) => {
        if(state > 1){
            setState(state - 1)
            actualizar(id,false)
        }
    }
    
    const deleteS = (id) => {
        deleteStorage(id)
    }

    return {
        state,
        increment,
        decrement,
        stateTotal,
        deleteS
    }
}
