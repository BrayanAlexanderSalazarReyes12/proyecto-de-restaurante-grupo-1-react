import React, { useEffect } from 'react'
/* import { collection, getDocs } from "firebase/firestore";
import { db } from '../../bd/config' */
/* import { useFirebaseApp } from 'reactfire' */


export const AdminInicio = () => {
    /* const firebase = useFirebaseApp() */

    
    useEffect(() => {
        /* const data = async () => {
            const querySnapshot = await getDocs(collection(db, "inicio"));
            querySnapshot.forEach((doc) => {
            console.log(doc.data());
            });
        }
        data() */
        
    })

    return (
        <div>
            <h1 className="text-center">Administrar Inicio</h1>
        </div>
    )
}
