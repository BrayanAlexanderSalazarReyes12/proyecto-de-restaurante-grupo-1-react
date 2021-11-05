import React, {useEffect, useState} from 'react';
import './AdminServices.css'
import { app } from '../../../data/bd';
import { CardServicios} from './cardServicios';
import { ModalServicio } from './ModalServicio';



export const AdminServicios = () => {

    const carpeta = 'Servicios/'
//imagen

    const [ servicios, setServicios ] = useState([])
    const [ servicio,setServicio ] = useState({}) 
    const [ open,setOpen] = useState(false);


    useEffect(() => { // Obtener datos de la base de datos
        const docRef = app.database().ref(carpeta)
        docRef.on('value', (data) => {
            const all = data.val();
            let arrayImg = []
            for (const id in all) {
                arrayImg.push({ id,...all[id] })
            }
            console.log(arrayImg)
            setServicios(arrayImg)
        })
    },[])




    const handleAct = (data) => {
        setServicio(data)
    }

    return (
        <>
        


        <div className="row col-12">
            <div className="newservice col-6 col-md-6 justify-content-center">
                <h3>Editar Servicio</h3>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                        Esse eius, architecto ipsum delectus placeat odit veritatis reprehenderit vero
                        assumenda id? Laborum quo numquam nihil enim, odit consequatur quasi cum.
                        Exercitationem odit ea qui quo fugit id ipsa quos voluptatum, beatae placeat
                        culpa at dolorum consequatur tempore facere modi quasi. Nobis?</p>
                <br></br>
                {/*}
                <div>
                    <form name="new_servicio">
                        <div>
                            <input type="file" name="imagen" id="imagenes" accept="image/jpg,image/png" />
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
                            <div className="col-sm-1-12">
                                <textarea  className="form-control" rows="4" cols="50" name="descripcion" id="descripcion"
                                placeholder="Descripción del Servicio"/>
                            </div>
                        </div>
                            
                    </form>

                        <button id="btn_añadir" onClick={capturarDatos}>Añadir</button>

                </div>  
    {*/}              
            </div>
            <div className="listaservice col-6 col-md-6 justify-content-center">
                <div className="cards_servicio col-12 row" id="cards_servicios">

                            {/* Consultar Servicios */}
                            {
                                    servicios.map(servicio => (
                                        <CardServicios 
                                            onAction={handleAct} 
                                            setOpen={setOpen}
                                            key={servicio.id} {...servicio}/>
                                    ))
                                }
                            {/* Servicios */}
                </div>
            </div>

            {/* Modal */}
            {open && (
                        <ModalServicio {...servicio} 
                                    open={open} 
                                    setOpen={setOpen}
                                    />
                    )}
                {/* Modal */}


        </div>

    </>
    )


    function capturarDatos(){
        var nombre = document.getElementById('nombre_servicio').value;
        var descripcion = document.getElementById('descripcion').value;
        writeNewService(nombre,descripcion);

}


//Escribir en la base de datos
function writeNewService(nombre,descripcion){

    const docRef = app.database().ref('Servicios/'+nombre)
        const data = {
            nombreServicio: nombre,
            descripcion: descripcion
        }

        docRef.push(data).then(() =>{
        
        })
    
    }

}


