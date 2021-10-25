
import { helpHttp } from './HelpHttp';


export const EnviarEmail = async(datos) => {
    let respuesta = false;
    await helpHttp()
        .post("https://formsubmit.co/ajax/restaurantetict@gmail.com",{
            body: datos,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        }).then(r => respuesta = true).catch(e => respuesta = false )
    
    return respuesta
}
