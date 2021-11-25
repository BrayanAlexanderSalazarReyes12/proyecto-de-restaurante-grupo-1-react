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
import Sopas from './Sopas';
import Aperitivos from './Aperitivos';
import Bebidas from './Bebidas';
import Postres from './Postres';
import { app } from './../../../data/bd';
import { saveImage } from './../../../helpers/FileUpload';
import { respAlerta } from '../../Ui/CardSwal';
import { async } from '@firebase/util';

export const AdminMenu = () => {
    var [visible,setvisible] = useState(false);
    var [visible1,setvisible1] = useState(false);
    var [visible2,setvisible2] = useState(false);
    var [visible3,setvisible3] = useState(false);
    var [visible4,setvisible4] = useState(false);
    var [visible5,setvisible5] = useState(false);
    var [cantpost,setcantpost] = useState(0);
    const firebase = useFirebaseApp();
    const [archivos,setarchivos] = useState(null);
    const [datos,setDatos] = useState({
        nombredelplato:'',
        descripcion:'',
        precio:''
    })
    const [img,setimg] = useState("");
    const [tokenimg,settokenimg] = useState("");
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
        setvisible(false);
        setvisible2(false);
        setvisible3(false);
        setvisible4(false);
    },[visible1])

    //aperitivos
    useEffect(()=>{
        setvisible5(true);
        setvisible(false);
        setvisible1(false);
        setvisible3(false);
        setvisible4(false);
    },[visible2])

    useEffect(()=>{
        setvisible5(true);
        setvisible2(false);
        setvisible1(false);
        setvisible(false);
        setvisible4(false);
    },[visible3])

    useEffect(()=>{
        setvisible5(true);
        setvisible3(false);
        setvisible2(false);
        setvisible1(false);
        setvisible(false);
    },[visible4])

    useEffect(()=>{
        if(visible5){
            setvisible5(false);
        }
    },[visible5])

    const handleInputChange = (event) =>{
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
        })
    }

    const hanldeFileChange = (e) => {
        const carpeta = 'inicio/ensaladas';
        //setarchivos(e);
        const file = e.target.files[0];
        //const imageUrl = URL.createObjectURL(file);
        
        const urlImage = saveImage(file,'ensaladas');

        if(urlImage){
            const docRef = app.database().ref(carpeta)
            const data = {
                img: urlImage
            }
            docRef.push(data).then(() =>{
                data.img.then((value)=>{
                    //console.log(value);
                    const data2 = value.split("?");
                    const token = data2[1];                   
                    const img = data2[0].split("%2F");
                    const nameImage = img[1];
                    console.log(nameImage);
                    console.log(token);
                    setimg(nameImage);
                    settokenimg(token);
                })
            })
        }
    }

    const hanldeFileChangesop = (e) => {
        const carpeta = 'inicio/sopas';
        //setarchivos(e);
        const file = e.target.files[0];
        //const imageUrl = URL.createObjectURL(file);
        
        const urlImage = saveImage(file,'sopas');

        if(urlImage){
            const docRef = app.database().ref(carpeta)
            const data = {
                img: urlImage
            }
            docRef.push(data).then(() =>{
                data.img.then((value)=>{
                    //console.log(value);
                    const data2 = value.split("?");
                    const token = data2[1];                   
                    const img = data2[0].split("%2F");
                    const nameImage = img[1];
                    console.log(nameImage);
                    console.log(token);
                    setimg(nameImage);
                    settokenimg(token);
                })
            })
        }
    }

    const hanldeFileChangeap = (e) =>{
        const carpeta = 'inicio/aperitivos';
        //setarchivos(e);
        const file = e.target.files[0];
        
        const urlImage = saveImage(file,'aperitivos');

        if(urlImage){
            const docRef = app.database().ref(carpeta)
            const data = {
                img: urlImage
            }
            docRef.push(data).then(() =>{
                data.img.then((value)=>{
                    //console.log(value);
                    const data2 = value.split("?");
                    const token = data2[1];                   
                    const img = data2[0].split("%2F");
                    const nameImage = img[1];
                    console.log(nameImage);
                    console.log(token);
                    setimg(nameImage);
                    settokenimg(token);
                })
            })
        }
    }

    const hanldeFileChangebeb = (e) =>{
        const carpeta = 'inicio/bebidas';
        const file = e.target.files[0];
        
        const urlImage = saveImage(file,'bebidas');

        if(urlImage){
            const docRef = app.database().ref(carpeta)
            const data = {
                img: urlImage
            }
            docRef.push(data).then(() =>{
                data.img.then((value)=>{
                    const data2 = value.split("?");
                    const token = data2[1];                   
                    const img = data2[0].split("%2F");
                    const nameImage = img[1];
                    console.log(nameImage);
                    console.log(token);
                    setimg(nameImage);
                    settokenimg(token);
                })
            })
        }
    }

    const hanldeFileChangepos = (e) =>{
        const carpeta = 'inicio/postres';
        const file = e.target.files[0];
        
        const urlImage = saveImage(file,'postres');

        if(urlImage){
            const docRef = app.database().ref(carpeta)
            const data = {
                img: urlImage
            }
            docRef.push(data).then(() =>{
                data.img.then((value)=>{
                    const data2 = value.split("?");
                    const token = data2[1];                   
                    const img = data2[0].split("%2F");
                    const nameImage = img[1];
                    console.log(nameImage);
                    console.log(token);
                    setimg(nameImage);
                    settokenimg(token);
                })
            })
        }
    }

    const insertararchivos=async()=>{
        const precio = datos.precio;
        fetch("https://localhost:44380/api/ensaladas/"+"ensaladas"+","+datos.nombredelplato+","+img+","+tokenimg+","+datos.descripcion+","+precio,{
            method:"POST",
        })
          .then((response) => response.json())
          .then((data) => {
            this.setState({ datos: data });
        });
        respAlerta('Correcto','Se Guardo correctamente el nuevo plato');
    }

    const insertararchivossopas=async()=>{
        const precio = datos.precio;
        fetch("https://localhost:44380/api/sopas/"+"sopas"+","+datos.nombredelplato+","+img+","+tokenimg+","+datos.descripcion+","+precio,{
            method:"POST",
        })
          .then((response) => response.json())
          .then((data) => {
            this.setState({ datos: data });
        });
        respAlerta('Correcto','Se Guardo correctamente el nuevo plato');
        //alert("Categoria: ensaladas"+" Nombre del plato: "+datos.nombredelplato+"img: /assets/ensaladas/"+archivos[0].name+" descrip: "+datos.descripcion+" precio:"+datos.precio);
        
    }

    const insertararchivosaperitivos=async()=>{
        const precio = datos.precio;
        fetch("https://localhost:44380/api/aperitivos/"+"aperitivos"+","+datos.nombredelplato+","+img+","+tokenimg+","+datos.descripcion+","+precio,{
            method:"POST",
        })
          .then((response) => response.json())
          .then((data) => {
            this.setState({ datos: data });
        });
        respAlerta('Correcto','Se Guardo correctamente el nuevo plato');
    }

    const insertararchivosbebidas=async()=>{
        const precio = datos.precio;
        fetch("https://localhost:44380/api/bebidas/"+"bebidas"+","+datos.nombredelplato+","+img+","+tokenimg+","+datos.descripcion+","+precio,{
            method:"POST",
        })
          .then((response) => response.json())
          .then((data) => {
            this.setState({ datos: data });
        });
        respAlerta('Correcto','Se Guardo correctamente el nuevo plato');
    }
    
    const insertararchivospostres=async()=>{
        const precio = datos.precio;
        fetch("https://localhost:44380/api/postres/"+"postres"+","+datos.nombredelplato+","+img+","+tokenimg+","+datos.descripcion+","+precio,{
            method:"POST",
        })
          .then((response) => response.json())
          .then((data) => {
            this.setState({ datos: data });
        });
        respAlerta('Correcto','Se Guardo correctamente el nuevo plato');
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
                                <div class='col'>
                                    <div class='card h-100 card-radius'>
                                        <img src='https://firebasestorage.googleapis.com/v0/b/restaurantetic21.appspot.com/o/carousel%2Fdefault-featured-image.jpg?alt=media&token=525b974e-724a-44c4-8821-c8fae2286fe3' alt='...' class='card-img-top card-imf-radius'/>
                                        <div class='card-body'>
                                            <h5 class='card-titulo text-capitalize'>titulo</h5>
                                            <p class='card-texto'> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum tenetur at in id itaque ullam dolorum excepturi laudantium voluptatem illo quibusdam asperiores, praesentium labore harum error numquam? Rerum, illo corrupti?</p>
                                            <p class='card-texto'>$ 9999999999999</p>
                                            <button class='card-titulo btn-general' data-bs-toggle='modal' data-bs-target='#exampleModalAñadirSopas'>Añadir producto</button>
                                        </div>
                                    </div>
                                </div>
                                <Sopas/>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                        <div className="menu_muestra_1" id="menu_muestra_1">
                            <div id="aperitivos" className='row row-cols-1 row-cols-md-3 g-4'>
                                <div class='col'>
                                    <div class='card h-100 card-radius'>
                                        <img src='https://firebasestorage.googleapis.com/v0/b/restaurantetic21.appspot.com/o/carousel%2Fdefault-featured-image.jpg?alt=media&token=525b974e-724a-44c4-8821-c8fae2286fe3' alt='...' class='card-img-top card-imf-radius'/>
                                        <div class='card-body'>
                                            <h5 class='card-titulo text-capitalize'>titulo</h5>
                                            <p class='card-texto'> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum tenetur at in id itaque ullam dolorum excepturi laudantium voluptatem illo quibusdam asperiores, praesentium labore harum error numquam? Rerum, illo corrupti?</p>
                                            <p class='card-texto'>$ 9999999999999</p>
                                            <button class='card-titulo btn-general' data-bs-toggle='modal' data-bs-target='#exampleModalAñadirAperitivos'>Añadir producto</button>
                                        </div>
                                    </div>
                                </div>
                                <Aperitivos/>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="nav-bebidas" role="tabpanel" aria-labelledby="nav-bebidas-tab">
                        <div className="menu_muestra_1" id="menu_muestra_1">
                            <div id="bebidas" className='row row-cols-1 row-cols-md-3 g-4'>
                                <div class='col'>
                                    <div class='card h-100 card-radius'>
                                        <img src='https://firebasestorage.googleapis.com/v0/b/restaurantetic21.appspot.com/o/carousel%2Fdefault-featured-image.jpg?alt=media&token=525b974e-724a-44c4-8821-c8fae2286fe3' alt='...' class='card-img-top card-imf-radius'/>
                                        <div class='card-body'>
                                            <h5 class='card-titulo text-capitalize'>titulo</h5>
                                            <p class='card-texto'> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum tenetur at in id itaque ullam dolorum excepturi laudantium voluptatem illo quibusdam asperiores, praesentium labore harum error numquam? Rerum, illo corrupti?</p>
                                            <p class='card-texto'>$ 9999999999999</p>
                                            <button class='card-titulo btn-general' data-bs-toggle='modal' data-bs-target='#exampleModalAñadirBebidas'>Añadir producto</button>
                                        </div>
                                    </div>
                                </div>
                                <Bebidas/>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="nav-postres" role="tabpanel" aria-labelledby="nav-postres-tab">
                        <div className="menu_muestra_1" id="menu_muestra_1">
                            <div id="postres" className='row row-cols-1 row-cols-md-3 g-4'>
                                <div class='col'>
                                    <div class='card h-100 card-radius'>
                                        <img src='https://firebasestorage.googleapis.com/v0/b/restaurantetic21.appspot.com/o/carousel%2Fdefault-featured-image.jpg?alt=media&token=525b974e-724a-44c4-8821-c8fae2286fe3' alt='...' class='card-img-top card-imf-radius'/>
                                        <div class='card-body'>
                                            <h5 class='card-titulo text-capitalize'>titulo</h5>
                                            <p class='card-texto'> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum tenetur at in id itaque ullam dolorum excepturi laudantium voluptatem illo quibusdam asperiores, praesentium labore harum error numquam? Rerum, illo corrupti?</p>
                                            <p class='card-texto'>$ 9999999999999</p>
                                            <button class='card-titulo btn-general' data-bs-toggle='modal' data-bs-target='#exampleModalAñadirPostres'>Añadir producto</button>
                                        </div>
                                    </div>
                                </div>
                                <Postres/>
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
                    <input  type="file" name="fileImg" onChange={hanldeFileChange}/>
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
        <div className='modal' id='exampleModalAñadirSopas' tabIndex='-1' aria-labelledby='exampleModalLabel'
            aria-hidden='true'>
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <input id='id_prod' type="hidden" value=""/>
                    <div className='modal-body'>
                        <img id="modal_img" src='https://firebasestorage.googleapis.com/v0/b/restaurantetic21.appspot.com/o/carousel%2Fdefault-featured-image.jpg?alt=media&token=525b974e-724a-44c4-8821-c8fae2286fe3' alt='...' className='card-img-top '/>
                    </div>
                    <div className='modal-footer d-flex justify-content-between'>
                    <div class="custom-file">
                    <input  type="file" name="fileImg" onChange={hanldeFileChangesop}/>
                    <h1>Nombre del plato<input placeholder="Ingrese El Nombre Del Plato" className="form-control mb-2" type="text" name='nombredelplato' onChange={handleInputChange}/></h1>
                    <h1>Descripcion<input placeholder="Ingrese La Descripcion Del Plato" className="form-control mb-2" type="text" name='descripcion' onChange={handleInputChange}/></h1>
                    <h1>Precio<input placeholder="Ingrese El Precio Del Plato" className="form-control mb-2" type="text" name='precio' onChange={handleInputChange}/></h1>
                    </div>
                        <button id="add_cart" type='file' className='btn-general' onClick={()=>insertararchivossopas()}>Agregar producto</button>
                        <button id="add_cart" type='button' className='btn-general'>Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
        <div className='modal' id='exampleModalAñadirAperitivos' tabIndex='-1' aria-labelledby='exampleModalLabel'
            aria-hidden='true'>
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <input id='id_prod' type="hidden" value=""/>
                    <div className='modal-body'>
                        <img id="modal_img" src='https://firebasestorage.googleapis.com/v0/b/restaurantetic21.appspot.com/o/carousel%2Fdefault-featured-image.jpg?alt=media&token=525b974e-724a-44c4-8821-c8fae2286fe3' alt='...' className='card-img-top '/>
                    </div>
                    <div className='modal-footer d-flex justify-content-between'>
                    <div class="custom-file">
                    <input  type="file" name="fileImg" onChange={hanldeFileChangeap}/>
                    <h1>Nombre del plato<input placeholder="Ingrese El Nombre Del Plato" className="form-control mb-2" type="text" name='nombredelplato' onChange={handleInputChange}/></h1>
                    <h1>Descripcion<input placeholder="Ingrese La Descripcion Del Plato" className="form-control mb-2" type="text" name='descripcion' onChange={handleInputChange}/></h1>
                    <h1>Precio<input placeholder="Ingrese El Precio Del Plato" className="form-control mb-2" type="text" name='precio' onChange={handleInputChange}/></h1>
                    </div>
                        <button id="add_cart" type='file' className='btn-general' onClick={()=>insertararchivosaperitivos()}>Agregar producto</button>
                        <button id="add_cart" type='button' className='btn-general'>Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
        <div className='modal' id='exampleModalAñadirBebidas' tabIndex='-1' aria-labelledby='exampleModalLabel'
            aria-hidden='true'>
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <input id='id_prod' type="hidden" value=""/>
                    <div className='modal-body'>
                        <img id="modal_img" src='https://firebasestorage.googleapis.com/v0/b/restaurantetic21.appspot.com/o/carousel%2Fdefault-featured-image.jpg?alt=media&token=525b974e-724a-44c4-8821-c8fae2286fe3' alt='...' className='card-img-top '/>
                    </div>
                    <div className='modal-footer d-flex justify-content-between'>
                    <div class="custom-file">
                    <input  type="file" name="fileImg" onChange={hanldeFileChangebeb}/>
                    <h1>Nombre del plato<input placeholder="Ingrese El Nombre Del Plato" className="form-control mb-2" type="text" name='nombredelplato' onChange={handleInputChange}/></h1>
                    <h1>Descripcion<input placeholder="Ingrese La Descripcion Del Plato" className="form-control mb-2" type="text" name='descripcion' onChange={handleInputChange}/></h1>
                    <h1>Precio<input placeholder="Ingrese El Precio Del Plato" className="form-control mb-2" type="text" name='precio' onChange={handleInputChange}/></h1>
                    </div>
                        <button id="add_cart" type='file' className='btn-general' onClick={()=>insertararchivosbebidas()}>Agregar producto</button>
                        <button id="add_cart" type='button' className='btn-general'>Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
        <div className='modal' id='exampleModalAñadirPostres' tabIndex='-1' aria-labelledby='exampleModalLabel'
            aria-hidden='true'>
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <input id='id_prod' type="hidden" value=""/>
                    <div className='modal-body'>
                        <img id="modal_img" src='https://firebasestorage.googleapis.com/v0/b/restaurantetic21.appspot.com/o/carousel%2Fdefault-featured-image.jpg?alt=media&token=525b974e-724a-44c4-8821-c8fae2286fe3' alt='...' className='card-img-top '/>
                    </div>
                    <div className='modal-footer d-flex justify-content-between'>
                    <div class="custom-file">
                    <input  type="file" name="fileImg" onChange={hanldeFileChangepos}/>
                    <h1>Nombre del plato<input placeholder="Ingrese El Nombre Del Plato" className="form-control mb-2" type="text" name='nombredelplato' onChange={handleInputChange}/></h1>
                    <h1>Descripcion<input placeholder="Ingrese La Descripcion Del Plato" className="form-control mb-2" type="text" name='descripcion' onChange={handleInputChange}/></h1>
                    <h1>Precio<input placeholder="Ingrese El Precio Del Plato" className="form-control mb-2" type="text" name='precio' onChange={handleInputChange}/></h1>
                    </div>
                        <button id="add_cart" type='file' className='btn-general' onClick={()=>insertararchivospostres()}>Agregar producto</button>
                        <button id="add_cart" type='button' className='btn-general'>Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
