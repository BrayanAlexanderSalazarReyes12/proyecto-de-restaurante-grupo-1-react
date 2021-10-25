import React, {useState}    from 'react'
import Box      from '@mui/material/Box';
import Modal    from '@mui/material/Modal';
import Fade     from '@mui/material/Fade';


import './css/modalForm.css'
import { useForm } from './../../hooks/UseForm';
import { FacturaProducto } from '../../helpers/FacturaProducto';
import { EnviarEmail } from './../../helpers/EnviarEmail';
import { Loading } from './../Ui/Loading';
import { UseOpen } from '../../hooks/UseOpen';
import { ToastMess } from '../Ui/ToastMess';
import { UseLocalStorage } from '../../hooks/UseLocalStorage';

const validationForm = (formValues) => {
    let errors = {}
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
    

    if(!formValues.nombre){
        errors.nombre = "El campo nombre es requerido"
    }else if(!regexName.test(formValues.nombre)){
        errors.nombre = "El campo nombre solo acepta letras y espacios en blanco"
    }

    if(!formValues.email){
        errors.email = "El campo email es requerido"
    }else if(!regexEmail.test(formValues.email)){
        errors.email = "El campo email es incorrecto"
    }

    return errors
}

const style = {
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export const ModalForm = ({open, setOpen, onAction}) => {

    const { actualizar,
            storage,
            setStorage,
            deleteStorage} = UseLocalStorage()


    const [value,handleInputChange, setValue] = useForm({
        nombre: '',
        email: ''
    })

    const { action,toast,data,setToast, handleAction,handleData } = UseOpen()


    const [err, setErrors] = useState({})
    
    const { nombre, email } = value;

    const handleClose = () => {
        setOpen(false)
    };

    const factura = FacturaProducto()
    factura["name"] = nombre
    factura["email"] = email
    factura["_subject"] = nombre
    factura["_cc"] = email
    

    const handleSubmit = async(e) => {
        e.preventDefault()
        document.querySelector("#cn").disabled = true // deshabilitamos boton para evitar errores (cancelar)
        document.querySelector("#fn").disabled = true // deshabilitamos boton para evitar errores (submit)
        handleAction(true) // Mostramos el snniper de carga
        const  r = validationForm(value)
        setErrors(r)
        if (JSON.stringify(r) === "{}") {
            const resp = await EnviarEmail(factura)
            if(resp){
                handleAction(false) // quitamos el snniper de carga
                handleData({
                    titulo: "Seccess !!! :)",
                    mensaje: "Informacion enviada correctamente"
                })
                setToast(true) // Mostramos el toast
                setTimeout(() => {
                    setToast(false)
                }, 4000);
                document.querySelector("#cn").disabled = false // habilitamos boton despues de la respuesta (cancelar)
                document.querySelector("#fn").disabled = false // habilitamos boton despues de la respuesta (submit)
                setValue({
                    nombre: '',
                    email: ''
                })
                onAction()
                /* document.querySelector("#email").value = ''; // Reseteamos los input
                document.querySelector("#nombre").value = ''; // Reseteamos los input */
                // Ponemos el localstorage a 0
                window.localStorage.setItem("productos", "[]")
            }else{
                handleData({
                    titulo: "Error !!! :(",
                    mensaje: "Error al enviar correo, intentelo de nuevo"
                })
                setToast(true) // Mostramos el toast
                setTimeout(() => {
                    setToast(false)
                }, 4000);
                handleAction(false) // quitamos el loading para ver el error
            }
        }else{
            handleAction(false) // Quitamos el loading para ver ele error
            
            document.querySelector("#cn").disabled = false // habilitamos boton despues de la respuesta (cancelar)
            document.querySelector("#fn").disabled = false // habilitamos boton despues de la respuesta (submit)
        }

        
        

    }

    return (
        <div className="position-relative">
            
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
                <Box style={{opacity: action ? '.6' : '1'}} id="box" sx={style} className="box">
                    <h1 className="text-center">Formulario</h1>
                    <form  
                            id="finalizar_compra" className="position-relative" onSubmit={handleSubmit}>
                        
                        <div className="mb-3">
                            <input type="text" 
                                    className="input-general" 
                                    name="nombre" 
                                    id="nombre" 
                                    placeholder="Nombre"
                                    value={nombre}
                                    onChange={handleInputChange}
                                    />
                            {err.nombre && <small>{err.nombre}</small>} 
                        </div>
                        <input  type="hidden" name="_cc"
                                value={email}
                                onChange={handleInputChange} />
                        <div class="mb-3">
                            <input type="email" 
                                    className="input-general" 
                                    name="email" 
                                    id="email"
                                    value={email}
                                    onChange={handleInputChange}
                                    placeholder="Email" required />
                                    {err.email && <small>{err.email}</small>}
                        </div>
                        <input type="hidden" name="attachment" accept="image/png, image/jpeg"></input>
                        <div class="text-center d-flex flex-column justify-content-center">
                            <button  id="fn" type="submit" className="btn-general">Finalizar Compra</button>
                        </div>
                        {/* Loading */}
                            { action && <Loading />}
                        {/* Loading */}
                    </form>
                    <button id="cn"
                    className="btn-general w-100" 
                    onClick={handleClose}>Cancelar</button>
                    {/* Toast */}
                        { toast && (
                            <ToastMess titulo={data.titulo} mensaje={data.mensaje}/>
                        )}
                    {/* Toast */}
                    
                </Box>
                </Fade>
                
            </Modal>

            
            
            
        </div>
    )
}
