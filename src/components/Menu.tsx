import React from 'react'
import { useHistory } from 'react-router';
import './Menu.css';
import { logOut, clipboard, refresh } from 'ionicons/icons';
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
            <IonIcon color="white" icon={clipboard} className="icono" />
                <IonLabel className="label_logout"></IonLabel>
           
            </div>
            <div className="elemento" onClick={() => { historial.push("/"); window.location.reload(); }}>
            <IonIcon color="white" icon={refresh} className="icono" />
                <IonLabel className="label_logout"></IonLabel>
            </div>
        </div>
    )
}
