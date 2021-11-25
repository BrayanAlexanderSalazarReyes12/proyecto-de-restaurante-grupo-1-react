import React, { useEffect, useState } from 'react'
import Box      from '@mui/material/Box';
import Modal    from '@mui/material/Modal';
import Fade     from '@mui/material/Fade';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { usePrevImg } from './../../../hooks/inicio/usePrevImg';
import { updateImage } from './../../../helpers/FileUpload';
import { UseOpen } from '../../../hooks/UseOpen';
import { Loading } from '../../Ui/Loading';
import { respAlerta } from '../../Ui/CardSwal';

export const ModalPropuesta = ({onAction,data,open, setOpen, path}) => {

    const carpeta = 'inicio/propuesta';

    const mediaQ1 = useMediaQuery('(max-width: 720px)')
    const mediaQ2 = useMediaQuery('(min-width: 1200px)')

    const [changeTexto, setTexto] = useState({
        texto: data.texto
    })

    const { FileUrl, setFileUrl } = usePrevImg({
        img: data.img,
        file: null
    })

    const { action,handleAction } = UseOpen() //Loading

    const handleChangeTexto = (e) => {
        setTexto({
            texto: e.target.value
        })
    }

    const hanldeFileChange = (e) => {
        const file = e.target.files[0]
        if(file !== null){
            const imageUrl = URL.createObjectURL(file);
            setFileUrl({
                img: imageUrl,
                file: file
            })
        }else{
            setFileUrl(null)
        }
    }

    const handleImage = () => {
        document.querySelector("#select_img").click();
    }

    useEffect(() => {
        console.log(data)
        setFileUrl({
            img: data.img,
            file: null
        })
    }, [])


    const componente = async(referencia, child) => {
        var json = {};
        if(FileUrl.file !== null){
            const newUrlImage = await updateImage(data.img, FileUrl.file,child)
            
            if(newUrlImage){
                
                if(child === 'propuesta'){
                    
                    json = {
                        IdPropuesta: data.id,
                        ImgPropuesta: newUrlImage,
                        TextoPropuesta: changeTexto.texto,
                        TituloPropuesta: data.titulo
                    };
                }else{
                    json = {
                        IdEventos: data.id,
                        ImgEventos: data.img,
                        TextoEvento: changeTexto.texto,
                        TituloEvento: data.titulo
                    };
                }
                
                fetch( `https://localhost:44380/api/${child}`,{
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(json)
                })
                .then( res => res.json() )
                .then( data => {
                    handleAction(false)
                    respAlerta('Correcto','Se actualizo correctamente');
                })
                
            }
        }else{     
            
                if(child === 'propuesta'){
                    
                    json = {
                        IdPropuesta: data.id,
                        ImgPropuesta: data.img,
                        TextoPropuesta: changeTexto.texto,
                        TituloPropuesta: data.titulo
                    };
                }else{
                    json = {
                        IdEventos: data.id,
                        ImgEventos: data.img,
                        TextoEvento: changeTexto.texto,
                        TituloEvento: data.titulo
                    };
                }
                
                fetch( `https://localhost:44380/api/${child}`,{
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(json)
                })
                .then( res => res.json() )
                .then( data => {
                    handleAction(false)
                    respAlerta('Correcto','Se actualizo correctamente');
                })
        }
        
    }


    const handleSave = async() => {
        handleAction(true)
        if(path){
            await componente('inicio','propuesta');
        }else{
            await componente('inicio','eventos');
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
                <Box id="box" sx={modal} className=" position-relative">
                    <div className="w-100 h-100">
                        <div style={styleQuery.container(mediaQ1,mediaQ2)} 
                            className=" bg-primary d-flex position-relative align-items-center justify-content-center">
                            <small style={newImage} onClick={handleImage}>
                                <i class="far fa-images"></i>
                            </small>
                            <img style={{ ...imagen, opacity: action ? '.5' : '1' }} src={FileUrl.img} alt="" />
                            <div class="position-absolute text-center" style={mensaje.container(mediaQ1,mediaQ2)}>
                                <h1>{data.titulo}</h1>
                                <p style={texto.container(mediaQ1)} className="text-break m-0">{changeTexto.texto}</p>
                            </div>
                            { action && <Loading /> }
                        </div>

                        <div  className="w-100 d-md-flex m-0">
                            <div style={editar} className="">
                                <div className="p-2 w-100 d-flex justify-content-center ">
                                    <textarea   className="form-control text-center"
                                                value={changeTexto.texto}
                                                onChange={handleChangeTexto} 
                                                id="exampleFormControlTextarea1" 
                                                rows="6"></textarea>
                                </div>
                            </div>
                            <div className="d-flex flex-md-column">
                                <button type="button"
                                onClick={() => setOpen(false)}
                                className="btn btn-outline-warning m-1">Cancelar</button>
                                <button type="button"
                                onClick={handleSave}
                                className="btn btn-outline-success m-1">Guardar</button>
                            </div>
                            
                        </div>
                    </div>

                    
                    <input  type="file"
                    id="select_img"
                    style={{ display: "none" }}
                    onChange={hanldeFileChange}
                    name="fileImg" />

                    

                </Box>
                </Fade>
                
            </Modal>
        </>
    )
}

const mensaje = {
    container:  (mediaQ1,mediaQ2) => ({
        border: '1px solid white',
        width: mediaQ1 ? '95%': (mediaQ2 ? '90%' : '90%'),
        backdropFilter: 'blur(6px)',
        borderRadius: '10px',
        color: 'black',
        padding: '0px 20px',
        minHeight: '235px',
    }),
    
}

const texto = {
    container:  (mediaQ1) => ({
        fontSize: mediaQ1 ? '13px' : '16px',
        maxHeight: '185px',
        overflowY: 'scroll',
    }),
}

const modal = {
    width: '100%',
    height: '100vh',
    bgcolor: 'background.paper',
    boxShadow: 24,
}

const imagen = {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
}

const presentacion = {
    width: '100%',
    maxHeight: '235px',
    height: '300px'
}

const contentEditar = {

}

const editar = {
    width: '80%',
}

const styleQuery = {
    container:  (mediaQ1,mediaQ2) => ({
        width: '100%',
        height: mediaQ1 ? '235px': (mediaQ2 ? '400px' : '300px'),
    })
}


const newImage = {
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