import React, { useEffect, useState } from 'react'
import Box      from '@mui/material/Box';
import Modal    from '@mui/material/Modal';
import Fade     from '@mui/material/Fade';
import { usePrevImg } from '../../../hooks/inicio/usePrevImg';
import { app } from '../../../data/bd';
import { respAlerta } from '../../Ui/CardSwal';
import { saveImage, updateImage } from '../../../helpers/FileUpload';



export const ModalHistoria = ({onAction,data,open, setOpen, path}) => {
    const [ textoChange, setChange ] = useState({
        texto: data.txt_des 
    })
  
    const { FileUrl, setFileUrl } = usePrevImg()
    useEffect(() => {
        setFileUrl({
            img: data.img, 
            file: null
        })
        
    }, [])

    const handleOnchange=(e) =>{
        setChange({texto: e.target.value})

    }
    const handleGuardar= async()=>{
        if(FileUrl.file === null){
            const docRef = app.database().ref("nosotros").child("historia")
                
            const imagen = {
                img: data.img,
                txt_des: textoChange.texto
            }
            
            docRef.update(imagen).then(() => {
                //handleAction(false)
                respAlerta('Correcto','Se Actualizo correctamente');
            })
        }
        else {
            const newUrlImage =await saveImage(FileUrl.file,"nosotros")
           /*  if(newUrlImage){
                
            }  */ 
            //const docRef = app.database().ref("nosotros").child("historia")
                    
            /* const imagen = {
                img: newUrlImage,
                txt_des: textoChange.texto
            } */
            
       /*      docRef.update({
                img: FileUrl.img,
                txt_des: textoChange.texto
            }).then(() => {
                //handleAction(false)
                respAlerta('Correcto','Se Actualizo correctamente');
            }) */
       
            console.log(newUrlImage)
            

        } 
        


    }
    
    const handleImage = () => {
        document.querySelector("#select_img").click();
    }

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
                <div class="container d-flex justify-content-center align-items-center h-100">
                    <div class="row">
                        <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 p-5 position-relative" >
                            <img src={FileUrl.img}
                            class="img-thumbnail" alt="ft del restaurante" width="400px" height="300px" />

                            <small onClick={handleImage } className="edit-img position-absolute">
                            <i class="far fa-images"></i>
                            <small className="edit">Editar</small>
                            
                        </small>
                        </div>
                        <input  type="file"
                                                id="select_img"
                                                style={{ display: "none" }}
                                                onChange={hanldeFileChange}
                                                name="fileImg" />
                        <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 p-5">
                            <h1>Historia</h1>
                            <br/>
                            <textarea class="p-3" value={textoChange.texto} cols="60" rows="6"onChange={handleOnchange} ></textarea>
                            <div class="text-center">
                            <buttom class="btn btn-info m-1" onClick={() => setOpen(false)}>Cancelar</buttom>
                             <buttom class="btn btn-info" onClick={handleGuardar}>Guardar</buttom>
                             </div>
                        </div> 
                    </div>

                   
                </div>
                  
                 

                    

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