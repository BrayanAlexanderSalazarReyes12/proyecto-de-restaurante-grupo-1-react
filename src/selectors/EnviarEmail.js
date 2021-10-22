

export const EnviarEmail = ( email, nombre, body) => {

    //smtp.gmail.com
    //smtp-mail.outlook.com
    window.Email.send({
        Host    : "smtp.gmail.com",
        Username: "restaurantetict@gmail.com",
        Password: "restauranteTic2021",
        From    : "restaurantetict@gmail.com",
        To      : email,
        Subject : nombre,
        Body    : body,
    }).then(function (message) {
        console.log("Respuesta: " + message);
        //swal("Compra Finalizada!", "Revisar bandeja de entrada, papelera o spam", "success");
        //loading.classList.toggle('d-none');
    })

    //return result;
}


/* .then(function (message) {
    console.log(message);
    //swal("Compra Finalizada!", "Revisar bandeja de entrada, papelera o spam", "success");
    loading.classList.toggle('d-none');}) */
