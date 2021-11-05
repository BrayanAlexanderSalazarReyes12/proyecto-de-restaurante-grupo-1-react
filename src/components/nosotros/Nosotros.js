import React from 'react'
import './css/nosotros.css'
import { DiscussionEmbed } from 'disqus-react';
export const Nosotros = () => {
    return (
        <>
            <section id="Nosotros">

                <div class="container">
                    <div class="row">
                        <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 p-5" >
                            <img src={process.env.PUBLIC_URL + '/assets/restaurante.jpg'} class="img-thumbnail" alt="ft del restaurante" width="400px" height="300px" />
                        </div>
                        <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 p-5">
                            <h1>Historia</h1>
                            <br/>
                            <p >Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa a dolorem suscipit animi provident fugiat dolor harum! Iusto quibusdam corporis mollitia dolor, ea repellendus, quo assumenda expedita cum ab fugiat! <br/>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi eveniet id doloremque eum sapiente reiciendis. Temporibus voluptate laudantium ipsam dolorem? </p>
                        </div>
                        
                    </div>
                </div>

                <div id="equipo" className="p-2">
                    <center>
                        <h1 className="p-2"> Equipo de trabajo</h1>
                        <div class="row row-cols-1 row-cols-md-3 g-4">
                            <div class="col">
                                <img className="img-personal" src={process.env.PUBLIC_URL + '/assets/personal1@2x.png'}  alt="" />
                                    <h5 >carlos</h5>
                            </div>
                            <div class="col">
                                <img className="img-personal" src={process.env.PUBLIC_URL + '/assets/personal2@2x.png'}  alt="" />
                                <h5 > maria</h5>
                            </div>
                            <div class="col">
                                <img className="img-personal" src={process.env.PUBLIC_URL + '/assets/personal3@2x.png'}  alt=""/>
                                <h5 > julia</h5>
                            </div>
                            <div class="col">
                                    <img className="img-personal" src={process.env.PUBLIC_URL + '/assets/peronal4.jpg'}  alt=""/>
                                    <h5 > sergio</h5>
                                </div>
                            <div class="col">
                                <img className="img-personal" src={process.env.PUBLIC_URL + '/assets/personal5.jpg'}  alt=""/>
                                <h5 > juan</h5>
                            </div>
                            <div class="col">
                                <img className="img-personal" src={process.env.PUBLIC_URL + '/assets/personal6.jpg'}  alt=""/>
                                <h5 > camila</h5>
                            </div>
                        </div>
                    </center>
                </div>
            

                <div class="container" >
                    <div class="cmo">
               
                    <div class="testimonios"class="col-sm-12 col-md-12 col-lg-12 col-xl-12 p-5">

                       <DiscussionEmbed
                        shortname="Restaurante-App"
                        config={
                            {
                                url:"http://localhost:3000/nosotros",
                                identifier: 0,
                                title: "Comentarios",
                                language: 'es_MX'	
                            }
                        }


                       />
                </div>
                

                </div>
            </div>
            <br/>
                </section>
        </>
    )
}
