import React from 'react'
import './AdminServices.css'
import cumple from './../../servicios/img/img_servicios/cumpleanos.webp'
import { app } from './../../../data/bd';



function writeNewService(nombre,descripcion){

    const docRef = app.database().ref('Servicios/id')
    
        const data = {
            nombre: nombre,
            descripcion: descripcion
        }
    
        docRef.push(data).then(() =>{
         // se ejecuta cuando se guardan los datos
        })
    
    }


export const AdminServicios = () => {
    return (
        <div>
            <div className="newservice col-12 col-md-6 justify-content-center">
                <h3>Añadir Nuevo Servicio</h3>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                        Esse eius, architecto ipsum delectus placeat odit veritatis reprehenderit vero
                        assumenda id? Laborum quo numquam nihil enim, odit consequatur quasi cum.
                        Exercitationem odit ea qui quo fugit id ipsa quos voluptatum, beatae placeat
                        culpa at dolorum consequatur tempore facere modi quasi. Nobis?</p>
                <br></br>
                <div>


                    <form name="new_servicio">
                        <div>
                        <input type="file" name="imagen" id="imagenes" accept="image/jpg,image/png" required />
                        </div>
                            <div className="mb-3">
                                <label htmlFor="inputName" className="col-sm-1-12 col-form-label"></label>
                                <div className="col-sm-1-12 row-cols-md-1">
                                    <input type="text" minLength="4" maxLength="29" className="form-control"
                                    name="nombre" id="nombre_servicio" placeholder="Nombre del Servicio" required/>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="inputName" className="col-sm-1-12 col-form-label"></label>
                                <div className="col-sm-1-12 row-cols-md-1">
                                    <input type="text" minLength="4" maxLength="39" className="form-control"
                                    name="descripcion" id="descripcion" placeholder="Descripción del Servicio" required/>
                                </div>
                            </div>
                    </form>
                    <button id="btn_añadir">Añadir</button>
                </div>                
            </div>
        
            
        </div>
    )
}





/*
window.onload=function(){

var btn = document.getElementById("btn_añadir");

var nombre = document.getElementById('nombre_servicio').value;
var descripcion = document.getElementById('descripcion').value;

btn.addEventListener("click",writeNewService(nombre,descripcion,true))
console.log(nombre+descripcion);

}

*/

