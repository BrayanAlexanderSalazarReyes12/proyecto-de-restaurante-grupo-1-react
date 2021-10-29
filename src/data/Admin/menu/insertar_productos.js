import { initializeApp } from '@firebase/app'
import {getDatabase, ref, set} from 'firebase/database/'
import { config } from '../../configData';

const app = initializeApp(config);
const database = getDatabase(app);

export function insertar_base_de_datos(nombre_categoria, idproducto, nombre, descripcion, precio, imagen, cantidad) {
    set(ref(database, 'productos/' + nombre_categoria + '/' + idproducto + '/'), {
      id: idproducto,
      nombre: nombre,
      descripcion: descripcion,
      precio: precio,
      imagen: imagen
    });
    set(ref(database, 'productos/'+nombre_categoria+'_cantidad/'), {
        cantidad : cantidad
    });
}