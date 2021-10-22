//CARGAR INFORMACION DE LAS ENSALADAS INICIO

import modal from './modal';

export function cargar_info_ensal(validar,en_1,en_2,en_3,en_4,en_5,en_6,en_7,en_8,en_9,en_10,en_11,en_12){
    if(validar){
        
    
        
        /* ABRIR MODAL A PRODUCTO ESPECIFICO */
        var modal_titulo      = document.querySelector("#modal_titulo");
        var modal_descripcion = document.querySelector("#modal_descripcion");
        var modal_precio      = document.querySelector("#modal_precio");
        var modal_img         = document.querySelector("#modal_img");
        var id_prod           = document.querySelector("#id_prod")

        function modal_data(indice,lista,validar1){
            if(validar1)
            {
                let data = {
                    titulo     : '',
                    descripcion: '',
                    img        : '',
                    precio     : 0,
                    id         : ''
                };
                switch (lista) {
                    case 1: // Categoria ensaladas
                        data = data_ensaladas[indice]
                        break;
                
                    default:
                        break;
                }

                modal_titulo.innerHTML      = data.titulo
                modal_descripcion.innerHTML = data.descripcion
                modal_img.src               = data.img
                modal_precio.innerHTML      = data.precio
                //count_prod.innerHTML        = 1
                id_prod.value               = data.id
                console.log(id_prod.value)
            }
        }
    }
} 
//CARGAR INFORMACION ENSALADAS FINAL