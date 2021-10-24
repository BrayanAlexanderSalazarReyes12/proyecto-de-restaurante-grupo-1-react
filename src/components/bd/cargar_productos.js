import { getDatabase, ref, child, get } from "firebase/database";
const dbRef = ref(getDatabase());

get(child(dbRef, `productos/ensaladas/1`)).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val().nombre);
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});