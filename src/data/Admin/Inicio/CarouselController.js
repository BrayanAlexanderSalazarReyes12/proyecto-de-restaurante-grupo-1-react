import { uuid } from 'uuidv4';

import { app } from './../../bd';

//* OBTENER TODAS LAS IMAGENES DEL CAROUSEL
export const getCarruselImg = async() => {
    
    /* const array = []
    const query = await getDocs(collection(db, "inicio"));
    
    query.forEach((doc) => {
        if(doc.exists()){
            if(Object.keys(doc.data()).length !== 0){
                
                array.push({
                    img: doc.data().img,
                    id: doc.id
                });
                
            }else{
                console.log("Vacio")
            }
        }else{
            console.log("El documento no existe")
        }
    });
    

    return array; */
}


//* GUARDAR IMAGEN DEL CAROUSEL
export const postImgCarrusel = async(file,carpeta) => {
   /*  try {

        const urlImage = await saveImage(file,carpeta);

        const idRef = await addDoc(collection(db, "inicio"), {
            img: urlImage
        });

        return {
            img: urlImage,
            id: idRef
        }

    } catch (e) {
        console.error("Error adding document: ", e);
        return false;
    } */
}



//* ACTUALIZAR UNA IMAGEN EXISTENTE
export const updateSlide = async(documento,urlImage,file,carpeta) => {

    //* ACTUALIZAR IMAGEN EN CLOUDINARY
    /* try {

        const image = await updateImage(urlImage,file,carpeta);
        
        if(image){

            const washingtonRef = doc(db, "inicio", documento);

            await updateDoc(washingtonRef, {
                img: image
            });
        
            return {
                id: documento,
                image
            }
        }

    } catch (error) {
        throw new Error("Error al actualizar imagen")
    } */
    

    //* GURDAR URL DE CLOUDINARY EN FIREBASE
    
}


//* OBTENER TODAS LAS IMAGENES DE LA BASE DE DATOS
export const allImg = async(path) => {
    const docRef = app.database().ref('inicio/carousel')

    docRef.once('value', (img) => {
        const all = img.val();
        const arrImg = [];
        for(let img of all) {
            arrImg.push(img)
        }
        
        return arrImg; 
    })
}
