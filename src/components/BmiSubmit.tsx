import React from 'react';
import { IonRow, IonCol, IonButton } from '@ionic/react';



const BmiSubmit: React.FC<{ calcBMI: () => void }> = props => (
  <IonRow>
    <IonCol>
      <IonButton color="primary" id="calculate-btn" onClick={props.calcBMI}>Calculate BMI</IonButton>
    </IonCol>
  </IonRow>
)

export default BmiSubmit;