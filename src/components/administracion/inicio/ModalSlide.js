import React, { useEffect } from 'react'
import Box      from '@mui/material/Box';
import Modal    from '@mui/material/Modal';
import Fade     from '@mui/material/Fade';
import { usePrevImg } from '../../../hooks/inicio/usePrevImg';
import './css/modalSlide.css'
import { UseOpen } from '../../../hooks/UseOpen';
import { Loading } from '../../Ui/Loading';
import { app } from './../../../data/bd';
import { saveImage, updateImage, deleteImage } from './../../../helpers/FileUpload';
import { Alerta, respAlerta, respError } from '../../Ui/CardSwal';



export const ModalSlide = ({open, setOpen, data }) => {

    const carpeta = 'inicio/carousel';
    const { FileUrl, setFileUrl } = usePrevImg()
    const { action,handleAction } = UseOpen() //Loading

    const hanldeFileChange = (e) => {
        const file = e.target.files[0]
        if(file !== undefined){
            const imageUrl = URL.createObjectURL(file);
            setFileUrl({
                url: imageUrl,
                file: file
            })
        }else{
            setFileUrl(null)
        }
    }

    //* Imagen previw
    const handleClick = () => {
        document.querySelector("#select_img").click();
    }

    const handleClose = () => {
        setOpen(false);
    }

    useEffect(() => {
        setFileUrl({
            url: data.img_acordion,
            file: null
        })
    },[])


    const handleSave = async() => {
        handleAction(true)
        if(data.idacordion === null){
            //* GUARDAR UN NUEVO SLIDE EN LA BASE DE DATOS
            const urlImage = await saveImage(FileUrl.file,'carousel');

            if(urlImage){

                Mpost('https://restaurante2021.herokuapp.com/api/inicio',{
                    "img_acordion": urlImage,
                }).then(res => {
                    handleAction(false)
                    respAlerta('Correcto','Se Guardo correctamente');
                })
            }
            
        }else{
            //* ACTUALIZAR UN SLIDER EXISTENTE
            const newUrlImage = await updateImage(data.img_acordion, FileUrl.file,'carousel')
            
            if(newUrlImage){
                fetch( `https://restaurante2021.herokuapp.com/api/inicio`,{
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "idacordion": data.idacordion,
                        "img_acordion": newUrlImage
                    })
                })
                .then( res => res.json() )
                .then( data => {
                    handleAction(false)
                    respAlerta('Correcto','Se Actualizo correctamente');
                })
            }
        }
        
    }

    const handleDelete = async() => {
        const resp = await Alerta()
        if(resp){
            handleAction(true)

            await deleteImage(data.img_acordion,'carousel')
            
            fetch( `https://restaurante2021.herokuapp.com/api/inicio`,{
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "idacordion": data.idacordion
                    })
                })
                .then( res => res.json() )
                .then( data => {
                    handleAction(false)
                    respAlerta('Correcto','Se elimino correctamente');
                })
        }else{

        }
        
        
        
    }

    return (
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                closeAfterTransition
                BackdropProps={{
                timeout: 500,
                }}
                
            >
                
                <Fade in={open}>
                <Box id="box" sx={modal} className="body-modal position-relative">
                    <img style={{ ...imagen,opacity: action ? '.5' : '1' }} src={FileUrl.url} alt="imagen" />
                    <div className="d-flex m-2 w-100 align-items-center justify-content-center">
                
                        {!data.delete && (
                            <button
                                onClick={handleClick}
                                className="select_img m-3"
                                style={{ display: action ? 'none' : 'inline'}}
                                > 
                                Select Image
                            </button>
                        )}
                        
                        {FileUrl.file && (
                            <button type="button"
                            style={{ marginRight: '10px',display: action ? 'none' : 'inline' }}
                            onClick={handleSave}
                            class="btn btn-outline-success">Guardar</button>
                        )}
                        
                        <button type="button"
                            onClick={handleClose}
                            style={{ marginRight: '10px',display: action ? 'none' : 'inline'}}
                            class="btn btn-outline-dark">Cancelar</button>

                        {data.delete && (
                            <button type="button"
                            onClick={handleDelete}
                            style={{ display: action ? 'none' : 'inline'}}
                            class="btn btn-outline-danger">Delete Slide</button>
                        )}
                        
                    </div>

                    { action && <Loading /> }
                    
                </Box>
                </Fade>
                
            </Modal>
            <input  type="file"
                    id="select_img"
                    style={{ display: "none" }}
                    onChange={hanldeFileChange}
                    name="fileImg" />
        </>
    )
}

const imagen = {
    width: '100%',
    height: '450px',
    objectFit: 'cover',
}
const modal = {
    width: '100%',
    height: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
}


const Mpost = async(url,body) => {
    const res = await fetch(url, { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    const json = await res.json();
    return json;
}