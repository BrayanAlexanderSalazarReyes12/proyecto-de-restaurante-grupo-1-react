import React from 'react'
//import { UseInicio } from '../../hooks/inicio/useInicio'
import './css/inicioScreen.css'

export const InicioScreen = () => {

    //const { imgs } = UseInicio()
    /* useEffect(()=>{
        
    }) */
    return (
        <>
            <section class="ctn" id="Home">
                <div class="main_carr">
                    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img src="https://dam.cocinafacil.com.mx/wp-content/uploads/2020/04/comida-china-tipica.jpg" class="d-block w-100" alt="imagen 1"  />
                            </div>
                            <div class="carousel-item">
                                <img src="https://us.123rf.com/450wm/emmanperez/emmanperez1909/emmanperez190900019/130851138-deliciosas-enchiladas-de-excelente-comida-mexicana-mole-y-queso-comida-t%C3%ADpica-mexicana-.jpg?ver=6" class="d-block w-100" alt="imagen 2"  />
                            </div>
                            <div class="carousel-item">
                                <img src="https://img.freepik.com/foto-gratis/ensalada-pechuga-pollo-parrilla-vegetales-frescos-tomates-pepinos-hojas-lechuga-ensalada-pollo-comida-sana_2829-4246.jpg?size=626&ext=jpg" class="d-block w-100" alt="imagen 3" />
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            
                <div class="main_prensent">
                    <img src="https://es.justexw.com/wp-content/uploads/sites/2/gestion-de-un-restaurante-en-excel.jpg" alt="" width="100%" height="450px" />  
                    <div class="txt_pre">
                        <h1>Nuestra propuesta</h1>
                        <p className="textoo">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione debitis itaque dolorum animi! Nisi modi aut recusandae nesciunt perspiciatis laborum, odit rerum amet accusamus. Soluta quasi non fuga. Commodi, fugit!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, vitae libero! Aliquam vel fuga itaque, eum, esse facere quam laborum odio, eveniet voluptates est quia mollitia veniam tempora hic delectus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde rerum nisi at magnam earum! Illo exercitationem provident quasi rerum, unde adipisci, debitis excepturi error accusantium impedit obcaecati, cumque dignissimos earum?</p>
                    </div> 
                </div>
                
            
            <section id="recomendaciones">
                <div class="container">
                    <div class="row">
                    <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 p-5">
                        <h1 class="ca_title">Recomendaciones del chef</h1>
                        <br/><br/>
                        <div class="row row-cols-1 row-cols-md-2 g-4">
                            <div class="col">
                            <div class="card">
                                <img src={process.env.PUBLIC_URL + '/assets/reco-1.jpg'} class="card-img-top" alt="..." />
                                <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                </div>
                            </div>
                            </div>
                            <div class="col">
                            <div class="card">
                                <img src={process.env.PUBLIC_URL + '/assets/reco-2.jpg'} class="card-img-top" alt="..." />
                                <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                </div>
                            </div>
                            </div>
                            <div class="col">
                            <div class="card">
                                <img src={process.env.PUBLIC_URL + '/assets/reco-3.jpg'} class="card-img-top" alt="..." />
                                <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
                                </div>
                            </div>
                            </div>
                            <div class="col">
                            <div class="card">
                                <img src={process.env.PUBLIC_URL + '/assets/reco-1.jpg'} class="card-img-top" alt="..." />
                                <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
                                </div>
                            </div>
                            </div>
                        </div>

                            </div >
                            <div class="col">
                                <img src={process.env.PUBLIC_URL + '/assets/menu@2x.png'}  class="img-thumbnail" alt="menu" />
                                
                            </div>
                    </div>
                </div>
            </section>
                <div class="main_prensent">
                
                    <img  src="https://hotelciros.com/wp-content/uploads/2015/05/negocios031.jpg" alt="" width="100%" height="450px" />  
                    <div class="txt_pre">

                        <h1 class="title_pre">Organizamos tu evento</h1>
                        <p class="parra-title textoo" >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione debitis itaque dolorum animi! Nisi modi aut recusandae nesciunt perspiciatis laborum, odit rerum amet accusamus. Soluta quasi non fuga. Commodi, fugit!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, vitae libero! Aliquam vel fuga itaque, eum, esse facere quam laborum odio, eveniet voluptates est quia mollitia veniam tempora hic delectus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde rerum nisi at magnam earum! Illo exercitationem provident quasi rerum, unde adipisci, debitis excepturi error accusantium impedit obcaecati, cumque dignissimos earum?</p>
                    </div> 
                
                </div>
                
                <div id="carouselExampleDark" class="testimonio carousel carousel-dark slide" data-bs-ride="carousel">
                    <div class="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active"
                            aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1"
                            aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2"
                            aria-label="Slide 3"></button>
                    </div>
                    <div class="carousel-inner">
                        <div class="carousel-item active" data-bs-interval="10000">
                            <div class="d-flex justify-content-center align-content-center h-100 div" >
                                <div class="d-flex align-items-center">
                                    <img class="col-6 img-testimonio" src="https://socialtools.me/wp-content/uploads/2016/04/foto-de-perfil.jpg"  alt="" />
                                    <p class="slider-img p" >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum, iste tenetur, tempore, dicta deleniti nihil sunt molestias recusandae blanditiis quas fugiat beatae eos accusamus laudantium voluptates totam cupiditate nesciunt nulla.</p>
                                </div>
                            </div>
                        </div>
                        <div class="carousel-item active" data-bs-interval="10000">
                            <div class="d-flex justify-content-center align-content-center h-100 div" >
                                <div class="d-flex align-items-center">
                                    <img class="col-6 img-testimonio" src="https://socialtools.me/wp-content/uploads/2016/04/foto-de-perfil.jpg"  alt="" />
                                    <p class="slider-img p" >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum, iste tenetur, tempore, dicta deleniti nihil sunt molestias recusandae blanditiis quas fugiat beatae eos accusamus laudantium voluptates totam cupiditate nesciunt nulla.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button class="carousel-control-prev"  type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next"  type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
    
            </section>
        </>
    )
}
