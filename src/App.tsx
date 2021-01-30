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

/* Local storage */

/* Pages */
import CheckList from './pages/checklist';
import GoalCreator from './pages/goal-creator';
import ProgressTracker from './pages/progress-tracker';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router';
import { GoalList, Goal, isGoalList } from './goal';


class App extends React.Component<{}, { goalList: GoalList }> {
  componentDidMount() {
    const jsonString = localStorage.getItem('goal-list');
    if(jsonString === 'string') {
      const goals = JSON.parse(jsonString);

      if (isGoalList(goals)) {
        this.setState({ goalList: goals });
        return;
      }
    }

    const goalList: GoalList = {goals: new Array<Goal>()};
    this.updateState(goalList);
  }

  updateState(goalList: GoalList) {
    this.setState({goalList});
    localStorage.setItem('goal-list', JSON.stringify(goalList));
  }

  render() {
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
    );
  }
}

export default App;
