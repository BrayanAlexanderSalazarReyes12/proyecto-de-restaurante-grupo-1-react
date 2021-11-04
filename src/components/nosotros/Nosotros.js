import React from 'react'
import './css/nosotros.css'
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
                <h3 class="p-3">Comentarios</h3>
                    <div class="testimonios"class="col-sm-12 col-md-12 col-lg-12 col-xl-12 p-5">

                    

                        <img className="img-cmo" src={process.env.PUBLIC_URL + '/assets/personal5.jpg'}  alt=""/>
                        <p >Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod iusto dolores repellat at non eveniet facilis doloribus, delectus odio velit officiis, distinctio commodi nihil illum eos cumque nesciunt in vitae.</p>
                   

                   
                </div>
                
                <div class="testimonios"class="col-sm-12 col-md-12 col-lg-12 col-xl-12 p-5">

                        <div class="form-floating">
                        <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
                        <label for="floatingTextarea">Comments</label>
                        </div>
                        <br/>
                    <input class="btn btn-primary" type="submit" value="Subir"/>

                    </div>

                </div>
            </div>
            <br/>
                </section>
        </>
    )
}
