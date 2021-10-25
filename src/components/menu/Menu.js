import React, {useState,useEffect} from 'react';
import './css/menu.css';
import ensal from './img/ensaladas';
import sop from './img/sopas';
import ap from './img/aperitivos'
import bed from './img/bebidas'
import carta from './carta/menu.pdf'
//base de datos
import {
    useFirebaseApp
} from 'reactfire'
import { insertar_base_de_datos } from '../bd/insertar_productos';
//cargar informacion de la base de datos
import { getDatabase, ref, child, get } from "firebase/database";
const dbRef = ref(getDatabase());

export const Menu = () => {
    var [visible,setvisible] = useState(false);
    var [visible1,setvisible1] = useState(false);
    var [visible2,setvisible2] = useState(false);
    var [visible3,setvisible3] = useState(false);
    const firebase = useFirebaseApp();
    
    console.log(firebase);
    //ensaladas
    useEffect(()=>{
        var ensaldas = document.getElementById("ensaladas");
        var cantidad = 0;
        if(visible){
            get(child(dbRef, `productos/ensaladas_cantidad/`)).then((snapshot) => {
                if (snapshot.exists()) {
                    cantidad = snapshot.val().cantidad;
                    console.log(cantidad);
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
                            id_prod               = id
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

                                let localS = localStorage.getItem("cart")
                                if(localS === null){
                                    productos.push(producto)
                                    localStorage.setItem("cart",JSON.stringify(productos))
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
                                        localStorage.setItem("cart",JSON.stringify(productos))
                                        location.reload(true);
                                    }else{
                                        // Si no encuentra ningun producto duplicado Lo agrego al arreglo y actualizo el storage
                                        productos.push(...cart_localstorage)
                                        productos.push(producto)
                                        localStorage.setItem("cart",JSON.stringify(productos))
                                        location.reload(true);
                                    }
                                    
                                    let cart = JSON.parse(localStorage.getItem("cart"))
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

                                let localS = localStorage.getItem("cart")
                                if(localS === null){
                                    productos.push(producto)
                                    localStorage.setItem("cart",JSON.stringify(productos))
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
                                        localStorage.setItem("cart",JSON.stringify(productos))
                                        location.reload(true);
                                    }else{
                                        // Si no encuentra ningun producto duplicado Lo agrego al arreglo y actualizo el storage
                                        productos.push(...cart_localstorage)
                                        productos.push(producto)
                                        localStorage.setItem("cart",JSON.stringify(productos))
                                        location.reload(true);
                                    }
                                    
                                    let cart = JSON.parse(localStorage.getItem("cart"))
                                    //aumentar_icon_carrito(cart)
                                }
                            })
                        }`;
                        script.id="ensalada";
                        
                        document.head.appendChild(script);
                        localStorage.setItem("cargar_informacion",1);
                        var ensaladas = document.querySelector("#ensaladas");
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
                                    ensaladas.innerHTML = list_ensaladas;
                                    
                                } else {
                                  console.log("No data available");
                                }
                              }).catch((error) => {
                                console.error(error);
                            });
                        }
                        
                    }
                } else {
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
                            id_prod               = id
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
                        }
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

                            let localS = localStorage.getItem("cart")
                            if(localS === null){
                                productos.push(producto)
                                localStorage.setItem("cart",JSON.stringify(productos))
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
                                    localStorage.setItem("cart",JSON.stringify(productos))
                                    location.reload(true);
                                }else{
                                    // Si no encuentra ningun producto duplicado Lo agrego al arreglo y actualizo el storage
                                    productos.push(...cart_localstorage)
                                    productos.push(producto)
                                    localStorage.setItem("cart",JSON.stringify(productos))
                                    location.reload(true);
                                }
                                
                                let cart = JSON.parse(localStorage.getItem("cart"))
                                //aumentar_icon_carrito(cart)
                            }
                        })`;
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
                                const cantidad_id = index + 1;
                                list_ensaladas += 
                                `
                                <div class='col'>
                                    <div class='card h-100 card-radius'>
                                        <img src='${item.img}' alt='...' class='card-img-top card-imf-radius'>
                                            <div class='card-body'>
                                                <h5 class='card-titulo text-capitalize'>${item.titulo}</h5>
                                                <p class='card-texto'>${item.descripcion}</p>
                                                <p class='card-texto'>$ ${item.precio}</p>
                                                <button onclick="modal_data(${index},1,'${item.titulo}','${item.descripcion}','${item.img}','${item.precio}','ensalada_'+${index+1})" class='card-titulo btn-general' data-bs-toggle='modal' data-bs-target='#exampleModalProducto'>Mas informacion</button>
                                            </div>
                                        </img>
                                    </div>
                                </div>
                                `;
                                insertar_base_de_datos("ensaladas",""+cantidad_id+"",""+item.titulo+"",""+item.descripcion+"",""+item.precio+"",""+item.img+"",cantidad_id);
                            }   
                            ensaladas.innerHTML = list_ensaladas;
                        }
                        menu_ensaladas(data_ensaladas);
                    }
                }
            }).catch((error) => {
                console.error(error);
            });
        }
    },[visible])
    //sopas
    useEffect(()=>{
        var sopas = document.getElementById("sopas");
        var cantidad = 0;
        if(visible1){
            const dbRef = ref(getDatabase());
            get(child(dbRef, `productos/sopas_cantidad/`)).then((snapshot) => {
            if (snapshot.exists()) {
                cantidad = snapshot.val().cantidad;
                console.log(cantidad);
                var top = document.getElementById("sopas_1");
                if(top){
                    top.removeChild(top.firstChild);
                    top.remove();
                }
                if(sopas){
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
                    }
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

                        let localS = localStorage.getItem("cart")
                        if(localS === null){
                            productos.push(producto)
                            localStorage.setItem("cart",JSON.stringify(productos))
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
                                localStorage.setItem("cart",JSON.stringify(productos))
                                location.reload(true);
                            }else{
                                // Si no encuentra ningun producto duplicado Lo agrego al arreglo y actualizo el storage
                                productos.push(...cart_localstorage)
                                productos.push(producto)
                                localStorage.setItem("cart",JSON.stringify(productos))
                                location.reload(true);
                            }
                            
                            let cart = JSON.parse(localStorage.getItem("cart"))
                            //aumentar_icon_carrito(cart)
                        }
                    })`;
                    script.id="sopas_1";
                    var sopas_1 = document.querySelector("#sopas");
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
                            sopas_1.innerHTML = list_sopas;
                        } else {
                            console.log("No data available");
                        }
                        }).catch((error) => {
                        console.error(error);
                        });
                        
                    }
                }
            } else {
                var top = document.getElementById("sopas_1");
                if(top){
                    top.removeChild(top.firstChild);
                    top.remove();
                }
                if(sopas){
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

                            let localS = localStorage.getItem("cart")
                            if(localS === null){
                                productos.push(producto)
                                localStorage.setItem("cart",JSON.stringify(productos))
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
                                    localStorage.setItem("cart",JSON.stringify(productos))
                                    location.reload(true);
                                }else{
                                    // Si no encuentra ningun producto duplicado Lo agrego al arreglo y actualizo el storage
                                    productos.push(...cart_localstorage)
                                    productos.push(producto)
                                    localStorage.setItem("cart",JSON.stringify(productos))
                                    location.reload(true);
                                }
                                
                                let cart = JSON.parse(localStorage.getItem("cart"))
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

                            let localS = localStorage.getItem("cart")
                            if(localS === null){
                                productos.push(producto)
                                localStorage.setItem("cart",JSON.stringify(productos))
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
                                    localStorage.setItem("cart",JSON.stringify(productos))
                                    location.reload(true);
                                }else{
                                    // Si no encuentra ningun producto duplicado Lo agrego al arreglo y actualizo el storage
                                    productos.push(...cart_localstorage)
                                    productos.push(producto)
                                    localStorage.setItem("cart",JSON.stringify(productos))
                                    location.reload(true);
                                }
                                
                                let cart = JSON.parse(localStorage.getItem("cart"))
                                //aumentar_icon_carrito(cart)
                            }
                        })
                    }`;
                    script.id="sopas_1";
                    var sopas_1 = document.querySelector("#sopas");
                    document.head.appendChild(script);
                    localStorage.setItem("cargar_informacion_sopas",1);
                    var list_sopas = '';
                    const data_sopas = [
                        {
                            titulo     : 'Ensalada poke de atún y algas con aguacate',
                            descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus unde facere dolore sit blanditiis quia dignissimos officia sed dicta amet doloribus tempore reiciendis inventore quaerat odit, fugiat minus ipsa suscipit.',
                            precio     : 20000,
                            img        : ''+sop.sop_1+'',
                            id         : 'sopa_1'
                        },
                        {
                            titulo     : 'Ensalada poke de atún y algas con aguacate',
                            descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus unde facere dolore sit blanditiis quia dignissimos officia sed dicta amet doloribus tempore reiciendis inventore quaerat odit, fugiat minus ipsa suscipit.',
                            precio     : 20000,
                            img        : ''+sop.sop_2+'',
                            id         : 'sopa_2'
                        },
                        {
                            titulo     : 'Ensalada poke de atún y algas con aguacate',
                            descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus unde facere dolore sit blanditiis quia dignissimos officia sed dicta amet doloribus tempore reiciendis inventore quaerat odit, fugiat minus ipsa suscipit.',
                            precio     : 20000,
                            img        : ''+sop.sop_3+'',
                            id         : 'sopa_3'
                        },
                        {
                            titulo     : 'Ensalada poke de atún y algas con aguacate',
                            descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus unde facere dolore sit blanditiis quia dignissimos officia sed dicta amet doloribus tempore reiciendis inventore quaerat odit, fugiat minus ipsa suscipit.',
                            precio     : 20000,
                            img        : ''+sop.sop_4+'',
                            id         : 'sopa_4'
                        },
                        {
                            titulo     : 'Ensalada poke de atún y algas con aguacate',
                            descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus unde facere dolore sit blanditiis quia dignissimos officia sed dicta amet doloribus tempore reiciendis inventore quaerat odit, fugiat minus ipsa suscipit.',
                            precio     : 20000,
                            img        : ''+sop.sop_5+'',
                            id         : 'sopa_5'
                        },
                        {
                            titulo     : 'Ensalada poke de atún y algas con aguacate',
                            descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus unde facere dolore sit blanditiis quia dignissimos officia sed dicta amet doloribus tempore reiciendis inventore quaerat odit, fugiat minus ipsa suscipit.',
                            precio     : 20000,
                            img        : ''+sop.sop_6+'',
                            id         : 'sopa_6'
                        },
                        {
                            titulo     : 'Ensalada poke de atún y algas con aguacate',
                            descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus unde facere dolore sit blanditiis quia dignissimos officia sed dicta amet doloribus tempore reiciendis inventore quaerat odit, fugiat minus ipsa suscipit.',
                            precio     : 20000,
                            img        : ''+sop.sop_7+'',
                            id         : 'sopa_7'
                        },
                        {
                            titulo     : 'Ensalada poke de atún y algas con aguacate',
                            descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus unde facere dolore sit blanditiis quia dignissimos officia sed dicta amet doloribus tempore reiciendis inventore quaerat odit, fugiat minus ipsa suscipit.',
                            precio     : 20000,
                            img        : ''+sop.sop_8+'',
                            id         : 'sopa_8'
                        },
                        {
                            titulo     : 'Ensalada poke de atún y algas con aguacate',
                            descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus unde facere dolore sit blanditiis quia dignissimos officia sed dicta amet doloribus tempore reiciendis inventore quaerat odit, fugiat minus ipsa suscipit.',
                            precio     : 20000,
                            img        : ''+sop.sop_9+'',
                            id         : 'sopa_9'
                        },
                        {
                            titulo     : 'Ensalada poke de atún y algas con aguacate',
                            descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus unde facere dolore sit blanditiis quia dignissimos officia sed dicta amet doloribus tempore reiciendis inventore quaerat odit, fugiat minus ipsa suscipit.',
                            precio     : 20000,
                            img        : ''+sop.sop_10+'',
                            id         : 'sopa_10'
                        },
                        {
                            titulo     : 'Ensalada poke de atún y algas con aguacate',
                            descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus unde facere dolore sit blanditiis quia dignissimos officia sed dicta amet doloribus tempore reiciendis inventore quaerat odit, fugiat minus ipsa suscipit.',
                            precio     : 20000,
                            img        : ''+sop.sop_11+'',
                            id         : 'sopa_11'
                        },
                        {
                            titulo     : 'Ensalada poke de atún y algas con aguacate',
                            descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus unde facere dolore sit blanditiis quia dignissimos officia sed dicta amet doloribus tempore reiciendis inventore quaerat odit, fugiat minus ipsa suscipit.',
                            precio     : 20000,
                            img        : ''+sop.sop_12+'',
                            id         : 'sopa_12'
                        },
                    ];
                    /* Sopas */
                    const menu_sopas  = (data)  => {
                        for (let index = 0; index < data.length; index++) {
                            const item = data[index];
                            const cantidad_id = index + 1;
                            list_sopas += 
                            `
                            <div class='col'>
                                <div class='card h-100 card-radius'>
                                    <img src='${item.img}' alt='...' class='card-img-top card-imf-radius'>
                                        <div class='card-body'>
                                            <h5 class='card-title text-capitalize'>${item.titulo}</h5>
                                            <p class='card-text'>${item.descripcion}</p>
                                            <p class='card-text'>$ ${item.precio}</p>
                                            <button onclick="modal_data(${index},2,'${item.titulo}','${item.descripcion}','${item.img}','${item.precio}','sopas_'+${index+1})" class='btn-general' data-bs-toggle='modal' data-bs-target='#exampleModalProducto'>Mas informacion</button>
                                        </div>
                                    </img>
                                </div>
                            </div>
                            `;
                            insertar_base_de_datos("sopas",""+cantidad_id+"",""+item.titulo+"",""+item.descripcion+"",""+item.precio+"",""+item.img+"",cantidad_id);
                        }
                        sopas_1.innerHTML = list_sopas;
                    }
                    menu_sopas(data_sopas);
                }
            }
            }).catch((error) => {
                console.error(error);
            });
            
        }
    },[visible1])

    //aperitivos
    useEffect(()=>{
        var aperitivos = document.getElementById("aperitivos");
        var cantidad = 0;
        if(visible2){
            var top = document.getElementById("aperitivos_1");
            get(child(dbRef, `productos/aperitivos_cantidad/`)).then((snapshot) => {
            if (snapshot.exists()) {
                cantidad = snapshot.val().cantidad;
                console.log(cantidad);
                if(top){
                    top.removeChild(top.firstChild);
                    top.remove();
                }
                if(aperitivos){
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
                    if(parseInt(localStorage.getItem("cargar_informacion_aperitivos"))!=1){
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
    
                            let localS = localStorage.getItem("cart")
                            if(localS === null){
                                productos.push(producto)
                                localStorage.setItem("cart",JSON.stringify(productos))
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
                                    localStorage.setItem("cart",JSON.stringify(productos))
                                    location.reload(true);
                                }else{
                                    // Si no encuentra ningun producto duplicado Lo agrego al arreglo y actualizo el storage
                                    productos.push(...cart_localstorage)
                                    productos.push(producto)
                                    localStorage.setItem("cart",JSON.stringify(productos))
                                    location.reload(true);
                                }
                                
                                let cart = JSON.parse(localStorage.getItem("cart"))
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
    
                            let localS = localStorage.getItem("cart")
                            if(localS === null){
                                productos.push(producto)
                                localStorage.setItem("cart",JSON.stringify(productos))
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
                                    localStorage.setItem("cart",JSON.stringify(productos))
                                    location.reload(true);
                                }else{
                                    // Si no encuentra ningun producto duplicado Lo agrego al arreglo y actualizo el storage
                                    productos.push(...cart_localstorage)
                                    productos.push(producto)
                                    localStorage.setItem("cart",JSON.stringify(productos))
                                    location.reload(true);
                                }
                                
                                let cart = JSON.parse(localStorage.getItem("cart"))
                                //aumentar_icon_carrito(cart)
                            }
                        })
                    }`;
                    script.id="aperitivos_1";
                    var aperitivos_1 = document.querySelector("#aperitivos");
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
            } else {
                if(top){
                    top.removeChild(top.firstChild);
                    top.remove();
                }
                if(aperitivos){
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
                    if(parseInt(localStorage.getItem("cargar_informacion_aperitivos"))!=1){
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
    
                            let localS = localStorage.getItem("cart")
                            if(localS === null){
                                productos.push(producto)
                                localStorage.setItem("cart",JSON.stringify(productos))
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
                                    localStorage.setItem("cart",JSON.stringify(productos))
                                    location.reload(true);
                                }else{
                                    // Si no encuentra ningun producto duplicado Lo agrego al arreglo y actualizo el storage
                                    productos.push(...cart_localstorage)
                                    productos.push(producto)
                                    localStorage.setItem("cart",JSON.stringify(productos))
                                    location.reload(true);
                                }
                                
                                let cart = JSON.parse(localStorage.getItem("cart"))
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
    
                            let localS = localStorage.getItem("cart")
                            if(localS === null){
                                productos.push(producto)
                                localStorage.setItem("cart",JSON.stringify(productos))
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
                                    localStorage.setItem("cart",JSON.stringify(productos))
                                    location.reload(true);
                                }else{
                                    // Si no encuentra ningun producto duplicado Lo agrego al arreglo y actualizo el storage
                                    productos.push(...cart_localstorage)
                                    productos.push(producto)
                                    localStorage.setItem("cart",JSON.stringify(productos))
                                    location.reload(true);
                                }
                                
                                let cart = JSON.parse(localStorage.getItem("cart"))
                                //aumentar_icon_carrito(cart)
                            }
                        })
                    }`;
                    script.id="aperitivos_1";
                    var aperitivos_1 = document.querySelector("#aperitivos");
                    document.head.appendChild(script);
                    localStorage.setItem("cargar_informacion_aperitivos",1);
                    var list_aperitivos = '';
                    const data_aperitivos = [
                        {
                            titulo     : 'Ensalada poke de atún y algas con aguacate',
                            descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus unde facere dolore sit blanditiis quia dignissimos officia sed dicta amet doloribus tempore reiciendis inventore quaerat odit, fugiat minus ipsa suscipit.',
                            precio     : 20000,
                            img        : ''+ap.ap_1+'',
                            id         : 'aperitivo_1'
                        },
                        {
                            titulo     : 'Ensalada poke de atún y algas con aguacate',
                            descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus unde facere dolore sit blanditiis quia dignissimos officia sed dicta amet doloribus tempore reiciendis inventore quaerat odit, fugiat minus ipsa suscipit.',
                            precio     : 20000,
                            img        : ''+ap.ap_2+'',
                            id         : 'aperitivo_2'
                        },
                        {
                            titulo     : 'Ensalada poke de atún y algas con aguacate',
                            descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus unde facere dolore sit blanditiis quia dignissimos officia sed dicta amet doloribus tempore reiciendis inventore quaerat odit, fugiat minus ipsa suscipit.',
                            precio     : 20000,
                            img        : ''+ap.ap_3+'',
                            id         : 'aperitivo_3'
                        },
                        {
                            titulo     : 'Ensalada poke de atún y algas con aguacate',
                            descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus unde facere dolore sit blanditiis quia dignissimos officia sed dicta amet doloribus tempore reiciendis inventore quaerat odit, fugiat minus ipsa suscipit.',
                            precio     : 20000,
                            img        : ''+ap.ap_4+'',
                            id         : 'aperitivo_4'
                        },
                        {
                            titulo     : 'Ensalada poke de atún y algas con aguacate',
                            descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus unde facere dolore sit blanditiis quia dignissimos officia sed dicta amet doloribus tempore reiciendis inventore quaerat odit, fugiat minus ipsa suscipit.',
                            precio     : 20000,
                            img        : ''+ap.ap_5+'',
                            id         : 'aperitivo_5'
                        },
                        {
                            titulo     : 'Ensalada poke de atún y algas con aguacate',
                            descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus unde facere dolore sit blanditiis quia dignissimos officia sed dicta amet doloribus tempore reiciendis inventore quaerat odit, fugiat minus ipsa suscipit.',
                            precio     : 20000,
                            img        : ''+ap.ap_6+'',
                            id         : 'aperitivo_6'
                        },
                        {
                            titulo     : 'Ensalada poke de atún y algas con aguacate',
                            descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus unde facere dolore sit blanditiis quia dignissimos officia sed dicta amet doloribus tempore reiciendis inventore quaerat odit, fugiat minus ipsa suscipit.',
                            precio     : 20000,
                            img        : ''+ap.ap_7+'',
                            id         : 'aperitivo_7'
                        },
                        {
                            titulo     : 'Ensalada poke de atún y algas con aguacate',
                            descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus unde facere dolore sit blanditiis quia dignissimos officia sed dicta amet doloribus tempore reiciendis inventore quaerat odit, fugiat minus ipsa suscipit.',
                            precio     : 20000,
                            img        : ''+ap.ap_8+'',
                            id         : 'aperitivo_8'
                        },
                        {
                            titulo     : 'Ensalada poke de atún y algas con aguacate',
                            descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus unde facere dolore sit blanditiis quia dignissimos officia sed dicta amet doloribus tempore reiciendis inventore quaerat odit, fugiat minus ipsa suscipit.',
                            precio     : 20000,
                            img        : ''+ap.ap_9+'',
                            id         : 'aperitivo_9'
                        },
                        {
                            titulo     : 'Ensalada poke de atún y algas con aguacate',
                            descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus unde facere dolore sit blanditiis quia dignissimos officia sed dicta amet doloribus tempore reiciendis inventore quaerat odit, fugiat minus ipsa suscipit.',
                            precio     : 20000,
                            img        : ''+ap.ap_10+'',
                            id         : 'aperitivo_10'
                        },
                        {
                            titulo     : 'Ensalada poke de atún y algas con aguacate',
                            descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus unde facere dolore sit blanditiis quia dignissimos officia sed dicta amet doloribus tempore reiciendis inventore quaerat odit, fugiat minus ipsa suscipit.',
                            precio     : 20000,
                            img        : ''+ap.ap_11+'',
                            id         : 'aperitivo_11'
                        },
                        {
                            titulo     : 'Ensalada poke de atún y algas con aguacate',
                            descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus unde facere dolore sit blanditiis quia dignissimos officia sed dicta amet doloribus tempore reiciendis inventore quaerat odit, fugiat minus ipsa suscipit.',
                            precio     : 20000,
                            img        : ''+ap.ap_12+'',
                            id         : 'aperitivo_12'
                        },
                    ];
                    const menu_aperitivos = (data) => {
                        for (let index = 0; index < data.length; index++) {
                            const item = data[index];
                            const cantidad_id = index +1;
                            list_aperitivos += 
                            `
                            <div class='col'>
                                <div class='card h-100 card-radius'>
                                    <img src=${item.img} alt='...' class='card-img-top card-imf-radius'>
                                        <div class='card-body'>
                                            <h5 class='card-title text-capitalize'>${item.titulo}</h5>
                                            <p class='card-text'>${item.descripcion}</p>
                                            <p class='card-text'>$ ${item.precio}</p>
                                            <button onclick="modal_data(${index},3,'${item.titulo}','${item.descripcion}','${item.img}','${item.precio}','aperitivos_'+${index+1})" class='btn-general' data-bs-toggle='modal' data-bs-target='#exampleModalProducto'>Mas informacion</button>
                                        </div>
                                    </img>
                                </div>
                            </div>
                            `;
                            insertar_base_de_datos("aperitivos",""+cantidad_id+"",""+item.titulo+"",""+item.descripcion+"",""+item.precio+"",""+item.img+"",cantidad_id);
                        }
                        aperitivos.innerHTML = list_aperitivos;
                    }
                    menu_aperitivos(data_aperitivos);
                }
            }
            }).catch((error) => {
            console.error(error);
            });
        }
    },[visible2])

    useEffect(()=>{
        var bebidas = document.getElementById("bebidas");
        //var cantidad = 0;
        if(visible3){
            var list_bebidas = '';
            const data_bebidas = [
                {
                    titulo     : 'Ensalada poke de atún y algas con aguacate',
                    descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus unde facere dolore sit blanditiis quia dignissimos officia sed dicta amet doloribus tempore reiciendis inventore quaerat odit, fugiat minus ipsa suscipit.',
                    precio     : 30000,
                    img        : ''+bed.bed_1+'',
                    id         : 'bebida_1'
                },
                {
                    titulo     : 'Ensalada poke de atún y algas con aguacate',
                    descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus unde facere dolore sit blanditiis quia dignissimos officia sed dicta amet doloribus tempore reiciendis inventore quaerat odit, fugiat minus ipsa suscipit.',
                    precio     : 30000,
                    img        : ''+bed.bed_2+'',
                    id         : 'bebida_2'
                },
                {
                    titulo     : 'Ensalada poke de atún y algas con aguacate',
                    descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus unde facere dolore sit blanditiis quia dignissimos officia sed dicta amet doloribus tempore reiciendis inventore quaerat odit, fugiat minus ipsa suscipit.',
                    precio     : 30000,
                    img        : ''+bed.bed_3+'',
                    id         : 'bebida_3'
                },
                {
                    titulo     : 'Ensalada poke de atún y algas con aguacate',
                    descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus unde facere dolore sit blanditiis quia dignissimos officia sed dicta amet doloribus tempore reiciendis inventore quaerat odit, fugiat minus ipsa suscipit.',
                    precio     : 30000,
                    img        : ''+bed.bed_4+'',
                    id         : 'bebida_4'
                },
                {
                    titulo     : 'Ensalada poke de atún y algas con aguacate',
                    descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus unde facere dolore sit blanditiis quia dignissimos officia sed dicta amet doloribus tempore reiciendis inventore quaerat odit, fugiat minus ipsa suscipit.',
                    precio     : 30000,
                    img        : ''+bed.bed_5+'',
                    id         : 'bebida_5'
                },
                {
                    titulo     : 'Ensalada poke de atún y algas con aguacate',
                    descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus unde facere dolore sit blanditiis quia dignissimos officia sed dicta amet doloribus tempore reiciendis inventore quaerat odit, fugiat minus ipsa suscipit.',
                    precio     : 30000,
                    img        : ''+bed.bed_6+'',
                    id         : 'bebida_6'
                },
                {
                    titulo     : 'Ensalada poke de atún y algas con aguacate',
                    descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus unde facere dolore sit blanditiis quia dignissimos officia sed dicta amet doloribus tempore reiciendis inventore quaerat odit, fugiat minus ipsa suscipit.',
                    precio     : 30000,
                    img        : ''+bed.bed_7+'',
                    id         : 'bebida_7'
                },
                {
                    titulo     : 'Ensalada poke de atún y algas con aguacate',
                    descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus unde facere dolore sit blanditiis quia dignissimos officia sed dicta amet doloribus tempore reiciendis inventore quaerat odit, fugiat minus ipsa suscipit.',
                    precio     : 30000,
                    img        : ''+bed.bed_8+'',
                    id         : 'bebida_8'
                },
                {
                    titulo     : 'Ensalada poke de atún y algas con aguacate',
                    descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus unde facere dolore sit blanditiis quia dignissimos officia sed dicta amet doloribus tempore reiciendis inventore quaerat odit, fugiat minus ipsa suscipit.',
                    precio     : 30000,
                    img        : ''+bed.bed_9+'',
                    id         : 'bebida_9'
                },
                {
                    titulo     : 'Ensalada poke de atún y algas con aguacate',
                    descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus unde facere dolore sit blanditiis quia dignissimos officia sed dicta amet doloribus tempore reiciendis inventore quaerat odit, fugiat minus ipsa suscipit.',
                    precio     : 30000,
                    img        : ''+bed.bed_10+'',
                    id         : 'bebida_10'
                },
                {
                    titulo     : 'Ensalada poke de atún y algas con aguacate',
                    descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus unde facere dolore sit blanditiis quia dignissimos officia sed dicta amet doloribus tempore reiciendis inventore quaerat odit, fugiat minus ipsa suscipit.',
                    precio     : 30000,
                    img        : ''+bed.bed_11+'',
                    id         : 'bebida_11'
                },
                {
                    titulo     : 'Ensalada poke de atún y algas con aguacate',
                    descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus unde facere dolore sit blanditiis quia dignissimos officia sed dicta amet doloribus tempore reiciendis inventore quaerat odit, fugiat minus ipsa suscipit.',
                    precio     : 30000,
                    img        : ''+bed.bed_12+'',
                    id         : 'bebida_12'
                }
                
            ];
            /* Bebidas */

            const menu_bebidas = (data) => {
                for (let index = 0; index < data.length; index++) {
                    const item = data[index];
                    list_bebidas += 
                    `
                    <div class='col'>
                        <div class='card h-100 card-radius'>
                            <img src=${item.img} alt='...' class='card-img-top card-imf-radius'>
                                <div class='card-body'>
                                    <h5 class='card-title text-capitalize'>${item.titulo}</h5>
                                    <p class='card-text'>${item.descripcion}</p>
                                    <p class='card-text'>$ ${item.precio}</p>
                                    <button onclick="modal_data(${index},4)" class='btn-general' data-bs-toggle='modal' data-bs-target='#exampleModalProducto'>Mas informacion</button>
                                </div>
                            </img>
                        </div>
                    </div>
                    `;
                }
                bebidas.innerHTML = list_bebidas;
            }
            menu_bebidas(data_bebidas);
        }
    },[visible3])
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
