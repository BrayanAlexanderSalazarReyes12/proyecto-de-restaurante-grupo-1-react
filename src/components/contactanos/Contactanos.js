import React from 'react'
import './css/contactanos.css'



export const Contactanos = () => {
    return (
        <section id="contactos" className="contactanos row m-0 flex-row-reverse">
        <div className="texto col-12 col-md-6 d-flex justify-content-center align-items-center">
            <div>
                <h1 className="text-center">Contáctanos</h1>
                <p className="text-center">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam doloribus ipsa
                    at, labore quaerat expedita sed veniam dolores, culpa autem eum doloremque iure possimus enim et
                    cumque laboriosam ea aliquid.</p>
            </div>
        </div>
        <div className="formulario col-12 col-md-6">
            <div className="container">
                <form id="contactanos" action="https://formsubmit.co/jhonierg20@gmail.com" method="POST">
                    {/* <input type="hidden" name="_captcha" value="false"> */}
                    <input type="hidden" name="_autoresponse" value="Reserva Confirmada" />
                    <div className="mb-3 row">
                        <label for="inputName" className="col-sm-1-12 col-form-label"></label>
                        <div className="col-sm-1-12">
                            <input type="text" minlength="4" maxlength="9" className="form-control" name="nombre"
                                id="nombres" placeholder="Nombre" required />
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <label for="inputName" className="col-sm-1-12 col-form-label"></label>
                        <div className="col-sm-1-12">
                            <input type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" className="form-control"
                                name="email" id="correo" placeholder="Correo" required />
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <label for="inputName" className="col-sm-1-12 col-form-label"></label>
                        <div className="col-sm-1-12">
                            <input type="text" className="form-control" name="telefono" id="telefono" placeholder="Telefono"
                                required />
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="" className="form-label"></label>
                        <textarea className="form-control" name="" id="" rows="3">Mensaje</textarea>
                    </div>

                    <div className="form-check pb-3">
                        <input className="form-check-input" type="checkbox" value="" id="terminos" required />
                        <label className="form-check-label text-white" for="flexCheckDefault">
                            Acepto Terminos y condiciones
                        </label>
                    </div>

                    <div className="mb-3 row w-100">
                        <div className="col-sm-10 text-center w-100">
                            <button type="submit" className="btn">Enviar</button>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    </section>
    )
}
