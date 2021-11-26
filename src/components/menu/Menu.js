import React from 'react';
import './css/menu.css';
import carta from './carta/menu.pdf'
import Ensaladasmenu from './Ensaladasmenu';
import Sopasmenu from './Sopasmenu';
import Aperitivosmenu from './Aperitivosmenu';
import Bebidasmenu from './Bebidasmenu';
import Postresmenu from './Postresmenu';

export const Menu = () => {
    return (
        <div className="content" id="menu">
            <div className="container_12">
                <div className="grid_12">
                    <h3 className="head2">NUESTRO MENU</h3>
                </div>
            </div>
            <div className="partes_menu">
                <nav>
                    <div className="nav nav-tabs d-flex justify-content-center" id="nav-tab" role="tablist">
                        <button className="nav-link" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home"
                            type="button" role="tab" aria-controls="nav-home" aria-selected="false">Ensaladas</button>
                        <button className="nav-link " id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile"
                            type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Sopas</button>
                        <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact"
                            type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Aperitivos</button>
                        <button className="nav-link" id="nav-bebidas-tab" data-bs-toggle="tab" data-bs-target="#nav-bebidas"
                            type="button" role="tab" aria-controls="nav-bebidas" aria-selected="false">Bebidas</button>
                        <button className="nav-link" id="nav-postres-tab" data-bs-toggle="tab" data-bs-target="#nav-postres"
                            type="button" role="tab" aria-controls="nav-postres" aria-selected="false">Postres</button>
                    </div>
                </nav>

                <div className="tab-content p-5" id="nav-tabContent">
                    <div className="tab-pane fade" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                        <div className="menu_muestra_1">
                            <div id="ensaladas" className='row row-cols-1 row-cols-md-3 g-4'>
                                <Ensaladasmenu/>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                        <div className="menu_muestra_1" id="menu_muestra_1">
                            <div id="sopas" className='row row-cols-1 row-cols-md-3 g-4'>
                                <Sopasmenu/>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                        <div className="menu_muestra_1" id="menu_muestra_1">
                            <div id="aperitivos" className='row row-cols-1 row-cols-md-3 g-4'>
                                <Aperitivosmenu/>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="nav-bebidas" role="tabpanel" aria-labelledby="nav-bebidas-tab">
                        <div className="menu_muestra_1" id="menu_muestra_1">
                            <div id="bebidas" className='row row-cols-1 row-cols-md-3 g-4'>
                                <Bebidasmenu/>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="nav-postres" role="tabpanel" aria-labelledby="nav-postres-tab">
                        <div className="menu_muestra_1" id="menu_muestra_1">
                            <div id="postres" className='row row-cols-1 row-cols-md-3 g-4'>
                                <Postresmenu/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="text-center p-3 ">
                <a className='btn btn-primary' href={carta} role='button'><i className="fa fa-download"></i>DESCARGAR MENU</a>
            </div>
        </div>
    )
    
}
