import React,{ useState, useEffect } from 'react'
import { ModalPropuesta } from './ModalPropuesta';
import { app } from './../../../data/bd';

export const Propuesta = ({path}) => {

    //* ABRIRI MODAL
    const [open, setOpen] = useState(false); // Modal
    const handleOpen = () => setOpen(true);

    const handleModal = () => {
        handleOpen();
    }

    //* ABRIRI MODAL

    const [ data, setData ] = useState([])

    useEffect(() => {
        if(path){
            const docRef = app.database().ref('inicio/propuesta')
            docRef.on('value', (img) => {
                const all = img.val();
                setData(all)
            })
        }else{
            const docRef = app.database().ref('inicio/evento')
            docRef.on('value', (img) => {
                const all = img.val();
                setData(all)
            })
        }

        
        
    }, [])



    const handleResult = (data) => {
        setData(data)
    }

    return (
        <>
            <div class="main_prensent justify-content-center position-relative">
                    
                    <small style={editar} onClick={handleModal}>
                        <i class="far fa-images"></i>
                    </small>
                    
                    <img style={img} src={data.img} alt="" />  
                    
                    <div class="position-absolute text-center" style={mensaje}>
                        <h1>{data.titulo}</h1>
                        <p className="textoo">{data.texto}</p>
                    </div>
                    
            </div>

            {open && (
                <ModalPropuesta onAction={handleResult} 
                                data={data}
                                path={path} 
                                open={open} 
                                setOpen={setOpen}/>
            )}
            
        </>
    )
}



/* Estilos css */
const mensaje = {
    border: '1px solid white',
    width: '90%',
    backdropFilter: 'blur(6px)',
    borderRadius: '10px',
    color: 'black',
    padding: '10px 20px',
}

const img = {
    width: '100%',
    height: '450px',
    objectFit: 'cover'
}

const editar = {
    position: 'absolute',
    width: '50px',
    height: '50px',
    padding: '.5rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: '1rem',
    left: '1rem',
    borderRadius: '50%',
    fontSize: '20px',
    background: 'rgb(68, 228, 68)',
    color: 'white',
}