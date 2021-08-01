import { IonCard, IonContent, IonItemOption, IonItemOptions, IonItemSliding } from '@ionic/react';
import React, { useState } from 'react';
import { IonCardHeader, IonCardSubtitle, IonItem, IonLabel } from '@ionic/react';
// import { IonPage } from '@ionic/react';
// import { useState } from 'react';

import './Tab3.css';
import { Menu } from '../components/Menu';



const lista = [0,0,0,0,0,0,0,0];
const Tab3: React.FC = () => {

 

  
    

const [form, setForm] = useState({
    altura:"",
    usuario: ""
  })


  // const capturar =(e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>)=>{
  //     setForm({
  //         ...form,
  //         [e.target.name]: e.target.value
  //     })

  // }
    
  return (
    <IonContent fullscreen> 



        <IonCard >
          <IonCardHeader >
            <IonCardSubtitle>   
git

              <button className=" btn btn-danger w-100 mt-2">Agregar</button>

            </IonCardSubtitle>
          </IonCardHeader>
        </IonCard>

        {
        lista.map((l,index) => (
          <IonItemSliding >
      <IonItem>
      <IonLabel className="text-primary">Item {index+1}
             <button className="btn btn-primary"> Borrar</button></IonLabel>
          </IonItem>
          <IonItemOptions side="end">
            <IonItemOption onClick={() => { }}>Unread</IonItemOption>
          </IonItemOptions>
        </IonItemSliding>
        ))
        }
        <Menu />
        
    


    </IonContent>
  );
};

export default Tab3;
