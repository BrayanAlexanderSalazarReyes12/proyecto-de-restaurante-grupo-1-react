import React, {Component} from "react";
import axios from 'axios';
import { app } from './../../../data/bd';
import { updateImage, deleteImage } from './../../../helpers/FileUpload';
import { respAlerta } from '../../Ui/CardSwal';

export default class Postres extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            datos: [],
            nombre: '',
            img: '',
            tokenimg: '',
            descripcion: '',
            precio: ''
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        fetch("https://localhost:44380/api/postres")
          .then((response) => response.json())
          .then((data) => {
            this.setState({ datos: data });
        });
    }

    syncNombre(value,property){
        let state = {};
        state[property] = value;
        this.setState(state)
    }

    syncDescripcion(value,property){
        let state = {};
        state[property] = value;
        this.setState(state)
    }

    syncPrecio(value,property){
        let state = {};
        state[property] = value;
        this.setState(state)
    }

    render(){
        const carpeta = 'inicio/postres';
        return this.state.datos.map((data) => {
            const hanldeFileChange = (e) => {
                const file = e.target.files[0]
                console.log(file);
                //* ACTUALIZAR UN SLIDER EXISTENTE
                const newUrlImage = updateImage(data.img, file,'postres')
                        
                if(newUrlImage){
                    const docRef = app.database().ref(carpeta)
                    
                    const data2 = {
                        img: newUrlImage
                    }
                    
                    docRef.update(data2).then(() => {
                        data2.img.then((value)=>{
                            const data3 = value.split("?");
                            const token = data3[1];                   
                            const img = data3[0].split("%2F");
                            const nameImage = img[1];
                            console.log(nameImage);
                            console.log(token);

                            let state = {};
                            state["img"] = nameImage;
                            this.setState(state);
                            let state1 = {};
                            state1["tokenimg"] = token;
                            this.setState(state1);
                        })
                    })
                }
            }
            const Actualizarpostres=async(id,nombre,img,tokenimg,descrip,precio)=>{
                console.log(this.state);
                console.log(img);
                var nombreensal = "";
                var imgensal = "";
                var tokenimgsol = "";
                var descripensal = "";
                var precioensal = "";
                if(this.state.nombre==""){
                    nombreensal = nombre;
                }else{
                    nombreensal = this.state.nombre;
                }
                if(this.state.img == ""){
                    imgensal = img;
                }else{
                    imgensal = this.state.img;
                }
                if(this.state.tokenimg == ""){
                    tokenimgsol = tokenimg;
                }else{
                    tokenimgsol = this.state.tokenimg;
                }
                if(this.state.descripcion == ""){
                    descripensal = descrip;
                }else{
                    descripensal = this.state.descripcion;
                }
                if(this.state.precio == ""){
                    precioensal = precio;
                }else{
                    precioensal = this.state.precio;
                }
                console.log(imgensal);
                console.log(tokenimgsol);
                try {
                    const { data } = await axios.put(
                        'https://localhost:44380/api/postres',
                        {
                            id: id,
                            "nombre": nombreensal,
                            "url": imgensal,
                            "tokenimg":tokenimg,
                            "descripcion": descripensal,
                            "precio": precioensal
                        }
                    );
                    respAlerta('Correcto','Se Actualizo correctamente la informacion del plato');
                } catch (error) {
                    console.log(error);
                }
            }
            const Eliminarpostres=async(id,img)=>{
                deleteImage(img,'postres')
            
                const docRef = app.database().ref(carpeta).child(data.id)
                
                docRef.remove().then(() => {
                    fetch("https://localhost:44380/api/postres/" + id, {
                    method: "DELETE",
                    })
                    .then((response) => response.json())
                    .then((data) => {
                        respAlerta('Correcto','Se Elimino correctamente el plato selecionado');
                    });
                })
            }
            if(data.categoria == "postres"){
                return (
                    <>
                    <div class='col' key={data.id}>
                        <div class='card h-100 card-radius'>
                            <img src={data.img+"?"+data.tokenimg} alt='...' class='card-img-top card-imf-radius'/>
                            <div class='card-body'>
                                <h5 class='card-titulo text-capitalize'>{data.nombre}</h5>
                                <p class='card-texto'>{data.descrip}</p>
                                <p class='card-texto'>$ {data.precio}</p>
                                <div class="card-body">
                                    <button class='card-titulo btn-general' data-bs-toggle='modal' data-bs-target={data.actualizarinfo}>Editar</button>
                                    <button onClick={()=>Eliminarpostres(data.id,data.img)} class='card-titulo btn-general' data-bs-toggle='modal' data-bs-target='#exampleModalProducto'>Eliminar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='modal' id={data.nomsinespacio} tabIndex='-1' aria-labelledby='exampleModalLabel'
                        aria-hidden='true'>
                        <div className='modal-dialog'>
                            <div className='modal-content'>
                                <input id='id_prod' type="hidden" value=""/>
                                <div className='modal-body'>
                                    <img id="modal_img" src={data.img+"?"+data.tokenimg} alt='...' className='card-img-top '/>
                                </div>
                                <div className='modal-footer d-flex justify-content-between'>
                                <div class="custom-file">
                                <input  type="file" name="fileImg" onChange={hanldeFileChange}/>
                                <h1>Nombre del plato<input onChange={(ev)=>{this.syncNombre(ev.target.value,'nombre')}} placeholder={data.nombre} value={this.state.nombre} className="form-control mb-2" type="text" name='nombredelplato'/></h1>
                                <h1>Descripcion<input onChange={(ev)=>{this.syncDescripcion(ev.target.value,'descripcion')}} placeholder={data.descrip} value={this.state.descripcion} className="form-control mb-2" type="text" name='descripcion'/></h1>
                                <h1>Precio<input onChange={(ev)=>{this.syncPrecio(ev.target.value,'precio')}} placeholder={data.precio} value={this.state.precio} className="form-control mb-2" type="text" name='precio' /></h1>
                                </div>
                                    <button id="add_cart" type='file' className='btn-general' onClick={()=>Actualizarpostres(data.id,data.nombre,data.img,data.tokenimg,data.descrip,data.precio)}>Actualizar</button>
                                    <button id="add_cart" type='button' className='btn-general'>Cerrar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                  </>
                );
            }
        });
    }
}