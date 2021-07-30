import React from 'react'
import { useHistory } from 'react-router';
import './Menu.css';
import { logOut } from 'ionicons/icons';
import { IonIcon, IonLabel } from '@ionic/react';


export const Menu = () => {
    const historial = useHistory();
    return (
        <div className="navegacion">
            <div className="elemento" onClick={() => { historial.push("/altura") }}>
                <IonIcon color="white" icon={logOut} className="icono" />
                <IonLabel className="label_logout"></IonLabel>
            </div>
            <div className="elemento" onClick={() => { historial.push("/lista") }}>

            </div>
            <div className="elemento" onClick={() => { historial.push("/"); window.location.reload(); }}>

            </div>
        </div>
    )
}
