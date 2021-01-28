import React from 'react';
import { IonRow, IonCol, IonCard, IonCardHeader, IonCardContent } from '@ionic/react';

const BmiResult: React.FC<{ yourBmi: number }> = props => (
    <IonRow>
        <IonCol>
            <IonCard>
                <IonCardHeader>Your BMI</IonCardHeader>
                <IonCardContent>{props.yourBmi}</IonCardContent>
            </IonCard>
        </IonCol>
    </IonRow>
)

export default BmiResult;