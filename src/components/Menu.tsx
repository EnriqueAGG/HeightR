import React from 'react'
import { useHistory } from 'react-router';
import './Menu.css';
import { logOut, clipboard, refresh } from 'ionicons/icons';
import { IonIcon, IonLabel } from '@ionic/react';



export const Menu = () => {
    const historial = useHistory();

    const cambiar=()=>{
        historial.push("/lista"); window.location.href ="/lista";
    }

    return (
        <div className="navegacion">
            <div className="elemento" onClick={() => { historial.push("/altura") }}>
                <IonIcon color="white" icon={logOut} className="icono" />
                <p className="label_logout m-0 p-0">Altura</p>
            </div>
            <div className="elemento" onClick={cambiar}>
            <IonIcon color="white" icon={clipboard} className="icono" />
                <p className="label_logout m-0 p-0">Lista</p>
           
            </div>
            <div className="elemento" onClick={() => { historial.push("/"); window.location.reload(); }}>
            <IonIcon color="white" icon={refresh} className="icono" />
                <p className="label_logout m-0 p-0">Salir</p>
            </div>
        </div>
    )
}
