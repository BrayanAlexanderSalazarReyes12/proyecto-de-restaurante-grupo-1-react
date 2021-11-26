import React,{ useState, useEffect } from 'react'
import { ModalPropuesta } from './ModalPropuesta';

export const Propuesta = ({path}) => {

    //* ABRIRI MODAL
    const [open, setOpen] = useState(false); // Modal
    const handleOpen = () => setOpen(true);

    const handleModal = () => {
        console.log(data)
        handleOpen();
    }

    //* ABRIRI MODAL

    const [ data, setData ] = useState([])

    useEffect(() => {
        if(path){
            fetch(`https://restaurante2021.herokuapp.com/api/propuesta`)
            .then( res => res.json() )
            .then( data => {
                setData({
                    id: data[0].IdPropuesta,
                    img: data[0].ImgPropuesta,
                    titulo: data[0].TituloPropuesta,
                    texto: data[0].TextoPropuesta
                })
            })
        }else{
            fetch( `https://restaurante2021.herokuapp.com/api/eventos`)
            .then( res => res.json() )
            .then( data => {
                setData({
                    id: data[0].IdEventos,
                    img: data[0].ImgEventos,
                    titulo: data[0].TituloEvento,
                    texto: data[0].TextoEvento
                })
            })
        }
        console.log(data)
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