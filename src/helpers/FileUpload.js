import { storage } from './../data/bd';
import { uuid } from 'uuidv4';

export const saveImage = async(file,carpeta) => {
    const ref = storage.ref()
    const path = ref.child(`${carpeta}/image-${uuid()}.jpg`) 
    await path.put(file)

    const url = await path.getDownloadURL()

    return url;
}

export const updateImage = async(urlImage, file, carpeta) => {
    
    await deleteImage(urlImage,carpeta)
    
    const url = await saveImage(file, carpeta)

    if(url){
        return url;
    }
    
}

export const deleteImage = async(urlImage,carpeta) => {
    const data = urlImage.split("?");
    const img = data[0].split("%2F");
    const nameImage = img[1];

    const ref = storage.ref()
    const path = ref.child(`${carpeta}/${nameImage}`) 
    // Delete the file
    path.delete()
}


