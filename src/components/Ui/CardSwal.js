import React from 'react'
import swal from 'sweetalert'

export const Alerta = async() => {

    return await swal({
        title: 'Eliminar !!!',
        text: 'Deseas continuar con la eliminacion',
        icon: 'warning',
        buttons: ['No','Si']
    })
    
}


export const respAlerta = (titulo,texto) => {
    return swal(titulo, texto, "success");
}

