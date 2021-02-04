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
import { ProgressList, isProgressList } from './progress';


class App extends React.Component<{}, { goalList: GoalList, progressList: ProgressList }> {

  constructor(props: {}) {
    super(props);

    // bind updateState function
    this.updateGoals = this.updateGoals.bind(this);
    this.updateProgress = this.updateProgress.bind(this);
  }


  /**
   * When the component mounts - load your goals.
   */
  componentDidMount() {
    let goalList: GoalList = { goals: new Array<Goal>(), tasks: {} };
    let progressList: ProgressList = {};


    // load goal list from local storage
    const goalListString = localStorage.getItem('goal-list');

    if (typeof goalListString === 'string') {
      const goals = JSON.parse(goalListString);

      if (isGoalList(goals)) {
        goalList = goals;
      }
    }
    
    // load progress list from local storage
    const progressListString = localStorage.getItem('progress-list');

    if (typeof progressListString === 'string') {
      const progress = JSON.parse(progressListString);

      if (isProgressList(progress)) {
        progressList = progress;
      }
    }

    // the goal list from local storage does not exist. Create empty goal list.
    this.setState({ goalList, progressList });
  }

  /**
   * Update local storage with new list of goals
   * @param goalList new list of goals
   */
  updateGoals(goalList: GoalList) {
    this.setState({ goalList, progressList: this.state.progressList });
    localStorage.setItem('goal-list', JSON.stringify(goalList));
  }

  /**
   * Update local storage with new list of progress
   * @param progressList new list of progress
   */
  updateProgress(progressList: ProgressList) {
    this.setState({ goalList: this.state.goalList, progressList });
    localStorage.setItem('progress-list', JSON.stringify(progressList));
      
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
              <Route path='/checklist' render={
                () => <CheckList goalList={this.state.goalList} progressList={this.state.progressList} updateProgress={this.updateProgress} />
              } exact={true} />
              <Route path='/progress-tracker' render={
                () => <ProgressTracker goalList={this.state.goalList} progressList={this.state.progressList} />
              } exact={true} />
              <Route path='/goal-creator' render={
                () => <GoalCreator goalList={this.state.goalList} updateGoals={this.updateGoals} />
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
