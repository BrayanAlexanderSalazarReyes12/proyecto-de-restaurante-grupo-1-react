import { useState} from 'react'

export const UseOpen = () => {
    
    const [action, setOpen] = useState(false)
    const [toast, setToast] = useState(false)
    const [data, setData] = useState({
        titulo: '',
        mensaje: ''
    })

    const handleAction = (loading) => {
        setOpen(loading)
    }
    const handleData  = ({titulo, mensaje}) => {
        setData({
            titulo: titulo,
            mensaje: mensaje
        })
    }

    return {
        action,
        data,
        toast,
        handleData,
        setToast,
        handleAction
    }
}
