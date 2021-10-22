import { useState } from 'react'

const init = () => {
    return JSON.parse(localStorage.getItem('productos')) || []
}


export const UseLocalStorage = () => {

    //const initialState = init()
    
    const initialState = [
        {
            id: 1,
            titulo: "Titulo 1",
            descripcion: "Lorem Lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem",
            precio: 20.000,
            cantidad: 1
        },
        {
            id: 2,
            titulo: "Titulo 2",
            descripcion: "Lorem Lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem",
            precio: 20.000,
            cantidad: 1
        },
        {
            id: 3,
            titulo: "Titulo 3",
            descripcion: "Lorem Lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem",
            precio: 20.000,
            cantidad: 1
        },
        {
            id: 4,
            titulo: "Titulo 4",
            descripcion: "Lorem Lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem",
            precio: 20.000,
            cantidad: 1
        }
    ]
    
    
    const [storage, setStorage] = useState(initialState);

    

    const initialTotal = () => {
        
        let sumaTotal = 0;

        storage.forEach(p => {
            sumaTotal = sumaTotal + p.cantidad * p.precio
        });

        return sumaTotal;
    }   


    const [stateTotal, setTotal] = useState(initialTotal);
    
    const actualizar = (id,action) => {
        //True = sumar; False = Restar
        let productEncontrado = initialState.filter(p => p.id === id)
        
        if(productEncontrado){
            if(action){ // True Incrementar producto en el localStorage
                console.log(stateTotal +" + "+ productEncontrado[0].precio)
                setTotal(stateTotal + productEncontrado[0].precio)
                productEncontrado[0].cantidad++
            }else{ // False Decrementar el producto en localStorage
                setTotal(stateTotal - productEncontrado[0].precio)
                productEncontrado[0].cantidad--
                console.log("--: " + stateTotal)
            }
            
            let auxArr = initialState.filter(p => p.id !== id)
            auxArr.unshift(...productEncontrado)
            setStorage(auxArr) // Actualizar el nuevo estado
            localStorage.setItem("productos", JSON.stringify(auxArr ) )
        }
        
        
    }

    const deleteStorage = (id) => {
        let newStorage = storage.filter(p => p.id !== id)
        setStorage(newStorage)
        localStorage.setItem("productos", JSON.stringify(newStorage))
    }

    


    return {
        storage,
        actualizar,
        stateTotal,
        setTotal,
        deleteStorage
    }


}
