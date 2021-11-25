import React, { useEffect, useState } from 'react'
import { saveImage } from './../../../helpers/FileUpload';
import { app } from './../../../data/bd';
import { CardPlatos } from './CardPlatos';
import { ModalPlatos } from './ModalPlatos';

export const Recomendaciones = () => {
    const carpeta = 'inicio/recomendaciones'

    const [ platos, setPlatos ] = useState([])
    const [ plato, setPlato ] = useState({})
    const [open, setOpen] = useState(false); // Modal
    

    useEffect(() => { // Obtener datos de la base de datos
        fetch( `https://localhost:44380/api/recomendaciones`)
            .then( res => res.json() )
            .then( data => {
                setPlatos(data)   
            })
            console.log(platos)
    },[])

    const handleImage = async() => {
        
    }

    const handleAction = (data) => {
        setPlato(data)
    }

    return (
        <>
            <section id="recomendaciones">
                <div class="container">
                    <div class="row">
                    <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 p-5">
                        <h1 class="ca_title">Recomendaciones del chef</h1>
                        <br/><br/>
                        <div class="row row-cols-1 row-cols-md-2 g-4">


                            {/* Platosrecomendados por el cheft */}
                                {
                                    platos.map(plato => (
                                        <CardPlatos 
                                            onAction={handleAction} 
                                            setOpen={setOpen}
                                            key={plato.IdRecom} {...plato}/>
                                    ))
                                }
                            {/* Platosrecomendados por el cheft */}

                        </div>

                            </div >
                            <div className="col position-relative d-flex justify-content-center align-items-center">
                                <img src={process.env.PUBLIC_URL + '/assets/menu@2x.png'}  class="img-thumbnail" alt="menu" />
                            </div>
                    </div>
                </div>

                {/* Modal */}
                    {open && (
                        <ModalPlatos {...plato} 
                                    open={open} 
                                    setOpen={setOpen}
                                    />
                    )}
                {/* Modal */}
            
            </section>
        </>
    )
}


const editar = {
    position: 'absolute',
    width: '50px',
    height: '50px',
    padding: '.5rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: '6rem',
    right: '1rem',
    borderRadius: '50%',
    fontSize: '20px',
    background: 'rgb(68, 228, 68)',
    color: 'white',
}