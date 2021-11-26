import React,{Component} from "react";

export default class Aperitivosmenu extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            datos: [],
            numero: 1
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        fetch("https://restaurante2021.herokuapp.com/api/aperitivos")
          .then((response) => response.json())
          .then((data) => {
            this.setState({ datos: data });
        });
    }

    render(){
        return this.state.datos.map((data) => {
            if(data.categoria == "aperitivos"){
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
                                    <button class='card-titulo btn-general' data-bs-toggle='modal' data-bs-target={data.actualizarinfo}>Informacion</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='modal' id={data.nomsinespacio} tabIndex='-1' aria-labelledby='exampleModalLabel'
                        aria-hidden='true'>
                        <div className='modal-dialog'>
                            <div className='modal-content'>
                                <input id='id_prod' type="hidden" value=""/>
                                <div className='modal-header'>
                                    <h5 id="modal_titulo" className='modal-title'>{data.nombre}</h5>
                                    <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                                </div>
                                <div className='modal-body'>
                                    <img id="modal_img" src={data.img+"?"+data.tokenimg} alt='...' className='card-img-top '/>
                                    <p id="modal_descripcion">{data.descrip}</p>
                                </div>
                                <div className='modal-footer d-flex justify-content-between'>
                                    <p id='modal_precio'></p>
                                    <div className='cantidad_producto d-flex justify-content-between'>
                                        <i id="mas" className="fas fa-plus" onClick={()=>{
                                            if(this.state.numero > 0){     
                                                this.setState({
                                                    numero:this.state.numero + 1
                                                });
                                            }else if(this.state.numero == 0){
                                                this.setState({
                                                    numero:1
                                                });
                                            }
                                        }}></i>
                                        <small id="count_prod">{this.state.numero}</small>
                                        <i id="menos" className="fas fa-minus" onClick={()=>{
                                            if(this.state.numero > 0 && this.state.numero < 99 && this.state.numero != 1){  
                                                this.setState({
                                                    numero:this.state.numero - 1
                                                });
                                            }else if(this.state.numero == 0){
                                                this.setState({
                                                    numero:1
                                                });
                                            }
                                        }}></i>
                                    </div>
                                    <button id="add_cart" type='button' className='btn-general' onClick={()=>{
                                        
                                        let productos = []
                                        let producto = {
                                            titulo     : data.nombre,
                                            descripcion: data.descrip,
                                            img        : data.img+"?"+data.tokenimg,
                                            precio     : parseInt(data.precio),
                                            count      : this.state.numero,
                                            id         : data.id
                                        }
                                        let localS = localStorage.getItem("productos")
                                        if(localS === null){
                                            productos.push(producto)
                                            localStorage.setItem("productos",JSON.stringify(productos))
                                            this.setState({
                                                numero:1
                                            });
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
                                                this.setState({
                                                    numero:1
                                                });
                                            }else{
                                                // Si no encuentra ningun producto duplicado Lo agrego al arreglo y actualizo el storage
                                                productos.push(...cart_localstorage)
                                                productos.push(producto)
                                                localStorage.setItem("productos",JSON.stringify(productos))
                                                this.setState({
                                                    numero:1
                                                });
                                            }
                                            
                                            let cart = JSON.parse(localStorage.getItem("productos"))
                                            //aumentar_icon_carrito(cart)
                                        }
                                    }}>Add Cart</button>
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