import React, {useState} from 'react'
import { EnviarEmail } from '../../helpers/EnviarEmail'
import { useForm } from '../../hooks/UseForm'
import { UseOpen } from '../../hooks/UseOpen'
import { Loading } from '../Ui/Loading'
import { ToastMess } from '../Ui/ToastMess'
import './css/contactanos.css'

const validationForm = (formValues) =>{
    let errors = {}
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
    let regexComments = /^.{1,255}$/;
    

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

    if(!formValues.mensaje){
        errors.mensaje = "El campo mensaje es requerido"
    }else if(!regexComments.test(formValues.mensaje)){
        errors.mensaje = "El mensaje no debe sobrepasar los 255 caracteres"
    }

    if(!formValues.subject){
        errors.subject = "El campo subject es requerido"
    }

    return errors
}

export const Contactanos = () => {

    const [ formValues,
            handleInputChange,
            setValue
        ] = useForm({
        nombre: '',
        email: '',
        mensaje: '',
        subject: '',
    })

    const { action,toast,data,setToast, handleAction,handleData } = UseOpen() // Loading - Toast...
    

    const [err, setErrors] = useState({}) // Verificar errores del formulario


    const { nombre, email, subject, mensaje } = formValues

    const handleSubmit = (e) => {
        e.preventDefault()
        handleAction(true) // Mostramos el loading
        document.querySelector("#ev").disabled = true // deshabilitamos el boton para evitar errores
        const  resp = validationForm(formValues) // Validamos formulario
        setErrors(resp)
        
        if (JSON.stringify(resp) === "{}") { // verificamos que no tengamos ningun error
            const respuesta = EnviarEmail({
                name    : nombre,
                email   : email,
                _subject: subject,
                message : mensaje
            }) //Enviamos el correo con los datos
            if(respuesta){
                handleAction(false) // Quitamos el loading
                handleData({
                    titulo: "Success !!! :)",
                    mensaje: "Asunto enviado correctamente"
                })
                setToast(true) // Mostramos el mensaje toast
                setTimeout(() => {
                    setToast(false) // Quitamos el mensaje despues de 4 segundos
                }, 4000);
                
                // Vaciamos campos
                setValue({
                    nombre: '',
                    email: '',
                    subject: '',
                    mensaje: ''
                }) // Reseteamos los valores del formulario
                document.querySelector("#ev").disabled = false // habilitamos el boton para evitar errores
            }else{
                // Si ocurre un error le avisamos al usuario
                handleData({
                    titulo: "Error !!! :(",
                    mensaje: "Error al enviar correo, intentelo de nuevo"
                })
                setToast(true)
                setTimeout(() => {
                    setToast(false)
                }, 4000);
                document.querySelector("#ev").disabled = false // habilitamos el boton para evitar errores
            }
            
            console.log("Sin errores")
        }else{
            document.querySelector("#ev").disabled = false // habilitamos el boton para evitar errores
        }

        
    }









    return (
        <section  id="contactos" className="contactanos row m-0 flex-row-reverse">
            <div className="texto m-0 col-12 col-md-6 d-flex justify-content-center align-items-center">
                <div>
                    <h1 className="text-center">Contáctanos</h1>
                    <p className="text-center">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam doloribus ipsa
                        at, labore quaerat expedita sed veniam dolores, culpa autem eum doloremque iure possimus enim et
                        cumque laboriosam ea aliquid.</p>
                </div>
            </div>

            <div className="formulario position-relative col-12 col-md-6">
                {/* Loading */}
                    { action && <Loading />}
                {/* Loading */}
                <div className="container " style={{opacity: action ? '.6' : '1'}}>
                    <form id="contactanos" onSubmit={handleSubmit}>
                        
                        <div className="mb-3 row">
                            <div className="col-sm-1-12">
                                <input type="text" 
                                        className="form-control" 
                                        name="nombre"
                                        value={nombre}
                                        onChange={handleInputChange}
                                        id="nombre_" 
                                        placeholder="Nombre" 
                                        required/>
                                        
                            </div>
                            {err.nombre && <small>{err.nombre}</small>} 
                        </div>

                        <div className="mb-3 row">
                            <div className="col-sm-1-12">
                            <input type="text" 
                                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                                    className="form-control"
                                    name="email" 
                                    value={email}
                                    onChange={handleInputChange}
                                    id="email_" 
                                    placeholder="Correo" required />
                            </div>
                            {err.email && <small>{err.email}</small>}
                        </div>

                        <div className="mb-3 row">
                            <div className="col-sm-1-12">
                                <input type="text" 
                                        className="form-control" 
                                        name="subject" 
                                        value={subject}
                                        onChange={handleInputChange}
                                        id="subject_" 
                                        placeholder="Asunto a tratar"
                                        required
                                        />
                            </div>
                            {err.subject && <small>{err.subject}</small>}
                        </div>

                        <div className="mb-3">
                            <textarea className="form-control" 
                                        name="mensaje"
                                        value={mensaje}
                                        onChange={handleInputChange} 
                                        id="mensaje_" 
                                        rows="3">Mensaje</textarea>
                                        {err.mensaje && <small>{err.mensaje}</small>}
                        </div>

                        <div className="form-check pb-3">
                            <input className="form-check-input" type="checkbox" value="" id="terminos" required />
                            <label className="form-check-label text-white" >
                                Acepto Terminos y condiciones
                            </label>
                        </div>

                        <div className="mb-3 row w-100">
                            <div className="col-sm-10 text-center w-100">
                                <button id="ev" type="submit" className="btn">Enviar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {/* Tost */}
            {toast && (
                    <ToastMess 
                    titulo={data.titulo} 
                    mensaje={data.mensaje}
                    />
                )}
                
            {/* Tost */}
        </section>
    )
}
