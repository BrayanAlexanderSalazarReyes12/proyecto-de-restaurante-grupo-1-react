import React, {useState,useEffect} from 'react';
import './css/menu.css';
import carta from './carta/menu.pdf'
//base de datos
import {
    useFirebaseApp
} from 'reactfire'

//cargar informacion de la base de datos
import { getDatabase, ref, child, get } from "firebase/database";
const dbRef = ref(getDatabase());

export const Menu = () => {
    var [visible,setvisible] = useState(false);
    var [visible1,setvisible1] = useState(false);
    var [visible2,setvisible2] = useState(false);
    var [visible3,setvisible3] = useState(false);
    var [visible4,setvisible4] = useState(false);
    var [visible5,setvisible5] = useState(false);
    var [cantensal,setcantensal] = useState(0);
    var [cantensopas,setcantsopas] = useState(0);
    var [cantenaper,setcantaper] = useState(0);
    var [cantbebi,setcantbebi] = useState(0);
    var [cantpost,setcantpost] = useState(0);
    const firebase = useFirebaseApp();
    
    console.log(firebase);
    //ensaladas
    useEffect(()=>{
       setvisible5(true);
       setcantensal(1);
       setvisible1(false);
       setvisible2(false);
       setvisible3(false);
       setvisible4(false);
    },[visible])
    //sopas
    useEffect(()=>{
        setvisible5(true);
        setcantsopas(1);
        setvisible(false);
        setvisible2(false);
        setvisible3(false);
        setvisible4(false);
    },[visible1])

    //aperitivos
    useEffect(()=>{
        setvisible5(true);
        setcantaper(1);
        setvisible(false);
        setvisible1(false);
        setvisible3(false);
        setvisible4(false);
    },[visible2])

    useEffect(()=>{
        setvisible5(true);
        setcantbebi(1);
        setvisible2(false);
        setvisible1(false);
        setvisible(false);
        setvisible4(false);
    },[visible3])

    useEffect(()=>{
        setvisible5(true);
        setcantpost(1);
        setvisible3(false);
        setvisible2(false);
        setvisible1(false);
        setvisible(false);
    },[visible4])

    useEffect(()=>{
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
            id_prod                     = id
            console.log(id_prod.value)
            console.log(indice);
            console.log(lista);
            console.log(nombre);
            console.log(descrip);
            console.log(img);
            console.log(precio);
            console.log(id);
        }
        if(parseInt(localStorage.getItem("cargar_informacion_sopas"))!=1){
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

                    
            /* AGREGAR PRODUCTOS A LOCALSTORAGE */

            const add_cart = document.querySelector("#add_cart")

            add_cart.addEventListener("click", () =>{
                
                let productos = []
                let producto = {
                    titulo     : modal_titulo.innerHTML,
                    descripcion: modal_descripcion.innerHTML,
                    img        : modal_img.src,
                    precio     : parseInt(modal_precio.innerHTML,10),
                    count      : parseInt(count_prod.innerHTML,10),
                    id         : id_prod
                }

                let localS = localStorage.getItem("productos")
                if(localS === null){
                    productos.push(producto)
                    localStorage.setItem("productos",JSON.stringify(productos))
                    location.reload(true);
                }else{
                    /* Verificar si el producto existe en el localstorage para evitar guardar duplicas*/
                    const cart_localstorage = JSON.parse(localS); // Convierto de string a JSON
                    let existe_ = cart_localstorage.filter(p => p.id === producto.id); // Verifico si el producto existe en localstorage
                    if(existe_.length > 0){ // verifico si encontro un producto repetido
                        //Si encuentra un producto repetido aumento el numero de productos que quiere
                        let add_storag = cart_localstorage.filter(p => p.id !== producto.id); // Obtengo todos los datos menos el producto repetido para agregar el actualizado
                        existe_[0].count = existe_[0].count + producto.count // sumo la cantidad de productos que tenia con la nueva que quiere ingresar
                        add_storag.push(...existe_) // Agregamos el producto actualizado
                        productos.push(...add_storag) // Agrego al arreglo todos los datos menos el producto duplicado
                        localStorage.setItem("productos",JSON.stringify(productos))
                        location.reload(true);
                    }else{
                        // Si no encuentra ningun producto duplicado Lo agrego al arreglo y actualizo el storage
                        productos.push(...cart_localstorage)
                        productos.push(producto)
                        localStorage.setItem("productos",JSON.stringify(productos))
                        location.reload(true);
                    }
                    
                    let cart = JSON.parse(localStorage.getItem("productos"))
                    //aumentar_icon_carrito(cart)
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

                
            /* AGREGAR PRODUCTOS A LOCALSTORAGE */

            const add_cart = document.querySelector("#add_cart")

            add_cart.addEventListener("click", () =>{
                
                let productos = []
                let producto = {
                    titulo     : modal_titulo.innerHTML,
                    descripcion: modal_descripcion.innerHTML,
                    img        : modal_img.src,
                    precio     : parseInt(modal_precio.innerHTML,10),
                    count      : parseInt(count_prod.innerHTML,10),
                    id         : id_prod
                }

                let localS = localStorage.getItem("productos")
                if(localS === null){
                    productos.push(producto)
                    localStorage.setItem("productos",JSON.stringify(productos))
                    location.reload(true);
                }else{
                    /* Verificar si el producto existe en el localstorage para evitar guardar duplicas*/
                    const cart_localstorage = JSON.parse(localS); // Convierto de string a JSON
                    let existe_ = cart_localstorage.filter(p => p.id === producto.id); // Verifico si el producto existe en localstorage
                    if(existe_.length > 0){ // verifico si encontro un producto repetido
                        //Si encuentra un producto repetido aumento el numero de productos que quiere
                        let add_storag = cart_localstorage.filter(p => p.id !== producto.id); // Obtengo todos los datos menos el producto repetido para agregar el actualizado
                        existe_[0].count = existe_[0].count + producto.count // sumo la cantidad de productos que tenia con la nueva que quiere ingresar
                        add_storag.push(...existe_) // Agregamos el producto actualizado
                        productos.push(...add_storag) // Agrego al arreglo todos los datos menos el producto duplicado
                        localStorage.setItem("productos",JSON.stringify(productos))
                        location.reload(true);
                    }else{
                        // Si no encuentra ningun producto duplicado Lo agrego al arreglo y actualizo el storage
                        productos.push(...cart_localstorage)
                        productos.push(producto)
                        localStorage.setItem("productos",JSON.stringify(productos))
                        location.reload(true);
                    }
                    
                    let cart = JSON.parse(localStorage.getItem("productos"))
                    //aumentar_icon_carrito(cart)
                }
            })
        }`;
        script.id="comidamenu";
        var bebidas = document.getElementById("bebidas");
        var postres = document.getElementById("postres");
        if(visible5){
            if(cantensal == 1){
                setcantsopas(0);
                var ensaldas = document.getElementById("ensaladas");
                var cantidad = 0;
                if(visible){
                    get(child(dbRef, `productos/ensaladas_cantidad/`)).then((snapshot) => {
                        if (snapshot.exists()) {
                            cantidad = snapshot.val().cantidad;
                            console.log(cantidad);
                            var top = document.getElementById("comidamenu");
                            if(top){
                                top.removeChild(top.firstChild);
                                top.remove();
                            }
                            if(ensaldas){
                                document.head.appendChild(script);
                                localStorage.setItem("cargar_informacion",1);
                                var list_ensaladas = '';
                                for(var i=0; i<cantidad; i++){
                                    var id_cantidad = i +1;
                                    get(child(dbRef, `productos/ensaladas/${id_cantidad}`)).then((snapshot) => {
                                        if (snapshot.exists()) {
                                            list_ensaladas += 
                                            `
                                            <div class='col'>
                                                <div class='card h-100 card-radius'>
                                                    <img src='${snapshot.val().imagen}' alt='...' class='card-img-top card-imf-radius'>
                                                        <div class='card-body'>
                                                            <h5 class='card-titulo text-capitalize'>${snapshot.val().nombre}</h5>
                                                            <p class='card-texto'>${snapshot.val().descripcion}</p>
                                                            <p class='card-texto'>$ ${snapshot.val().precio}</p>
                                                            <button onclick="modal_data(${snapshot.val().id},1,'${snapshot.val().nombre}','${snapshot.val().descripcion}','${snapshot.val().imagen}','${snapshot.val().precio}','ensalada_'+${snapshot.val().id})" class='card-titulo btn-general' data-bs-toggle='modal' data-bs-target='#exampleModalProducto'>Mas informacion</button>
                                                        </div>
                                                    </img>
                                                </div>
                                            </div>
                                            `;
                                            ensaldas.innerHTML = list_ensaladas;
                                            
                                        } else {
                                        console.log("No data available");
                                        }
                                    }).catch((error) => {
                                        console.error(error);
                                    });
                                }
                                
                            }
                        }  
                    }).catch((error) => {
                        console.error(error);
                    });
                }
            
            }
            if(cantensopas == 1){
                setcantensal(0);
                var sopas = document.getElementById("sopas");
                var cantidad = 0;
                if(visible1){
                    get(child(dbRef, `productos/sopas_cantidad/`)).then((snapshot) => {
                        if (snapshot.exists()) {
                            cantidad = snapshot.val().cantidad;
                            console.log(cantidad);
                            var top = document.getElementById("comidamenu");
                            if(top){
                                top.removeChild(top.firstChild);
                                top.remove();
                            }
                            if(sopas){
                                document.head.appendChild(script);
                                localStorage.setItem("cargar_informacion_sopas",1);
                                var list_sopas = '';
                                for(var i=0; i<cantidad; i++){
                                    var id_cantidad = i +1;
                                    const dbRef = ref(getDatabase());
                                    get(child(dbRef, `productos/sopas/${id_cantidad}`)).then((snapshot) => {
                                    if (snapshot.exists()) {
                                        list_sopas += 
                                        `
                                        <div class='col'>
                                            <div class='card h-100 card-radius'>
                                                <img src='${snapshot.val().imagen}' alt='...' class='card-img-top card-imf-radius'>
                                                    <div class='card-body'>
                                                        <h5 class='card-title text-capitalize'>${snapshot.val().nombre}</h5>
                                                        <p class='card-text'>${snapshot.val().descripcion}</p>
                                                        <p class='card-text'>$ ${snapshot.val().precio}</p>
                                                        <button onclick="modal_data(${snapshot.val().id-1},1,'${snapshot.val().nombre}','${snapshot.val().descripcion}','${snapshot.val().imagen}','${snapshot.val().precio}','sopas_'+${snapshot.val().id})" class='card-titulo btn-general' data-bs-toggle='modal' data-bs-target='#exampleModalProducto'>Mas informacion</button>
                                                    </div>
                                                </img>
                                            </div>
                                        </div>
                                        `;
                                        sopas.innerHTML = list_sopas;
                                    } else {
                                        console.log("No data available");
                                    }
                                    }).catch((error) => {
                                    console.error(error);
                                    });
                                    
                                }
                            }
                        }
                    }).catch((error) => {
                        console.error(error);
                    });
                    
                }
            }
            if(cantenaper == 1){
                setcantaper(0);
                var aperitivos = document.getElementById("aperitivos");
                var cantidad = 0;
                if(visible2){
                    get(child(dbRef, `productos/aperitivos_cantidad/`)).then((snapshot) => {
                        if (snapshot.exists()) {
                            cantidad = snapshot.val().cantidad;
                            console.log(cantidad);
                            var top = document.getElementById("comidamenu");
                            if(top){
                                top.removeChild(top.firstChild);
                                top.remove();
                            }
                            if(aperitivos){
                                document.head.appendChild(script);
                                localStorage.setItem("cargar_informacion_aperitivos",1);
                                var list_aperitivos = '';
                                for(var i=0; i<cantidad; i++){
                                    const id_cantidad = i+1;
                                    get(child(dbRef, `productos/aperitivos/${id_cantidad}`)).then((snapshot) => {
                                    if (snapshot.exists()) {
                                        list_aperitivos += 
                                        `
                                        <div class='col'>
                                            <div class='card h-100 card-radius'>
                                                <img src=${snapshot.val().imagen} alt='...' class='card-img-top card-imf-radius'>
                                                    <div class='card-body'>
                                                        <h5 class='card-title text-capitalize'>${snapshot.val().nombre}</h5>
                                                        <p class='card-text'>${snapshot.val().descripcion}</p>
                                                        <p class='card-text'>$ ${snapshot.val().precio}</p>
                                                        <button onclick="modal_data(${snapshot.val().id-1},3,'${snapshot.val().nombre}','${snapshot.val().descripcion}','${snapshot.val().imagen}','${snapshot.val().precio}','aperitivos_'+${snapshot.val().id})" class='btn-general' data-bs-toggle='modal' data-bs-target='#exampleModalProducto'>Mas informacion</button>
                                                    </div>
                                                </img>
                                            </div>
                                        </div>
                                        `;
                                        aperitivos.innerHTML = list_aperitivos;
                                    } else {
                                        console.log("No data available");
                                    }
                                    }).catch((error) => {
                                        console.error(error);
                                    });
                                }
                            }
                        } 
                    }).catch((error) => {
                    console.error(error);
                    });
                }
            }
            if(cantbebi == 1){
                setcantbebi(0);
                var bebidas = document.getElementById("bebidas");
                var cantidad = 0;
                if(visible3){
                    
                    get(child(dbRef, `productos/bebidas_cantidad/`)).then((snapshot) => {
                        if (snapshot.exists()) {
                            cantidad = snapshot.val().cantidad;
                            console.log(cantidad);
                            var top = document.getElementById("comidamenu");
                            if(top){
                                top.removeChild(top.firstChild);
                                top.remove();
                            }
                            if(bebidas){
                                document.head.appendChild(script);
                                localStorage.setItem("cargar_informacion_bebidas",1);
                                var list_bebidas = '';
                                for(var i=0; i<cantidad;i++){
                                    const id_cantidad = i +1;
                                    get(child(dbRef, `productos/bebidas/${id_cantidad}`)).then((snapshot) => {
                                        if (snapshot.exists()) {           
                                                list_bebidas += 
                                                `
                                                <div class='col'>
                                                    <div class='card h-100 card-radius'>
                                                        <img src=${snapshot.val().imagen} alt='...' class='card-img-top card-imf-radius'>
                                                            <div class='card-body'>
                                                                <h5 class='card-title text-capitalize'>${snapshot.val().nombre}</h5>
                                                                <p class='card-text'>${snapshot.val().descripcion}</p>
                                                                <p class='card-text'>$ ${snapshot.val().precio}</p>
                                                                <button onclick="modal_data(${snapshot.val().id-1},3,'${snapshot.val().nombre}','${snapshot.val().descripcion}','${snapshot.val().imagen}','${snapshot.val().precio}','bebidas_'+${snapshot.val().id})" class='btn-general' data-bs-toggle='modal' data-bs-target='#exampleModalProducto'>Mas informacion</button>
                                                            </div>
                                                        </img>
                                                    </div>
                                                </div>
                                                `;
                                                bebidas.innerHTML = list_bebidas;
                                            
                                        } else {
                                        console.log("No data available");
                                        }
                                    }).catch((error) => {
                                        console.error(error);
                                    });
                                }
                            }
                        }
                    }).catch((error) => {
                        console.error(error);
                    });
                }
            }
            if(cantpost == 1){
                 if(visible4){
                    var postres = document.getElementById("postres");
                    var cantidad = 0;
                    get(child(dbRef, `productos/postres_cantidad/`)).then((snapshot) => {
                        if (snapshot.exists()) {
                            cantidad = snapshot.val().cantidad;
                            console.log(cantidad);
                            var top = document.getElementById("comidamenu");
                            if(top){
                                top.removeChild(top.firstChild);
                                top.remove();
                            }
                            if(postres){
                                document.head.appendChild(script);
                                localStorage.setItem("cargar_informacion_postres",1);
                                var list_postres = '';
                                for(var i=0; i<cantidad; i++){
                                    const id_cantidad = i+1;
                                    get(child(dbRef, `productos/postres/${id_cantidad}`)).then((snapshot) => {
                                        if (snapshot.exists()) {
                                            list_postres += 
                                            `
                                                <div class='col'>
                                                    <div class='card h-100 card-radius'>
                                                        <img src=${snapshot.val().imagen} alt='...' class='card-img-top card-imf-radius'>
                                                            <div class='card-body'>
                                                                <h5 class='card-title text-capitalize'>${snapshot.val().nombre}</h5>
                                                                <p class='card-text'>${snapshot.val().descripcion}</p>
                                                                <p class='card-text'>$ ${snapshot.val().precio}</p>
                                                                <button onclick="modal_data(${snapshot.val().id-1},3,'${snapshot.val().nombre}','${snapshot.val().descripcion}','${snapshot.val().imagen}','${snapshot.val().precio}','postres_'+${snapshot.val().id})" class='btn-general' data-bs-toggle='modal' data-bs-target='#exampleModalProducto'>Mas informacion</button>
                                                            </div>
                                                        </img>
                                                    </div>
                                                </div>
                                            `;
                                            postres.innerHTML = list_postres;
                                        } else {
                                        console.log("No data available");
                                        }
                                    }).catch((error) => {
                                        console.error(error);
                                    });
                                }
                            }
                        }
                    }).catch((error) => {
                        console.error(error);
                    });
                }
            }
            setvisible5(false);
        }
    },[visible5])

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
                            type="button" role="tab" aria-controls="nav-contact" aria-selected="false" onClick={()=>setvisible2(true)}>Aperitivos</button>
                        <button className="nav-link" id="nav-bebidas-tab" data-bs-toggle="tab" data-bs-target="#nav-bebidas"
                            type="button" role="tab" aria-controls="nav-bebidas" aria-selected="false" onClick={()=>setvisible3(true)}>Bebidas</button>
                        <button className="nav-link" id="nav-postres-tab" data-bs-toggle="tab" data-bs-target="#nav-postres"
                            type="button" role="tab" aria-controls="nav-postres" aria-selected="false" onClick={()=>setvisible4(true)}>Postres</button>
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
