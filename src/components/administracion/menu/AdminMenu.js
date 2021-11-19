import React, {useState,useEffect} from 'react';
import '../../menu/css/menu.css';
//base de datos
import {
    useFirebaseApp
} from 'reactfire'

//cargar informacion de la base de datos
import { getDatabase, ref, child, get } from "firebase/database";
const dbRef = ref(getDatabase());
/* eslint-disable import/first */
import Ensaladas from './Ensaladas';
import axios from 'axios';

export const AdminMenu = () => {
    var [visible,setvisible] = useState(false);
    var [visible1,setvisible1] = useState(false);
    var [visible2,setvisible2] = useState(false);
    var [visible3,setvisible3] = useState(false);
    var [visible4,setvisible4] = useState(false);
    var [visible5,setvisible5] = useState(false);
    var [cantensopas,setcantsopas] = useState(0);
    var [cantenaper,setcantaper] = useState(0);
    var [cantbebi,setcantbebi] = useState(0);
    var [cantpost,setcantpost] = useState(0);
    const firebase = useFirebaseApp();
    const [archivos,setarchivos] = useState(null);
    const [datos,setDatos] = useState({
        nombredelplato:'',
        descripcion:'',
        precio:''
    })
    console.log(firebase);

    //ensaladas
    useEffect(()=>{
       
       setvisible5(true);
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
        var bebidas = document.getElementById("bebidas");
        var postres = document.getElementById("postres");
        if(visible5){
            
            if(cantensopas == 1){
                var sopas = document.getElementById("sopas");
                var cantidad = 0;
                if(visible1){
                    get(child(dbRef, `productos/sopas_cantidad/`)).then((snapshot) => {
                        if (snapshot.exists()) {
                            cantidad = snapshot.val().cantidad;
                            console.log(cantidad);
                            if(sopas){
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
                            if(aperitivos){
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
                            if(bebidas){
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
                            if(postres){
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

    
    const subirarchivo=e =>{
        setarchivos(e);
    }

    const handleInputChange = (event) =>{
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
        })
    }

    const insertararchivos=async()=>{
        const f = new FormData();
        f.append("image",archivos[0]);
        
        await axios.post("http://localhost:17093/api/archivos",f)
        .then(response=>{
            console.log("bien");
            console.log(response.data);
        }).catch(error=>{
            console.log(error);
        })

        const precio = datos.precio;
        fetch("https://localhost:44380/api/ensaladas/"+"ensaladas"+","+datos.nombredelplato+","+archivos[0].name+","+datos.descripcion+","+precio,{
            method:"POST",
        })
          .then((response) => response.json())
          .then((data) => {
            this.setState({ datos: data });
        });
        alert("Categoria: ensaladas"+" Nombre del plato: "+datos.nombredelplato+"img: /assets/ensaladas/"+archivos[0].name+" descrip: "+datos.descripcion+" precio:"+datos.precio);
        
    }

    return (
        <>
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
                                <div class='col'>
                                    <div class='card h-100 card-radius'>
                                        <img src='https://firebasestorage.googleapis.com/v0/b/restaurantetic21.appspot.com/o/carousel%2Fdefault-featured-image.jpg?alt=media&token=525b974e-724a-44c4-8821-c8fae2286fe3' alt='...' class='card-img-top card-imf-radius'/>
                                        <div class='card-body'>
                                            <h5 class='card-titulo text-capitalize'>titulo</h5>
                                            <p class='card-texto'> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum tenetur at in id itaque ullam dolorum excepturi laudantium voluptatem illo quibusdam asperiores, praesentium labore harum error numquam? Rerum, illo corrupti?</p>
                                            <p class='card-texto'>$ 9999999999999</p>
                                            <button class='card-titulo btn-general' data-bs-toggle='modal' data-bs-target='#exampleModalAñadir'>Añadir producto</button>
                                        </div>
                                    </div>
                                </div>
                                <Ensaladas/>
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
        </div>
        <div className='modal' id='exampleModalAñadir' tabIndex='-1' aria-labelledby='exampleModalLabel'
            aria-hidden='true'>
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <input id='id_prod' type="hidden" value=""/>
                    <div className='modal-body'>
                        <img id="modal_img" src='https://firebasestorage.googleapis.com/v0/b/restaurantetic21.appspot.com/o/carousel%2Fdefault-featured-image.jpg?alt=media&token=525b974e-724a-44c4-8821-c8fae2286fe3' alt='...' className='card-img-top '/>
                    </div>
                    <div className='modal-footer d-flex justify-content-between'>
                    <div class="custom-file">
                    <input  type="file" name="fileImg" onChange={(e)=>subirarchivo(e.target.files)}/>
                    <h1>Nombre del plato<input placeholder="Ingrese El Nombre Del Plato" className="form-control mb-2" type="text" name='nombredelplato' onChange={handleInputChange}/></h1>
                    <h1>Descripcion<input placeholder="Ingrese La Descripcion Del Plato" className="form-control mb-2" type="text" name='descripcion' onChange={handleInputChange}/></h1>
                    <h1>Precio<input placeholder="Ingrese El Precio Del Plato" className="form-control mb-2" type="text" name='precio' onChange={handleInputChange}/></h1>
                    </div>
                        <button id="add_cart" type='file' className='btn-general' onClick={()=>insertararchivos()}>Agregar producto</button>
                        <button id="add_cart" type='button' className='btn-general'>Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
        
        </>
    )
}
