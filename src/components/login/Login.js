import React, { useContext } from 'react'
import { AuthContext } from '../../auth/AuthContext'
import { useForm } from '../../hooks/UseForm'
import { types } from '../../types/types'
import { getAuth,signInWithEmailAndPassword } from 'firebase/auth'



import './css/login.css'
import { ToastMess } from '../Ui/ToastMess'
import { UseOpen } from '../../hooks/UseOpen'


export const Login = ({history}) => {

    const { dispatch } = useContext(AuthContext)

    let error = false;

    const {data,
        toast,
        handleData,
        setToast} = UseOpen()

    const [ value, 
            handleInputChange,
            setValue] = useForm({
                email   : 'restauranttic2021@gmail.com',
                password: 'Restaurantetic21@'
            })

            const { email, password } = value;

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
            dispatch({
                types: types.login,
                payload: {
                    uid: user.uid
                }
    
            })
            console.log(user)
            history.replace("/admin/inicio")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode)
            console.log(errorMessage)
            setToast(true)
            handleData({
                titulo: "Error",mensaje: "Email - Password incorrecto"})
            setTimeout(() => {
                setToast(false)
            }, 3000);
        });
        
    }


    return (
        <div class="contenedor">
            <div class="formularios">

                <form class="form__login" onSubmit={handleSubmit}>
                    <h1 class="t_l">Login</h1>
                    <hr class="text-white" />

                    <input  class="inp_l" 
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleInputChange}
                            placeholder="Correo" required />
                    
                    <input  class="inp_l" 
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleInputChange} 
                            placeholder="Passsword" required />

                    <div class="text-center">
                        <button id="btn" type="submit">Acceder</button>
                    </div>
                    

                </form>

            </div>

            { toast && (
                        <ToastMess titulo={data.titulo} mensaje={data.mensaje}/>
                    )}
        </div>
    )
}
