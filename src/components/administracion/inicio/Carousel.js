import React, { useEffect, useState, useRef } from 'react'
import { CardCarousel } from './CardCarousel';
import { ModalSlide } from './ModalSlide';


const sty = {
    position: 'absolute'
}

export const Carousel = () => {

    const defauldImage = 'https://firebasestorage.googleapis.com/v0/b/restaurantetic21.appspot.com/o/carousel%2Fdefault-featured-image.jpg?alt=media&token=525b974e-724a-44c4-8821-c8fae2286fe3'

    const [slideImg, setSlideImg] = useState([]) // HookScroll

    const [open, setOpen] = useState(false); // Modal
    const handleOpen = () => setOpen(true);
    const [newSlide, setNewSlide] = useState({})

    const handleSlide = (img_acordion,idacordion,d) => { // Accion que me regresa un slide
        //Todo: img_acordion = la imagen que se mostrara al abrir el modal
        //Todo: idacordion  = si tiene valor es porque vamos a editar la imagen
        //Todo: idacordion  = si es null es porque vamos a agregar una nueva imagen
        //Todo: d   = si es true es porque vamos a eliminar esa imagen
        //* Abrir modal
        handleOpen()
        if(d){
            //*Eliminar el slider seleccionado
            setNewSlide({
                img_acordion,
                idacordion,
                delete: true
            })
        }else{
            //* Actualizar o agregar un nuevo slider
            setNewSlide({
                img_acordion,
                idacordion,
                delete: false
            })
        }
        
    }
    
    
    useEffect(() => { // Obtener datos de la base de datos `https://restaurante2021.herokuapp.com/api/inicio`
        fetch( `https://restaurante2021.herokuapp.com/api/inicio`)
        .then( res => res.json() )
        .then( data => {
            setSlideImg(data)
        })
    },[])



    const handleModal = (data,id) => { // accion que me regresa el modal
        //* Cerrar Modal
        if(id === null){
            //* AGREGAMOS UN NUEVO SLIDE A NUESTRO CAROUSEL
            setSlideImg({
                ...slideImg,
                data
            })
        }else{
            //* ACTUALIZAMOS EL ESTADO DEL CAROUSEL
            const updateSlide = slideImg.filter(f => f.id !== id)
            updateSlide.push(data)
            setSlideImg(updateSlide)
        }
        
    }

    

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
    let key = 0;
    return (
        <>
            <div className="carousel position-relative">

                <div className="contenedor-sliders" ref={slidex}>

                    <div className="slideImg s1">
                        <small onClick={() => handleSlide(defauldImage, null,false)} className="edit-img position-absolute">
                            <i class="far fa-images"></i>
                            <small className="edit">Nueva imagen</small>
                        </small>
                        <img src={defauldImage} 
                            className="d-block w-100 h-100" style={{ objectFit:'cover' }} alt="imagen1"  />
                    </div>

                    { 
                        slideImg.map(im => (
                            
                            <CardCarousel {...im} onAction={handleSlide} key={`key${key++}`}/>
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
            

            {/* Modal para agregar una nueva imagen al carousel */}
            {open && (
                <ModalSlide 
                        onAction={handleModal} 
                        sx={sty} 
                        open={open} 
                        setOpen={setOpen}
                        data={newSlide}
                        />
            )}
            
            {/* Modal para agregar una nueva imagen al carousel */}
        </>
    )
}


const prev_next = {
    background: 'black'
}