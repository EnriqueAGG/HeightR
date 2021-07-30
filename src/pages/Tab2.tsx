/* eslint-disable @typescript-eslint/no-unused-vars */
import { IonCard, IonCheckbox, IonContent, IonHeader, IonInput, IonItemDivider, IonItemOption, IonItemOptions, IonItemSliding, IonList, IonPage, IonRadio, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import React, { ChangeEvent, FormEventHandler, useState } from 'react';
import { IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton } from '@ionic/react';
import { pin, wifi, wine, warning, walk, text, listSharp } from 'ionicons/icons';
import './Tab2.css';
import { useHistory } from 'react-router';
import { Menu } from '../components/Menu';

const lista = [0,0,0,0,0,0,0,0];

const Tab2: React.FC = () => {

  const [form, setForm] = useState({
    altura:"",
    usuario: ""
  })


  const capturar =(e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>)=>{
      setForm({
          ...form,
          [e.target.name]: e.target.value
      })

  }
    
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 2</IonTitle>
        </IonToolbar>
      </IonHeader>



      <IonContent fullscreen>
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>




              <IonItem>
               
                {/* <IonInput type="number" value = {formulario} onChange={capturar}></IonInput>cm */}
                <input
                  type="text"
                  className="user"
                  placeholder="altura"
                  name="altura"
                  value={form.altura}
                  onChange={capturar}
                />
              </IonItem>


              <IonItem>
              <input
                  type="text"
                  placeholder="usuario"
                  name="usuario"
                  value={form.usuario}
                  onChange={capturar}
                />
              </IonItem>




            </IonCardSubtitle>
          </IonCardHeader>
        </IonCard>

        <br />
        

      {
        lista.map((l,index) => (
          <IonItemSliding>
          <IonItem>
            <IonLabel>Item {index+1}</IonLabel>
          </IonItem>
          <IonItemOptions side="end">
            <IonItemOption onClick={() => { }}>Unread</IonItemOption>
          </IonItemOptions>
        </IonItemSliding>
        ))
      }


        <p>hola mundo</p>

        <Menu />

      </IonContent>


    </IonPage>
  );
};

export default Tab2;
