import { getFirestore } from "firebase/firestore";
import 'firebase/compat/storage'
import firebase from 'firebase/compat/app';
import 'firebase/compat/database'
import { config } from "./configData";


export const app = firebase.initializeApp(config);
export const storage = firebase.storage() 
export const db = getFirestore();