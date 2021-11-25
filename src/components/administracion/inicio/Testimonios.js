import React, { useState, useRef, useEffect } from 'react'
import { app } from '../../../data/bd'
import { CardTestimonio } from './CardTestimonio'
import { ModalTestimonio } from './ModalTestimonio'

export const Testimonios = () => {

    const defaultI = 'https://firebasestorage.googleapis.com/v0/b/restaurantetic21.appspot.com/o/carousel%2Fdefault-featured-image.jpg?alt=media&token=525b974e-724a-44c4-8821-c8fae2286fe3'
    const [slideImg, setSlideImg] = useState([])
    const [open, setOpen] = useState(false); // Modal
    const [newSlide, setNewSlide] = useState({})

    const handleSlide = (img,texto,id,d) => {
        if(d){
            //*Eliminar el slider seleccionado
            setNewSlide({
                img,
                texto,
                id,
                delete: true
            })
        }else{
            //* Actualizar o agregar un nuevo slider
            setNewSlide({
                img,
                texto,
                id,
                delete: true
            })
        }
    }

    useEffect(() => {
        fetch( `https://localhost:44380/api/testimonios`)
            .then( res => res.json() )
            .then( data => {
                setSlideImg(data)   
            })
    }, [])

    const slidex = useRef(null);

    const handleNext = () => {
        if(slidex.current.children.length > 0){
            console.log("Siguiente")
            //* Guardar el primer elemento
            const primerElemento = slidex.current.children[0];

            slidex.current.style.transition = `400ms ease-out all`;

            const tamañoSlidex = slidex.current.children[0].offsetWidth;

            slidex.current.style.transform = `translateX(-${tamañoSlidex}px)`

            const transicion = () => {
                //Reiniciamos nuestro slidex
                slidex.current.style.transition = `none`;
                slidex.current.style.transform = `translateX(0)`

                //Mandamos la primera imagen al final
                slidex.current.appendChild(primerElemento)

                slidex.current.removeEventListener('transitionend',transicion)
            }
            // Esperamos a que termine la trancicion y ejecutamos lo siguente
            slidex.current.addEventListener("transitionend", transicion)
        }
    }

    const handlePrev = () => {
        if(slidex.current.children.length > 0){
            const count = slidex.current.children.length - 1;
            const ultimoSlidex = slidex.current.children[count]
            //Colocamos el ultimo elemento en la primera posicion
            slidex.current.insertBefore(ultimoSlidex, slidex.current.firstChild);
            
            slidex.current.style.transition = 'none'
            const tamañoSlidex = slidex.current.children[0].offsetWidth;
            slidex.current.style.transform = `translateX(-${tamañoSlidex}px)`

            setTimeout(() => {
                slidex.current.style.transition = `400ms ease-out all`;
                slidex.current.style.transform = `translateX(0)`
            }, 40)
        }
    }

    const handleNew = (defaultI) => {
        setNewSlide({
            img: defaultI
        })
        setOpen(true)
    }

    return (
        <>
            <div style={carousel} className="position-relative">

                <div className="contenedor-sliders" ref={slidex}>

                    <div style={nueva} className="position-relative item d-flex flex-column flex-md-row justify-content-center">
                        <small style={editar} onClick={() => handleNew(defaultI)}>
                            <i class="far fa-images"></i>
                        </small>
                        <img style={{ objectFit: 'cover'}} 
                            src={defaultI} alt="" />
                    </div>

                    {
                        slideImg.map(test => (
                            <CardTestimonio { ...test }
                                            setOpen={setOpen}
                                            onAction={handleSlide}
                                            key={test.IdTest} />
                        ))
                    }

                    

                </div>

                <div style={prev_next} className="next position-absolute" onClick={handleNext}>
                    <i className="fas fa-angle-right"></i>
                    <i className="fas fa-angle-right"></i>
                </div>
                <div style={prev_next} className="prev position-absolute" onClick={handlePrev}>
                    <i className="fas fa-angle-left"></i>
                    <i className="fas fa-angle-left"></i>
                </div>
            </div>

            {open && (
                <ModalTestimonio 
                        sx={sty} 
                        open={open} 
                        setOpen={setOpen}
                        data={newSlide}
                        />
            )}
        </>
    )
}

const sty = {
    position: 'absolute'
}

const nueva = {
    minWidth: '100%',
    margin: 'auto',
    height: '200px'
}

const editar = {
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


const carousel = {
    overflow: 'hidden',
    height: 'auto',
    minHeight: '200px',
    alignItems: 'center',
    display: 'flex'
}


const prev_next = {
    background: 'transparent',
    color: 'black',
}
