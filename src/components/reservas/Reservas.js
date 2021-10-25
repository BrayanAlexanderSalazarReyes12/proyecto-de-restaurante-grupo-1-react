import React from 'react'
import "./Reserva.css"

export const Reservas = () => {
    return (
        
    <>
        <div className="reservaciones">
            <div className="formulario-reservas  col-12 row">
                
                <div className="txt-reserva col-12 col-md-5 ">
                    <h1>Reserva en Linea</h1>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing.</p>
                </div>

                <div className="col-12 col-md-7 align-center container-reserva">
                    <form className="col-8 justify-content-center" id="form-resevas"
                    action="https://formsubmit.co/restauranttic2021@gmail.com" method="POST">
                        <input type="hidden" name="_subject" value="Nueva Reserva!"/>
                        <input type="hidden" name="_autoresponse" value="Reserva Confirmada!!"/>
                        <input type="hidden" name="_template" value="table"/>


                            <select name="Reserva" className="form-control select-reserva" required>
                                <option selected disabled>Seleccione un tipo de reserva</option>
                                <option value="Celebración De Cumpleaños">Celebración De Cumpleaños</option>
                                <option value="Aniversario">Aniversario</option>
                                <option value="Fiesta Infantil">Fiesta Infantil</option>
                                <option value="Declaración y Propuesta">Declaración y Propuesta</option>
                                <option value="Despedida">Despedida</option>
                                <option value="Cena con Amigos">Cena con Amigos</option>
                            </select>
                                
                            <div className="fecha_reserva mb-1 col-12 row-cols-md-3">
                                <input type="date"  name="Fecha" min="2021-10-10" max="2021-12-31" step="1" required/>
                                <input type="time" name="Hora" min="10:00" max="22:00"  required/>
                            </div>

                                
                            <div className="mb-3">
                                <label htmlFor="inputName" className="col-sm-1-12 col-form-label"></label>
                                <div className="col-sm-1-12 row-cols-md-1">
                                    <input type="text" minLength="4" maxLength="9" className="form-control"
                                    name="nombre" id="nombres" placeholder="Nombre" required/>
                                </div>
                            </div>

                                
                            <div className="mb-3">
                                <label htmlFor="inputName" className="col-sm-1-12 col-form-label"></label>
                                <div className="col-sm-1-12">
                                        <input type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                                        className="form-control" name="email" id="email" placeholder="Correo" required/>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="inputName" className="col-sm-1-12 col-form-label"></label>
                                <div className="col-sm-1-12">
                                    <input type="text" className="form-control" name="telefono" id="telefono"
                                    placeholder="Telefono" required/>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="inputName" className="col-sm-1-12 col-form-label"></label>
                                <div className="col-sm-1-12">
                                    <textarea  className="form-control" rows="4" cols="50" name="Comentario" id="comentario"
                                    placeholder="Comentario y/o Solicitudes Especiales"/>
                                </div>
                            </div>

                            <div className="form-check pb-3 col-12">
                                <input className="form-check-input" type="checkbox" value="" id="terminos" required/>
                                <label className="form-check-label text-white"
                                    htmlFor="flexCheckDefault"><p>Acepto Terminos y condiciones</p></label>
                            </div>

                            <div className="mb-3 w-100">
                                <div className="col-sm-10 text-center w-100">
                                    <button type="submit" className="btn boton-confirmar">Confirmar</button>
                                </div>
                            </div>
                            
                    </form>
                </div>
            </div>
        </div>
    </>
    )
}
