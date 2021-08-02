import { IonCard, IonContent, IonItemOption, IonItemOptions, IonItemSliding } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { IonCardHeader, IonCardSubtitle, IonItem, IonLabel } from '@ionic/react';
// import { IonPage } from '@ionic/react';
// import { useState } from 'react';

import './Tab3.css';
import { Menu } from '../components/Menu';
import { host } from '../api';
import { useHistory } from 'react-router';

interface Usuario {
  id: string;
  altura: string;
  nomPersona: string;
}

const Tab3: React.FC = () => {

  const historial = useHistory();
  const [lista, setLista] = useState<Usuario[]>([]);
  const [error, setError] = useState({
    estado: 2,
    mensaje: ""
  })

  const TraerUsuariosPorEmpresa = async () => {

    const url = `${host}/Usuario/Empresa/${localStorage.getItem('id')}`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data)
    setLista(data);

  }

  useEffect(() => {

    TraerUsuariosPorEmpresa();

  }, [])

  const EliminarItem = async (id: string) => {

    try {
      const url = `${host}/Usuario/${id}`;
      await fetch(url, { method: 'DELETE' });

      TraerUsuariosPorEmpresa();

      setError({
        estado: 0,
        mensaje: "Eliminado correctamente"
      })

      resetearError();

    } catch (error) {
      setError({
        estado: 1,
        mensaje: "Error al querer eliminar registro"
      })
    }
  }

  const EditarItem = (id: string) => {
    localStorage.setItem('editar', id);
    historial.push('/altura');
  }

  const resetearError = () => {
    setTimeout(() => {
      setError({
        estado: 2,
        mensaje: ""
      })
    }, 1500);
  }

  return (
    <IonContent fullscreen>
      <IonCard >
        <IonCardHeader >
          <IonCardSubtitle>

            <div className="container">
              <div className="row">
                <div className="col-12">
                  <h2 className="fw-bold text-center my-3 text-white">Listado de Personas</h2>
                  <hr className="bg-light border border-ligth" />
                </div>
              </div>
              <div className="row contenedor_items">
                <div className="col-12 mb-5">
                  {
                    lista.map((item, index) => (

                      <div className="item_acordeon" key={index}>
                        <label htmlFor={`item${index}`} className="titulo_acordeon">{item.nomPersona}</label>
                        <input type="radio" name="altura" id={`item${index}`} />
                        <div className="contenido_acordeon d-flex justify-content-between align-items-center flex-column">
                          <p className="m-0 fs-3">Altura: <span className="fw-bold">{item.altura} cm</span> </p>
                          <div className="d-flex justify-content-between align-items-center w-100 mt-2">
                            <button className="btn btn-danger" onClick={() => EliminarItem(item.id)}>Eliminar</button>
                            <button className="btn btn-warning" onClick={() => EditarItem(item.id)}>Editar</button>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>

            </div>
            {
              error.estado === 1 ? (
                <div className="row mt-5">
                  <div className="col-11 mx-auto">
                    <div className="alert text-center alert-danger" role="alert">
                      {error.mensaje}
                    </div>
                  </div>
                </div>
              )
                : error.estado === 0 && (
                  <div className="row mt-5">
                    <div className="col-11 mx-auto">
                      <div className="alert text-center alert-success" role="alert">
                        {error.mensaje}
                      </div>
                    </div>
                  </div>
                )
            }
          </IonCardSubtitle>
        </IonCardHeader>
      </IonCard>

      <Menu />




    </IonContent>
  );
};

export default Tab3;
