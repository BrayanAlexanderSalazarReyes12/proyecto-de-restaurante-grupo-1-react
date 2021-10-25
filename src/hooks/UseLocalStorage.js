import { useState } from 'react'


const suma_total = (data) => {
        let sumaTotal = 0;

        data.forEach(p => {
            sumaTotal = sumaTotal + p.count * p.precio
        });

        return sumaTotal;
}

export const UseLocalStorage = () => {

    let initialState = JSON.parse(window.localStorage.getItem('productos')) || []
    if(localStorage.getItem('productos') === undefined || !localStorage.getItem('productos')){
        initialState = []
    }
    /* const initialState = [
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
    ] */
    const totalPagar = suma_total(initialState)
    
    const [storage, setStorage] = useState({
        data: [...initialState],
        total: totalPagar
    });
    
    const actualizar = (id,action) => {

        //True = sumar; False = Restar
        let productEncontrado = storage.data.filter(p => p.id === id)
        
        if(productEncontrado){
            if(action){ // True Incrementar producto en el localStorage
                
                setStorage({
                    ...storage,
                    total:  storage.total + productEncontrado[0].precio
                })
                //setTotal(stateTotal + productEncontrado[0].precio)
                productEncontrado[0].count++
                
            }else{ // False Decrementar el producto en localStorage
                setStorage({
                    ...storage,
                    total:  storage.total - productEncontrado[0].precio
                })
                //setTotal(stateTotal - productEncontrado[0].precio)
                productEncontrado[0].count--
            }
            console.log()
            let auxArr = storage.data.filter(p => p.id !== id)
            auxArr.unshift(...productEncontrado)
            setStorage({
                ...storage,
                data: auxArr
            }) // Actualizar el nuevo estado
            localStorage.setItem("productos", JSON.stringify(storage.data ) )
        }
        
        
    }

    const deleteStorage = (id, cantidad) => {
        //let newProducts = storage.data
        let aux = storage.data.filter(p => p.id === id)
        let resta = cantidad * aux[0].precio
        console.log(cantidad +"-"+ aux[0].precio)
        let newArr = storage.data.filter(p => p.id !== id)
        console.log(...newArr)
        setStorage({
            data: newArr,
            total: storage.total - resta
        })
        console.log(storage)
        /* let newStorage = storage.data.filter(p => p.id !== id)
        setStorage({
            data: newStorage,
            total:  storage.total
        }) */
        localStorage.setItem("productos", JSON.stringify(storage.data))
    }

    


    return {
        actualizar,
        storage,
        setStorage,
        deleteStorage
    }


}
