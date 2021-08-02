/* eslint-disable @typescript-eslint/no-unused-vars */
import { IonCard, IonCheckbox, IonContent, IonHeader, IonInput, IonItemDivider, IonItemOption, IonItemOptions, IonItemSliding, IonList, IonPage, IonRadio, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import React, { ChangeEvent, FormEventHandler, useEffect, useState } from 'react';
import { IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton } from '@ionic/react';
import { pin, wifi, wine, warning, walk, text, listSharp } from 'ionicons/icons';
import './Tab2.css';
import { useHistory } from 'react-router';
import { Menu } from '../components/Menu';
import { host } from '../api';

interface Usuario {
  id: string;
  altura: string;
  nomPersona: string;
}


const Tab2: React.FC = () => {

  const [form, setForm] = useState({
    altura: "",
    usuario: "",
    id: ""
  })

  const [error, setError] = useState({
    estado: 2,
    mensaje: ""
  })

  const TraerUsuario = async () => {
    const id = localStorage.getItem('editar');
    if (id) {
      const url = `${host}/Usuario/${id}`
      const res = await fetch(url);
      const data: Usuario = await res.json();

      if (data) {
        setForm({
          altura: data?.altura,
          usuario: data?.nomPersona,
          id: data?.id
        })
      }
    }
  }

  useEffect(() => {
    TraerUsuario();
  }, [])

  const capturar = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const agregar = async () => {
    if (form.usuario.trim() === "" || form.altura.trim() === "") {
      setError({
        estado: 1,
        mensaje: "Todos los campos son obligatorios"
      })
      resetearError();
      return;
    }

    //TODO:inserscion de datos
    try {
      const dataSend = {
        nompersona: form.usuario,
        altura: form.altura,
        idEmpresa: localStorage.getItem("id")
      }

      const url = `${host}/Usuario`
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(dataSend)
      })

      const data = await res.json();

      if (data) {
        // console.log(data)
        setError({
          estado: 0,
          mensaje: "Datos insertados correctamente"
        })
        resetearError()
      }
    } catch (error) {
      setError({
        estado: 1,
        mensaje: "Error al insertar los datos"
      })
    }

    setForm({
      altura: "",
      usuario: "",
      id: ""
    })
  }

  const EditarElemento = async (id: string) => {
    try {
      const url = `${host}/Usuario`;
      const body = {
        id: localStorage.getItem('editar'),
        nompersona: form.usuario,
        altura: form.altura,
        idEmpresa: localStorage.getItem("id")
      }
      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (data) {
        setError({
          estado: 0,
          mensaje: "Datos actualizados correctamente"
        })
        setForm({
          altura: "",
          usuario: "",
          id: ""
        })
        localStorage.removeItem('editar');
        resetearError();
      }
    } catch (error) {
      setError({
        estado: 1,
        mensaje: "Error al actualizar los datos"
      })
    }

  }

  const CancelarEdicion = () => {
    setForm({
      altura: "",
      usuario: "",
      id: ""
    })
    localStorage.removeItem('editar');
    setError({
      estado: 1,
      mensaje: "Proceso cancelado"
    })
    resetearError();
  }

  const ObtenerAltura=async()=>{
    
    const url = `${host}/Usuario/altura`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data)
    setForm({
      altura: data,
      usuario: form.usuario,
      id: form.id
    })

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
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className=" fw-bold text-center text-info">Crear la Altura del Usuario</IonTitle>
        </IonToolbar>
      </IonHeader>



      <IonContent fullscreen>
        <IonCard >
          <IonCardHeader >
            <IonCardSubtitle>




              <IonItem className="text-light " >

                {/* <IonInput type="number" value = {formulario} onChange={capturar}></IonInput>cm */}
                <div className="row">
                  <div className="col-12 d-flex justify-content-between align-center">
                    <input
                      type="text"
                      className="user fw-normal text-center mx-auto py-2"
                      placeholder="altura"
                      name="altura"
                      value={form.altura}
                      onChange={capturar}
                      disabled
                    />
                    <button className="btn btn-info" onClick={ObtenerAltura}>Obtener</button>
                  </div>
                </div>
              </IonItem>


              <IonItem className="text-light ">
                <input
                  type="text"
                  className="fw-normal text-center mx-auto w-100 py-2 mt-4"
                  placeholder="nombre del usuario"
                  name="usuario"
                  value={form.usuario}
                  onChange={capturar}
                />
              </IonItem>

            </IonCardSubtitle>
          </IonCardHeader>
          {
            (form.id === "") ?
              <button className=" btn btn-primary w-100 mt-3" onClick={agregar}>Agregar</button>
              :
              <>
                <button className=" btn btn-primary w-100 mt-3" onClick={() => { EditarElemento(form.id) }}>Editar</button>
                <button className=" btn btn-danger w-100 mt-3" onClick={() => { CancelarEdicion() }}>Cancelar</button>
              </>
          }
        </IonCard>

        <br />
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

        <Menu />

      </IonContent>


    </IonPage>
  );
};

export default Tab2;
