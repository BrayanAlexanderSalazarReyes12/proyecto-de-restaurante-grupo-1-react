import React, { useEffect } from 'react'
import Box      from '@mui/material/Box';
import Modal    from '@mui/material/Modal';
import Fade     from '@mui/material/Fade';
import { useForm } from './../../../hooks/UseForm';
import { usePrevImg } from '../../../hooks/inicio/usePrevImg';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { updateImage } from '../../../helpers/FileUpload';
import { app } from '../../../data/bd';
import { UseOpen } from '../../../hooks/UseOpen';
import { Loading } from '../../Ui/Loading';
import { respAlerta } from '../../Ui/CardSwal';

export const ModalServicio = ({id,img,nombreServicio,descripcion,open, setOpen}) => {

    const mediaQ1 = useMediaQuery('(max-width: 720px)')

    const { FileUrl, setFileUrl } = usePrevImg();
    const { action,handleAction } = UseOpen() //Loading

    const [ value, 
            handleInputChange,
            setValue] = useForm({
                nombreServicio, 
                descripcion
            })

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

    const handleImage = () => {
        document.querySelector("#select_img").click();
    }

    useEffect(() => {
        setFileUrl({
            url: img,
            file: null
        })
    },[])


    const handleSubmit = async(e) => {
        e.preventDefault();
        handleAction(true)
        if(FileUrl.file === null){
            const docRef = app.database().ref('Servicios').child(id)
                
            const updatePropuesta = {
                img: FileUrl.url,
                descripcion: value.descripcion,
                nombreServicio: value.nombreServicio,

            }
            
            docRef.update(updatePropuesta).then(() => {
                handleAction(false)
                respAlerta('Correcto','Se Actualizo correctamente');
            })
        }else{
            const newUrlImage = await updateImage(img, FileUrl.file,'servicio')
            
            if(newUrlImage){
                const docRef = app.database().ref('Servicios').child(id)
                
                const updatePropuesta = {
                    img: newUrlImage,
                    descripcion: value.descripcion,
                    nombreServicio: value.nombreServicio,

                }
                
                docRef.update(updatePropuesta).then(() => {
                    handleAction(false)
                    respAlerta('Correcto','Se Actualizo correctamente');
                })
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
                        <div style={query1.container(mediaQ1)} className="d-flex h-100">

                            <div style={query2.container(mediaQ1,action)} 
                                className="position-relative d-flex justify-content-center align-items-center">
                                <div style={cardEdit} className="card position-relative">
                                    <img src={FileUrl.url} className="card-img-top" alt={nombreServicio} />
                                    <div className="card-body">
                                        <h5 class="card-title">{value.nombreServicio}</h5>
                                        <p class="card-text">{value.descripcion}</p>
                                    </div>
                                </div>
                                { action && <Loading /> }
                            </div>
                            
                            <div style={query3.container(mediaQ1)} className=" d-flex flex-column">
                                <form   className="h-100 d-flex flex-column justify-content-center align-items-center" 
                                        onSubmit={handleSubmit}>
                                    <div style={cardEdit} className="card position-relative">
                                        <small style={editar} onClick={handleImage}>
                                            <i class="far fa-images"></i>
                                        </small>
                                        <img src={FileUrl.url} className="card-img-top" alt={nombreServicio} />
                                        <div className="card-body">
                                            <input  type="text" name="nombreServicio"
                                            value={value.nombreServicio}
                                                    onChange={handleInputChange}
                                                    />
                                            <textarea   value={value.descripcion} class="form-control mt-1"
                                                        onChange={handleInputChange}
                                                        name='descripcion'
                                                        id="exampleFormControlTextarea1" rows="3">
                                            </textarea>
                                            <input  type="file"
                                            id="select_img"
                                            style={{ display: "none" }}
                                            onChange={hanldeFileChange}
                                            name="fileImg" />
                                        </div>
                                    </div>
                                    <div>
                                        <button type="submit" class="m-2 btn btn-outline-success">
                                            Guardar
                                        </button>
                                    </div>
                                </form>
                                    <button type="button"
                                            onClick={() => setOpen(false)}
                                            class="btn btn-outline-danger">
                                        Cancelar
                                    </button>
                            </div>
                        </div>
                        
                    </Box>
                </Fade>
                
            </Modal>
        </>
    )
}

const cardEdit = {
    width: '256px'
}


const modal = {
    width: '100%',
    height: '100vh',
    bgcolor: 'background.paper',
    boxShadow: 24,
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

const query1 = {
    container: (mediaQ1) => ({
        flexDirection: mediaQ1 ? 'column' : 'row',
        overflowY: mediaQ1 ? 'scroll' : 'none'
    })
}
const query2 = {
    container: (mediaQ1,action) => ({
        width: mediaQ1 ? '100%' : '50%',
        opacity: action ? '.5' : '1'
    })
}

const query3 = {
    container: (mediaQ1) => ({
        width: mediaQ1 ? '100%' : '50%',
        marginTop: mediaQ1 ? '.5rem' : '0'
    })
    
}