import React, { useState, useEffect } from 'react'
import Box      from '@mui/material/Box';
import Modal    from '@mui/material/Modal';
import Fade     from '@mui/material/Fade';
import { useMediaQuery } from './../../../hooks/useMediaQuery';
import { usePrevImg } from '../../../hooks/inicio/usePrevImg';
import { UseOpen } from '../../../hooks/UseOpen';
import { deleteImage, saveImage, updateImage } from '../../../helpers/FileUpload';
import { app } from '../../../data/bd';
import { Alerta, respAlerta } from '../../Ui/CardSwal';
import { Loading } from '../../Ui/Loading';


export const ModalTestimonio = ({open,setOpen,data}) => {

    const defaultI = 'https://firebasestorage.googleapis.com/v0/b/restaurantetic21.appspot.com/o/carousel%2Fdefault-featured-image.jpg?alt=media&token=525b974e-724a-44c4-8821-c8fae2286fe3'
    const { FileUrl, setFileUrl } = usePrevImg()
    const { action,handleAction } = UseOpen() //Loading
    const [ textoChange, setChange ] = useState({
        texto: data.texto || '...!!!'
    })
    const mediaQ1 = useMediaQuery('(max-width: 720px)')

    useEffect(() => {
        setFileUrl({
            img: data.img, 
            file: null
        })
        
    }, [])

    const hanldeFileChange = (e) => {
        const file = e.target.files[0]
        if(file !== undefined){
            const imageUrl = URL.createObjectURL(file);
            setFileUrl({
                img: imageUrl,
                file: file
            })
        }else{
            setFileUrl({
                img: data.img, 
                file: null, 
            })
        }
    }

    const handleImage = () => {
        document.querySelector("#select_img").click();
    }

    const handleChange = (e) => {
        setChange({
            texto: e.target.value
        })
    }

    //* GUARDAR NUEVO TESTIMONIO
    const newTestimonio = async() => {

        if(FileUrl.file === null){
            const docRef = app.database().ref('inicio/testimonios')
            
            const data = {
                img: '',
                texto: textoChange.texto
            }

            docRef.push(data).then(() =>{
                handleAction(false)
                respAlerta('Correcto','Se Guardo correctamente');
            })
        }else{
            const urlImage = await saveImage(FileUrl.file,'testimonios');

            if(urlImage){
                const docRef = app.database().ref('inicio/testimonios')
                const data = {
                    img: urlImage,
                    texto: textoChange.texto
                }
                docRef.push(data).then(() =>{
                    handleAction(false)
                    respAlerta('Correcto','Se Guardo correctamente');
                })
            }
        }

        
    }


    const handleSubmit = async(e) => {
        e.preventDefault();

        const action = {
            imgUrl: data.img,
            carpetaStorage: 'testimonios',
            carpetaBd: 'inicio/testimonios',
            file: FileUrl.file,
            id: data.id,
            texto: textoChange.texto
        }
        handleAction(true)
        if(data.id === undefined){
            //Guardamos un nuevo testimonio
            newTestimonio()

        }else{
            // Verificamos si va a actualizar el testimonio con una imagen o sigue con la misma imagen
            if(action.file === null){
                const docRef = app.database().ref(action.carpetaBd).child(action.id)
                    
                const img = {
                    img: action.imgUrl,
                    texto: action.texto
                }
                
                docRef.update(img).then(() => {
                    handleAction(false)
                    respAlerta('Correcto','Se Actualizo correctamente');
                })
            }else{
                let newUrlImage = ''
                if(action.imgUrl === ''){
                    newUrlImage = await saveImage(FileUrl.file,'testimonios');
                }else{
                    newUrlImage = updateImage(action.imgUrl, action.file,action.carpetaStorage)
                }
                
                if(newUrlImage){
    
                    const docRef = app.database().ref(action.carpetaBd).child(action.id)
                    
                    const img = {
                        img: newUrlImage,
                        texto: action.texto
                    }
                    
                    docRef.update(img).then(async() => {
                        handleAction(false)
                        respAlerta('Correcto','Se Actualizo correctamente');
                    })
                }
                
            }
    
        }

        

        

        
    }

    const handleDelete = async() => {
        const resp = await Alerta()
        if(resp){
            handleAction(true)
            try {
                await deleteImage(data.img,'testimonios')
            
                const docRef = app.database().ref('inicio/testimonios').child(data.id)
            
                docRef.remove().then(() => {
                    handleAction(false)
                    respAlerta('Correcto','Se elimino correctamente');
                    setOpen(false)
                })
            } catch (error) {
                respAlerta('Error','Error al eliminar la imagen');
                
            }
            
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
                        
                        <div className="w-100 h-100 p-3">
                            <div className="h-50 d-flex justify-content-center align-items-center">
                                <div style={{ ...item, opacity: action ? '.5' : '1' }} className="border position-relative item d-flex flex-column flex-md-row">
                                    <small style={editar} onClick={handleImage}>
                                        <i class="far fa-images"></i>
                                    </small>
                        
                                    <div style={query1.container(mediaQ1)} className="col-4 d-flex justify-content-center align-items-center">
                                        <img style={imagen} src={FileUrl.img === '' ? defaultI : FileUrl.img } alt="" />
                                    </div>
                                    <div style={query1.container(mediaQ1)} className="h-100 col-8 d-flex align-items-center justify-content-sm-center">
                                        <p className="text-break m-0 text-center">{textoChange.texto}</p>
                                    </div>
                                    { action && <Loading /> }
                                </div>
                            </div>
                            
                            <div className="h-50 d-flex flex-column">
                                <form onSubmit={handleSubmit} className="d-flex flex-column justify-content-center align-items-center">
                                    <textarea   rows="4" name="texto"
                                                className="text-center"
                                                style={{maxWidth: '100%'}}
                                                onChange={handleChange}
                                                value={textoChange.texto}
                                                cols="90"></textarea>

                                                <input  type="file"
                                                id="select_img"
                                                style={{ display: "none" }}
                                                onChange={hanldeFileChange}
                                                name="fileImg" />

                                                <button type="submit"
                                                    class="btn btn-outline-warning m-2">
                                                        Guargar
                                                    </button>
                                                
                                </form>
                                <div className="text-center">
                                    <button type="button"
                                            style={{ marginRight: '8px' }}
                                            onClick={() => setOpen(false)}
                                    class="btn btn-outline-warning d-inline">Cancelar</button>
                                    {data.delete && (
                                        <button type="button"
                                            onClick={handleDelete}
                                            class="btn btn-outline-danger d-inline">Delete</button>
                                    )}
                                    
                                </div>
                                
                            </div>
                            

                            
                        </div>
                        
                        
                    </Box>
                </Fade>
                
            </Modal>
        </>
    )
}


const modal = { // Estilos css
    width: '100%',
    height: '100vh',
    bgcolor: 'background.paper',
    boxShadow: 24,
}

const query1 = {
    container:  (mediaQ1) => ({
        width: (mediaQ1) ? '100%' : ''
    })
}

const item = {
    minWidth: '100%'
}

const imagen = {
    objectFit: 'cover',
    width: '80px',
    height: '80px',
    borderRadius: '50%'
}

const editar = {
    position: 'absolute',
    width: '50px',
    height: '50px',
    padding: '.5rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: '.1rem',
    left: '.1rem',
    borderRadius: '50%',
    fontSize: '20px',
    background: 'rgb(68, 228, 68)',
    color: 'white',
}
