import { Alert, Container, Table } from "@mui/material";
import React, {useEffect, useState,useRef} from "react";
import './AdminReserva.css'
import emailjs from 'emailjs-com';



export const Adminreservas = () => {
    const form = useRef();

    /*GET*/
    const url='https://localhost:44380/api/reservas'
    const [todos,setTodos]= useState()
    const fecthApi = async () =>{
        const response = await fetch(url)
        const responseJSON=await response.json()
        setTodos(responseJSON)
    }

useEffect(()=>{
    fecthApi();
},[])

function eliminarReserva(email) {
    fetch("https://localhost:44380/api/reservas/" + email, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Reserva Rechazada con Exito!!!!");
      });
  }

function rechazarReserva(servicios,nombre,fecha,hora,email){
    const respuesta="Reserva Rechazada";
    enviarEmail(servicios,respuesta,nombre,fecha,hora,email);
    eliminarReserva(email);
    
}

function aceptarReserva(servicios,nombre,fecha,hora,email){
    const respuesta="Reserva Aceptada";
    enviarEmail(servicios,respuesta,nombre,fecha,hora,email);
    alert("Reserva Aceptada Con Exito!!");
}



function enviarEmail(servicios,respuesta,nombre,fecha,hora,email){
    
    fetch("https://formsubmit.co/ajax/"+email, {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            Servicio: servicios,
            Respuesta: respuesta,
            Nombre: nombre,
            Fecha:fecha,
            Hora:hora,
            Email:email
        })
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
}



    return(
        <>
        <div className="AdminReserv">
        <Container>
            <h1>Administrar Reservas</h1>
            
            
            <table className="table">
                <thead>
                    <tr>
                        <th>Servicio</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Telefono</th>
                        <th>Respuesta</th>
                    </tr>
                </thead>
                <tbody>
                    
                    
                    
                    
                    {!todos ? 'Cargando...':todos.map((todos,index)=>{
                        return <tr>
                            <td>{todos.servicios}</td>
                            <td>{todos.fecha}</td>
                            <td>{todos.hora}</td>
                            <td>{todos.nombre}</td>
                            <td>{todos.email}</td>
                            <td>{todos.telefono}</td>
                            <td><button className="btn btn-primary" onClick={()=>aceptarReserva(todos.servicios,todos.nombre,todos.fecha,todos.hora,todos.email)}>Aceptar</button>
                                    <button className="btn btn-danger" onClick={() => rechazarReserva(todos.servicios,todos.nombre,todos.fecha,todos.hora,todos.email)}>Rechazar</button>
                            </td>
                        </tr>
                    })}
                    

                    
                </tbody>
            </table>

        </Container>
        </div>
        </>

    )









    
}

