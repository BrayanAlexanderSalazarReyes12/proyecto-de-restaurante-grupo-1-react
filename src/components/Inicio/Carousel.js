import React, { useRef, useEffect, useState } from 'react'
import { app } from '../../data/bd'
import { Slide } from './Slide';

export const Carousel = () => {


    const [slideImg, setSlideImg] = useState([])
    useEffect(() => { // Obtener datos de la base de datos
        const docRef = app.database().ref('inicio/carousel')
        docRef.on('value', (img) => {
            const all = img.val();
            let arrayImg = []
            for (const id in all) {
                arrayImg.push({ id,...all[id] })
            }
            setSlideImg(arrayImg)
        })
    },[])

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

                    { 
                        slideImg.map(im => (
                            
                            <Slide {...im} key={`key${key++}`}/>
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
            

        </>
    )
}
const prev_next = {
    background: 'black'
}