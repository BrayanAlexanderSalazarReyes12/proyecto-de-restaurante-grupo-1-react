import React    from 'react'
import Box      from '@mui/material/Box';
import Modal    from '@mui/material/Modal';
import Fade     from '@mui/material/Fade';


import './css/modalForm.css'
import { useForm } from './../../hooks/UseForm';
//import { EnviarEmail } from '../../selectors/EnviarEmail';
//import { FacturaProducto } from '../../helpers/FacturaProducto';

const style = {
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export const ModalForm = ({open, setOpen}) => {

    
    
    
    const [formValues, handleInputChange, reset] = useForm({
        nombre: '',
        email: ''
    })
    
    const { nombre, email } = formValues;

    const handleClose = () => {
        setOpen(false)
    };

    const handleSubmit = async(e) => {
        e.preventDefault()
        document.querySelector("#email").value = '';
        document.querySelector("#nombre").value = '';
        // Enviar correo electronico

        /* document.getElementById("box").classList.add("cargando")
        document.querySelector("#loading").classList.remove("d-none");
        document.querySelector("#fn").disabled = true;
        document.querySelector("#cn").disabled = true;
        
        const body = FacturaProducto()

        //* Enviar Correo
        const r = await EnviarEmail(email,nombre,body)

        console.log(r) */
        
        /* if(r === "OK"){
            document.getElementById("box").classList.remove("cargando")
            document.querySelector("#loading").classList.add("d-none");
            document.querySelector("#fn").disabled = false;
            document.querySelector("#cn").disabled = false;
            reset()
        } */
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
                <Box id="box" sx={style} className="box">
                    <h1 className="text-center">Formulario</h1>
                    <form id="finalizar_compra" onSubmit={handleSubmit}>
                        <div className="mb-3">
                        <input type="text" 
                                className="input-general" 
                                name="nombre" 
                                id="nombre" 
                                placeholder="Nombre"
                                value={nombre}
                                onChange={handleInputChange}
                                required />
                        </div>
                        <div class="mb-3">
                            <input type="email" 
                                    className="input-general" 
                                    name="email" 
                                    id="email"
                                    value={email}
                                    onChange={handleInputChange}
                                    placeholder="Email" required />
                        </div>
                        <div class="text-center d-flex flex-column justify-content-center">
                            <button id="fn" type="submit" className="btn-general">Finalizar Compra</button>
                            <button id="cn" className="btn-general" onClick={handleClose}>Cancelar</button>
                        </div>
                    </form>
                </Box>
                </Fade>
                
            </Modal>
            <div id="loading" className="d-none spinner-border text-danger position-absolute" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}
