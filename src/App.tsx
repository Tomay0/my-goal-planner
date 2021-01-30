import React, { useRef, useState } from 'react';
import {
  IonApp, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs
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

/* Pages */
import CheckList from './pages/checklist';
import GoalCreator from './pages/goal-creator';
import ProgressTracker from './pages/progress-tracker';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router';

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
    <IonApp>
      <IonReactRouter>
        <IonTabs >
          <IonRouterOutlet>
            <Route path='/checklist' component={CheckList} exact={true} />
            <Route path='/progress-tracker' component={ProgressTracker} exact={true} />
            <Route path='/goal-creator' component={GoalCreator} exact={true} />
            <Route path='/' render={() => <Redirect to='/checklist' />} exact={true} />
          </IonRouterOutlet>
          <IonTabBar slot='top'>
            <IonTabButton tab='checklist' href='/checklist'>
              <IonLabel>Checklist</IonLabel>
            </IonTabButton>
            <IonTabButton tab='progress-tracker' href='/progress-tracker'>
              <IonLabel>Progress Tracker</IonLabel>
            </IonTabButton>
            <IonTabButton tab='goal-creator' href='/goal-creator'>
              <IonLabel>Goal Creator</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>

    </IonApp>
  )
};

export default App;
