import { collection, getDocs } from "firebase/firestore";
import { db } from './../../bd';


export const getCarruselImg = async() => {
    
    const data = async () => {
        const querySnapshot = await getDocs(collection(db, "inicio"));
        querySnapshot.forEach((doc) => {
        console.log(doc.data());
        });
    }
    data()
}
