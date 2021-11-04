

export const FacturaProducto = () => {
    let lista_prod = {};
    let suma_total = 0;
    const facturaP = JSON.parse(localStorage.getItem('productos')) || []
    
    for(let i = 0; i < facturaP.length; i++) {
        const producto = facturaP[i];
        let total = Number(producto.count * producto.precio) 
        suma_total += total;
        lista_prod[producto.titulo] = `Cantidad: ${producto.count} | Precio: ${producto.precio} |  Total: ${total}`
    }

    lista_prod["total_factura"] = suma_total

    return lista_prod
}
