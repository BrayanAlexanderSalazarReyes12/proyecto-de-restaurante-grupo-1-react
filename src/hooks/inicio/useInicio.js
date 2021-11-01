import {useState} from 'react'
import { getCarruselImg } from '../../data/Admin/Inicio/getCarruselImg';

const dataCarrusel = async() => {
    
    const resp = await getCarruselImg()
    return resp
}

export const UseInicio = () => {
    let initialState = []

    dataCarrusel().then((data) => {
        initialState.push(...data)
    })
    
    const [ imagen, setImage ] = useState(initialState)

    return {
        imagen,
        setImage
    }
}
