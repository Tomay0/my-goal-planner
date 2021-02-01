import React from 'react';
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

  constructor(props: {}) {
    super(props);

    // bind updateState function
    this.updateState = this.updateState.bind(this);
  }


  /**
   * When the component mounts - load your goals.
   */
  componentDidMount() {
    // load goal list from local storage
    const jsonString = localStorage.getItem('goal-list');

    if (typeof jsonString === 'string') {
      const goals = JSON.parse(jsonString);

      if (isGoalList(goals)) {
        this.setState({ goalList: goals });
        return;
      }
    }

    // the goal list from local storage does not exist. Create empty goal list.
    const goalList: GoalList = { goals: new Array<Goal>() };
    this.setState({ goalList: goalList });
  }

  /**
   * Update local storage with new list of goals
   * @param goalList new list of goals
   */
  updateState(goalList: GoalList) {
    this.setState({ goalList });
    localStorage.setItem('goal-list', JSON.stringify(goalList));
  }

  /**
   * Render the application
   */
  render() {
    return (
      <IonApp>
        <IonReactRouter>
          <IonTabs >
            <IonRouterOutlet>
              <Route path='/checklist' component={CheckList} exact={true} />
              <Route path='/progress-tracker' component={ProgressTracker} exact={true} />
              <Route path='/goal-creator' render={
                () => <GoalCreator goalList={this.state.goalList} updateState={this.updateState} />
              } exact={true} />
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
