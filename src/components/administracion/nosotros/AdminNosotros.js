import React,{ useState, useEffect} from 'react'
import { app } from '../../../data/bd'
import {ModalHistoria } from './modalHistoria'


export const AdminNosotros = () => {

    const carpeta = 'nosotros/historia'
    const [ historia, setHistoria ] = useState([])
    const [open, setOpen] = useState(false); // Modal
    useEffect(() => { // Obtener datos de la base de datos
        const docRef = app.database().ref(carpeta)
        docRef.on('value', (data) => {
            const all = data.val();
            setHistoria(all)
        })
    },[])
   
const handlEditar = () =>{
setOpen(true)

}


    return (
        <>
        <section id="Nosotros">

        <div class="container">
            <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 p-5 position-relative" >
                    <img src={historia.img} 
                    class="img-thumbnail" alt="ft del restaurante" width="400px" height="300px" />

                     <small onClick={handlEditar} className="edit-img position-absolute">
                    <i class="far fa-images"></i>
                    <small className="edit">Editar</small>
                    
                </small>
                </div>
                <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 p-5">
                    <h1>Historia</h1>
                    <br/>
                    <p >{historia.txt_des}</p>
                </div>
                
            </div>
        </div>

        <div id="equipo" className="p-2">
            <center>
                <h1 className="p-2"> Equipo de trabajo</h1>
                <div class="row row-cols-1 row-cols-md-3 g-4">
                    <div class="col">
                        <img className="img-personal" src={process.env.PUBLIC_URL + '/assets/personal1@2x.png'}  alt="" />
                            <h5 >carlos</h5>
                    </div>
                    <div class="col">
                        <img className="img-personal" src={process.env.PUBLIC_URL + '/assets/personal2@2x.png'}  alt="" />
                        <h5 > maria</h5>
                    </div>
                    <div class="col">
                        <img className="img-personal" src={process.env.PUBLIC_URL + '/assets/personal3@2x.png'}  alt=""/>
                        <h5 > julia</h5>
                    </div>
                    <div class="col">
                            <img className="img-personal" src={process.env.PUBLIC_URL + '/assets/peronal4.jpg'}  alt=""/>
                            <h5 > sergio</h5>
                        </div>
                    <div class="col">
                        <img className="img-personal" src={process.env.PUBLIC_URL + '/assets/personal5.jpg'}  alt=""/>
                        <h5 > juan</h5>
                    </div>
                    <div class="col">
                        <img className="img-personal" src={process.env.PUBLIC_URL + '/assets/personal6.jpg'}  alt=""/>
                        <h5 > camila</h5>
                    </div>
                </div>
            </center>
        </div>
    

       
    <br/>
    {open && (
        <ModalHistoria  open={open} setOpen={setOpen} data={historia}/>
    )}
    
        </section>
        </>
    )
}
