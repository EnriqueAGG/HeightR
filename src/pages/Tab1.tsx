/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { host } from '../api';



const Tab1: React.FC = () => {

  const historial = useHistory();

  const [form, setForm] = useState({
    pass: "",
    usuario: ""
  })

  const [error, setError] = useState({
    estado: 2,
    mensaje: ""
  })

  const capturar = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })

  }

  const login = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (form.usuario.trim() === "" || form.pass.trim() === "") {
      // console.log('error estan vacios');
      setError({
        estado: 1,
        mensaje: "Todos los campos son obligatorios"
      });
      return;
    }



    try {
      const url = `${host}/Empresa/${form.usuario}&${form.pass}`
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        }
      })

      const data = await res.json();

      if (data) {
        setError({
          estado: 0,
          mensaje: ""
        });

        localStorage.setItem('id',data.id);
        setError({
          estado: 2,
          mensaje: ""
        });
        setTimeout(() => {
          
          historial.replace("/altura");
          
        }, 1000);
      }

    } catch (error) {
      setError({
        estado: 1,
        mensaje: "Error en el usuario o la contraseña"
      });
    }



  }

  return (
    <>
      <div className="container h-100 py-4 bg-dark text-white">

        <h1 className="text-dark bg-info text-center mt-4 rounded py-2">Inicio de sesión </h1>

        <div className="mb-3 mt-5">
          <label htmlFor="exampleInputEmail1" className="form-label">Empresa</label>

          <input name="usuario" value={form.usuario} onChange={capturar} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>


          <input name="pass" value={form.pass} onChange={capturar} type="password" className="w-100 form-control " id="exampleInputPassword1" />
        </div>

        <button type="submit" className="btn btn-primary w-100 mt-3" onClick={login}>Ingresar</button>


        {
          error.estado === 1 ? (
            <div className="row mt-5">
              <div className="col-12">
                <div className="alert alert-danger" role="alert">
                  {error.mensaje}
                </div>
              </div>
            </div>
          )
            : error.estado === 0 && (
              <div className="row mt-5">
                <div className="col-12">
                  <div className="alert alert-success" role="alert">
                    Login exitoso
                  </div>
                </div>
              </div>
            )
        }

        <div className="row">
          <div className="col-5 text-center mx-auto mt-5">
            <img src="./assets/icon/height.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Tab1;
