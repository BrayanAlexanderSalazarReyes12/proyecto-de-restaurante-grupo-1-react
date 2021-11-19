import React, {Component} from 'react';
import axios from 'axios';

export default class Ensaladas extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            datos: [],
            nombre: '',
            img: '',
            descripcion: '',
            precio: ''
        };
        
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        fetch("https://localhost:44380/api/ensaladas")
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
        return this.state.datos.map((data) => {
            const Actualizarensaladas=async(id,nombre,img,descrip,precio)=>{
                console.log(this.state);
                var nombreensal = "";
                var imgensal = "";
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
                    imgensal = "";
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
                try {
                    const { data } = await axios.put(
                        'https://localhost:44380/api/ensaladas',
                        {
                            id: id,
                            "nombre": nombreensal,
                            "url": imgensal,
                            "descrip": descripensal,
                            "precio": precioensal
                        }
                    );
                    console.log(data);
                } catch (error) {
                    console.log(error);
                }
            }
            const Eliminarensaladas=async(id,img)=>{
                const authHeader = img;
                const split = authHeader.split('/');
                const token = split[3];
                fetch("https://localhost:44380/api/ensaladas/" + id+","+token, {
                    method: "DELETE",
                })
                .then((response) => response.json())
                .then((data) => {
                    alert("dato eliminado");
                });
            }
            if(data.categoria == "ensaladas"){
                return (
                    <>
                    <div class='col' key={data.id}>
                        <div class='card h-100 card-radius'>
                            <img src={process.env.PUBLIC_URL + '' +data.img+ ''} alt='...' class='card-img-top card-imf-radius'/>
                            <div class='card-body'>
                                <h5 class='card-titulo text-capitalize'>{data.nombre}</h5>
                                <p class='card-texto'>{data.descrip}</p>
                                <p class='card-texto'>$ {data.precio}</p>
                                <div class="card-body">
                                    <button class='card-titulo btn-general' data-bs-toggle='modal' data-bs-target={data.actualizarinfo}>Editar</button>
                                    <button onClick={()=>Eliminarensaladas(data.id,data.img)} class='card-titulo btn-general' data-bs-toggle='modal' data-bs-target='#exampleModalProducto'>Eliminar</button>
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
                                    <img id="modal_img" src={process.env.PUBLIC_URL + '' +data.img+ ''} alt='...' className='card-img-top '/>
                                </div>
                                <div className='modal-footer d-flex justify-content-between'>
                                <div class="custom-file">
                                <input  type="file" name="fileImg"/>
                                <h1>Nombre del plato<input onChange={(ev)=>{this.syncNombre(ev.target.value,'nombre')}} placeholder={data.nombre} value={this.state.nombre} className="form-control mb-2" type="text" name='nombredelplato'/></h1>
                                <h1>Descripcion<input onChange={(ev)=>{this.syncDescripcion(ev.target.value,'descripcion')}} placeholder={data.descrip} value={this.state.descripcion} className="form-control mb-2" type="text" name='descripcion'/></h1>
                                <h1>Precio<input onChange={(ev)=>{this.syncPrecio(ev.target.value,'precio')}} placeholder={data.precio} value={this.state.precio} className="form-control mb-2" type="text" name='precio' /></h1>
                                </div>
                                    <button id="add_cart" type='file' className='btn-general' onClick={()=>Actualizarensaladas(data.id,data.nombre,data.img,data.descrip,data.precio)}>Actualizar</button>
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