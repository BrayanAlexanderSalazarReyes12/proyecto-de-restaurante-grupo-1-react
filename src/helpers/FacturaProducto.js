

export const FacturaProducto = () => {
    let lista_prod = '';
    let suma_total = 0;
    const facturaP = JSON.parse(localStorage.getItem('productos')) || []
    
    for(let i = 0; i < facturaP.length; i++) {
        const producto = facturaP[i];
        let total = Number(producto.cantidad * producto.precio) 
        suma_total += total;
        lista_prod += `
            <tr style='border: 3px solid #d95204'>
                <th style='text-align:center;border: 3px solid #d95204'>${i}</th>
                <td style='text-align:center;border: 3px solid #d95204'>${producto.titulo}</td>
                <td style='text-align:center;border: 3px solid #d95204'>${producto.cantidad}</td>
                <td style='text-align:center;border: 3px solid #d95204'>${producto.precio}</td>
                <td style='text-align:center;border: 3px solid #d95204'>${total}</td>
            </tr>
        `
    }

    let factura = `
    <h2 style='width: 100%; border: 2px solid #d95204; text-align: center;'>Restaurante online</h2><br>
    <table style='width:100%; border: 2px solid #d95204;'>
        <thead>
            <tr style='border: 2px solid #d95204'>
                <th style='border: 3px solid #d95204'>Id</th>
                <th style='border: 3px solid #d95204'>Nombre</th>
                <th style='border: 3px solid #d95204'>Cantidad</th>
                <th style='border: 3px solid #d95204'>Precio</th>
                <th style='border: 3px solid #d95204'>Total</th>
            </tr>
        </thead>
        <tbody>
            ${lista_prod}
            <tr  style='border: 2px solid #d95204'>
            	<th colspan="4" style='text-align:center;border: 3px solid #d95204'>Suma Total</th>
                <th  style='text-align:center;border: 3px solid #d95204'>${suma_total}</th>
            </tr>
        </tbody>
    </table>
    `;

    return factura
}
