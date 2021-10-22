import React, {useState,useEffect} from 'react';
import './css/menu.css';
//import {cargar_info_ensal} from './js/cargar_pedidos_ensaladas';
//import {prueba} from './js/prueba';

import ensal from './img/ensaladas';
import carta from './carta/menu.pdf'
export const Menu = () => {
    var [visible,setvisible] = useState(false);
    var [visible1,setvisible1] = useState(false);
    useEffect(()=>{
        var ensaldas = document.getElementById("ensaladas");
        if(visible){
            var top = document.getElementById("ensalada");
            if(top){
                top.removeChild(top.firstChild);
                top.remove();
            }
            if(ensaldas){
                var script = document.createElement("script");
                script.text = `/* ABRIR MODAL A PRODUCTO ESPECIFICO */
                var modal_titulo      = document.querySelector("#modal_titulo");
                var modal_descripcion = document.querySelector("#modal_descripcion");
                var modal_precio      = document.querySelector("#modal_precio");
                var modal_img         = document.querySelector("#modal_img");
                var id_prod           = document.querySelector("#id_prod")
                //indice: Es la posicion en el arreglo donde se encuentra el producto
                //lista: Tenemos 4 categorias en nuestro menu, cada una tiene un numero que identifica a cada una
                // Esta funcion extrae el producto en la categoria especifica
                function modal_data(indice,lista,nombre,descrip,img,precio,id){
                                    
                    let data = {
                        titulo     : '',
                        descripcion: '',
                        img        : '',
                        precio     : 0,
                        id         : ''
                    };

                    modal_titulo.innerHTML      = nombre
                    modal_descripcion.innerHTML = descrip
                    modal_img.src               = img
                    modal_precio.innerHTML      = precio
                    count_prod.innerHTML        = 1
                    id_prod.value               = id
                    console.log(id_prod.value)
                    console.log(indice);
                    console.log(lista);
                    console.log(nombre);
                    console.log(descrip);
                    console.log(img);
                    console.log(precio);
                    console.log(id);
                }
                if(parseInt(localStorage.getItem("cargar_informacion"))!=1){
                    /* Modificar cantidad de productos a comprar  */

                    const mas   = document.querySelector("#mas")
                    const menos = document.querySelector("#menos")
                    const count_prod = document.querySelector("#count_prod")
    
                    mas.addEventListener("click",() => {
                        let count_ = parseInt(count_prod.innerHTML,10)
                        count_prod.innerHTML = count_ = count_ + 1
                    })
    
                    menos.addEventListener("click",() => {
                        let count_ = parseInt(count_prod.innerHTML,10)
                        if(count_ > 0){
                            count_prod.innerHTML = count_ = count_ - 1
                        }
                        
                    })
                }else{
                    /* Modificar cantidad de productos a comprar  */

                    const mas   = document.querySelector("#mas")
                    const menos = document.querySelector("#menos")
                    const count_prod = document.querySelector("#count_prod")
    
                    mas.addEventListener("click",() => {
                        let count_ = parseInt(count_prod.innerHTML,10)
                        count_prod.innerHTML = count_ = count_ + 1
                    })
    
                    menos.addEventListener("click",() => {
                        let count_ = parseInt(count_prod.innerHTML,10)
                        if(count_ > 0){
                            count_prod.innerHTML = count_ = count_ - 1
                        }
                        
                    })
                }`;
                script.id="ensalada";
                
                document.head.appendChild(script);
                localStorage.setItem("cargar_informacion",1);
                
                var ensaladas = document.querySelector("#ensaladas");
                var list_ensaladas  = '';
                const data_ensaladas = [
                    {
                        titulo     : 'Ensalada poke de atún y algas con aguacate',
                        descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus unde facere dolore sit blanditiis quia dignissimos officia sed dicta amet doloribus tempore reiciendis inventore quaerat odit, fugiat minus ipsa suscipit.',
                        precio     : 20000,
                        img        : ''+ensal.en_1+'',
                        id         : 'Ensalada_1'
                    },
                    {
                        titulo     : 'Ensalada poke de atún y algas con aguacate',
                        descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus unde facere dolore sit blanditiis quia dignissimos officia sed dicta amet doloribus tempore reiciendis inventore quaerat odit, fugiat minus ipsa suscipit.',
                        precio     : 20000,
                        img        : ''+ensal.en_2+'',
                        id         : 'Ensalada_2'
                    },
                    {
                        titulo     : 'Ensalada poke de atún y algas con aguacate',
                        descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus unde facere dolore sit blanditiis quia dignissimos officia sed dicta amet doloribus tempore reiciendis inventore quaerat odit, fugiat minus ipsa suscipit.',
                        precio     : 20000,
                        img        : ''+ensal.en_3+'',
                        id         : 'Ensalada_3'
                    },
                    {
                        titulo     : 'Ensalada poke de atún y algas con aguacate',
                        descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus unde facere dolore sit blanditiis quia dignissimos officia sed dicta amet doloribus tempore reiciendis inventore quaerat odit, fugiat minus ipsa suscipit.',
                        precio     : 20000,
                        img        : ''+ensal.en_4+'',
                        id         : 'Ensalada_4'
                    },
                    {
                        titulo     : 'Ensalada poke de atún y algas con aguacate',
                        descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus unde facere dolore sit blanditiis quia dignissimos officia sed dicta amet doloribus tempore reiciendis inventore quaerat odit, fugiat minus ipsa suscipit.',
                        precio     : 20000,
                        img        : ''+ensal.en_5+'',
                        id         : 'Ensalada_5'
                    },
                    {
                        titulo     : 'Ensalada poke de atún y algas con aguacate',
                        descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus unde facere dolore sit blanditiis quia dignissimos officia sed dicta amet doloribus tempore reiciendis inventore quaerat odit, fugiat minus ipsa suscipit.',
                        precio     : 20000,
                        img        : ''+ensal.en_6+'',
                        id         : 'Ensalada_6'
                    },
                    {
                        titulo     : 'Ensalada poke de atún y algas con aguacate',
                        descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus unde facere dolore sit blanditiis quia dignissimos officia sed dicta amet doloribus tempore reiciendis inventore quaerat odit, fugiat minus ipsa suscipit.',
                        precio     : 20000,
                        img        : ''+ensal.en_7+'',
                        id         : 'Ensalada_7'
                    },
                    {
                        titulo     : 'Ensalada poke de atún y algas con aguacate',
                        descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus unde facere dolore sit blanditiis quia dignissimos officia sed dicta amet doloribus tempore reiciendis inventore quaerat odit, fugiat minus ipsa suscipit.',
                        precio     : 20000,
                        img        : ''+ensal.en_8+'',
                        id         : 'Ensalada_8'
                    },
                    {
                        titulo     : 'Ensalada poke de atún y algas con aguacate',
                        descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus unde facere dolore sit blanditiis quia dignissimos officia sed dicta amet doloribus tempore reiciendis inventore quaerat odit, fugiat minus ipsa suscipit.',
                        precio     : 20000,
                        img        : ''+ensal.en_9+'',
                        id         : 'Ensalada_9'
                    },
                    {
                        titulo     : 'Ensalada poke de atún y algas con aguacate',
                        descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus unde facere dolore sit blanditiis quia dignissimos officia sed dicta amet doloribus tempore reiciendis inventore quaerat odit, fugiat minus ipsa suscipit.',
                        precio     : 20000,
                        img        : ''+ensal.en_10+'',
                        id         : 'Ensalada_10'
                    },
                    {
                        titulo     : 'Ensalada poke de atún y algas con aguacate',
                        descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus unde facere dolore sit blanditiis quia dignissimos officia sed dicta amet doloribus tempore reiciendis inventore quaerat odit, fugiat minus ipsa suscipit.',
                        precio     : 20000,
                        img        : ''+ensal.en_11+'',
                        id         : 'Ensalada_11'
                    },
                    {
                        titulo     : 'Ensalada poke de atún y algas con aguacate',
                        descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus unde facere dolore sit blanditiis quia dignissimos officia sed dicta amet doloribus tempore reiciendis inventore quaerat odit, fugiat minus ipsa suscipit.',
                        precio     : 20000,
                        img        : ''+ensal.en_12+'',
                        id         : 'Ensalada_12'
                    },
                ];
                /* Ensaladas */
                const menu_ensaladas = (data) => {
                    
                    for (let index = 0; index < data.length; index++) {
                        const item = data[index];
                        list_ensaladas += 
                        `
                        <div class='col'>
                            <div class='card h-100 card-radius'>
                                <img src='${item.img}' alt='...' class='card-img-top card-imf-radius'>
                                    <div class='card-body'>
                                        <h5 class='card-titulo text-capitalize'>${item.titulo}</h5>
                                        <p class='card-texto'>${item.descripcion}</p>
                                        <p class='card-texto'>$ ${item.precio}</p>
                                        <button onclick="modal_data(${index},1,'${item.titulo}','${item.descripcion}','${item.img}','${item.precio}',${index+1})" class='card-titulo btn-general' data-bs-toggle='modal' data-bs-target='#exampleModalProducto'>Mas informacion</button>
                                    </div>
                                </img>
                            </div>
                        </div>
                        `;
                        
                    }   
                    ensaladas.innerHTML = list_ensaladas;
                }
                menu_ensaladas(data_ensaladas);
            }
            
        }
    },[visible])
    
    useEffect(()=>{
        if(visible1)
        {
            var top = document.getElementById("ensalada");
            //let d_nested = document.getElementById("prueba1");
            top.removeChild(top.firstChild);
        }
        console.log(visible1);
        setvisible1(false);
    },[visible1])

    return (
        <div className="content" id="menu">
            <div className="container_12">
                <div className="grid_12">
                    <h3 className="head2">NUESTRO MENU</h3>
                </div>
            </div>
            <div className="partes_menu">
                <nav>
                    <div className="nav nav-tabs d-flex justify-content-center" id="nav-tab" role="tablist">
                        <button className="nav-link" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home"
                            type="button" role="tab" aria-controls="nav-home" aria-selected="false" onClick={()=>setvisible(true)}>Ensaladas</button>
                        <button className="nav-link " id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile"
                            type="button" role="tab" aria-controls="nav-profile" aria-selected="false" onClick={()=>setvisible1(true)}>Sopas</button>
                        <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact"
                            type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Aperitivos</button>
                        <button className="nav-link" id="nav-bebidas-tab" data-bs-toggle="tab" data-bs-target="#nav-bebidas"
                            type="button" role="tab" aria-controls="nav-bebidas" aria-selected="false">Bebidas</button>
                        <button className="nav-link" id="nav-postres-tab" data-bs-toggle="tab" data-bs-target="#nav-postres"
                            type="button" role="tab" aria-controls="nav-postres" aria-selected="false">Postres</button>
                    </div>
                </nav>

                <div className="tab-content p-5" id="nav-tabContent">
                    <div className="tab-pane fade" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                        <div className="menu_muestra_1">
                            <div id="ensaladas" className='row row-cols-1 row-cols-md-3 g-4'>
                                <h1>ensaladas</h1>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                        <div className="menu_muestra_1" id="menu_muestra_1">
                            <div id="sopas" className='row row-cols-1 row-cols-md-3 g-4'>
                                <h1>sopas</h1>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                        <div className="menu_muestra_1" id="menu_muestra_1">
                            <div id="aperitivos" className='row row-cols-1 row-cols-md-3 g-4'>
                                <h1>aperitivos</h1>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="nav-bebidas" role="tabpanel" aria-labelledby="nav-bebidas-tab">
                        <div className="menu_muestra_1" id="menu_muestra_1">
                            <div id="bebidas" className='row row-cols-1 row-cols-md-3 g-4'>
                                <h1>bebidas</h1>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="nav-postres" role="tabpanel" aria-labelledby="nav-postres-tab">
                        <div className="menu_muestra_1" id="menu_muestra_1">
                            <div id="postres" className='row row-cols-1 row-cols-md-3 g-4'>
                                <h1>postres</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className='modal' id='exampleModalProducto' tabIndex='-1' aria-labelledby='exampleModalLabel'
                aria-hidden='true'>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <input id='id_prod' type="hidden" value=""/>
                        <div className='modal-header'>
                            <h5 id="modal_titulo" className='modal-title'>Lorem ipsum dolor sit amet consectetur adipisicing
                                elit. Ipsam sequi aspernatur deserunt!</h5>
                            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                        </div>
                        <div className='modal-body'>
                            <img id="modal_img" src='img/ensaladas/en_1.webp' alt='...' className='card-img-top '/>
                            <p id="modal_descripcion">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque fugit
                                laboriosam obcaecati animi, asperiores atque nulla dolorem praesentium harum, vitae
                                architecto aut, veritatis quidem nobis.</p>
                        </div>
                        <div className='modal-footer d-flex justify-content-between'>
                            <p id='modal_precio'></p>
                            <div className='cantidad_producto d-flex justify-content-between'>
                                <i id="mas" className="fas fa-plus"></i>
                                <small id="count_prod">1</small>
                                <i id="menos" className="fas fa-minus"></i>
                            </div>
                            <button id="add_cart" type='button' className='btn-general'>Add Cart</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center p-3 ">
                <a className='btn btn-primary' href={carta} role='button'><i className="fa fa-download"></i>DESCARGAR MENU</a>
            </div>
            
            <div className="prueba" id="prueba"></div>
        </div>
    )
    
}
