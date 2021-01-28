import React, { useRef, useState } from 'react';
import {
  IonAlert,
  IonApp, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonRow, IonTitle, IonToolbar
} from '@ionic/react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* Components */
import BmiResult from './components/BmiResult';
import BmiSubmit from './components/BmiSubmit';

const App: React.FC = () => {
  const [yourBmi, setBmi] = useState<number>();
  const [error, setError] = useState<string>();

  const heightRef = useRef<HTMLIonInputElement>(null);
  const massRef = useRef<HTMLIonInputElement>(null);

  function calcBMI() {
    const height = heightRef.current!.value; // ! means that this should never be null
    const mass = massRef.current!.value;

    // check for null and negative
    if (!height || !mass || +height <= 0 || +mass <= 0) {
      setError("Enter a valid number for both fields!")
      return;
    }
    const bmi: number = +mass / (+height * +height);


    // check for NaN
    if (isNaN(bmi)) {
      setError("Enter a valid number for both fields!")
      return;
    }

    setBmi(bmi);
  }

  function clearError() {
    setError('');
  }

  return (
    <React.Fragment>
      <IonAlert isOpen={!!error} message={error} buttons={[{ text: 'OK', handler: clearError }]} />

      <IonApp>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>BMI Calculator</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">Your height (m)</IonLabel>
                  <IonInput ref={heightRef}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">Your mass (kg)</IonLabel>
                  <IonInput ref={massRef}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <BmiSubmit calcBMI={calcBMI} />
            {yourBmi && <BmiResult yourBmi={yourBmi} />}
          </IonGrid>
        </IonContent>
      </IonApp>
    </React.Fragment>
  )
};

export default App;
