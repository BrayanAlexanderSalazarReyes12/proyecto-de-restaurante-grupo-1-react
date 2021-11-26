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

export const ModalPlatos = ({IdRecom,ImgRecom,TituloRecom,TextoRecom,open, setOpen}) => {

    const mediaQ1 = useMediaQuery('(max-width: 720px)')

    const { FileUrl, setFileUrl } = usePrevImg();
    const { action,handleAction } = UseOpen() //Loading

    const [ value, 
            handleInputChange,
            setValue] = useForm({
                TituloRecom, 
                TextoRecom
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
            url: ImgRecom,
            file: null
        })
    },[])


    const handleSubmit = async(e) => {
        e.preventDefault();
        handleAction(true)
        if(FileUrl.file === null){
            
            const updatePropuesta = {
                IdRecom: IdRecom,
                ImgRecom: FileUrl.url,
                TextoRecom: value.TextoRecom,
                TituloRecom: value.TituloRecom
            }

            fetch( `https://restaurante2021.herokuapp.com/api/recomendaciones`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatePropuesta)
            })
            .then( res => res.json() )
            .then( data => {
                handleAction(false)
                respAlerta('Correcto',"Actualizado correctamente")
            })
        }else{
            const newUrlImage = await updateImage(ImgRecom, FileUrl.file,'recomendacion')
            
            if(newUrlImage){
                const updatePropuesta = {
                    IdRecom: IdRecom,
                    ImgRecom: newUrlImage,
                    TextoRecom: value.TextoRecom,
                    TituloRecom: value.TituloRecom,
                }

                fetch( `https://restaurante2021.herokuapp.com/api/recomendaciones`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatePropuesta)
            })
            .then( res => res.json() )
            .then( data => {
                handleAction(false)
                respAlerta('Correcto',"Actualizado correctamente")
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
                                    <img src={FileUrl.url} className="card-img-top" alt={TituloRecom} />
                                    <div className="card-body">
                                        <h5 class="card-title">{value.TituloRecom}</h5>
                                        <p class="card-text">{value.TextoRecom}</p>
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
                                        <img src={FileUrl.url} className="card-img-top" alt={TituloRecom} />
                                        <div className="card-body">
                                            <input  type="text" name="TituloRecom"
                                                    onChange={handleInputChange}
                                                    value={value.TituloRecom} />
                                            <textarea   value={value.TextoRecom} class="form-control mt-1"
                                                        onChange={handleInputChange}
                                                        name='TextoRecom'
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