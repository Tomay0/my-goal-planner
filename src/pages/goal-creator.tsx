import { IonButton, IonContent, IonIcon, IonLabel, IonPage } from '@ionic/react';
import React from 'react';
import { Goal, GoalList } from '../goal';
import { addOutline } from 'ionicons/icons';
import GoalPane from '../components/goal-pane';


/**
 * Goal Creator allows you to create and edit your goals
 */
class GoalCreator extends React.Component<{
    goalList: GoalList, updateState: (goalList: GoalList) => void
}, { goalList: GoalList }> {

    /**
     * Initialise the goal creator with your goal list
     * @param props contains goal list and a method to update the state
     */
    constructor(props: { goalList: GoalList, updateState: (goalList: GoalList) => void }) {
        super(props);

        this.state = { goalList: props.goalList };

        this.newGoal = this.newGoal.bind(this);
        this.removeGoal = this.removeGoal.bind(this);
        this.update = this.update.bind(this);
    }

    /**
     * Create a new goal with an empty list of tasks
     */
    newGoal() {
        const goalList: GoalList = this.state?.goalList;
        const newGoal: Goal = { name: "New Goal", tasks: [] };

        goalList.goals.push(newGoal);

        this.setState({ goalList });

        this.props.updateState(goalList);
    }

    /**
     * Remove goal
     * @param goal goal to remove 
     */
    removeGoal(goal: Goal) {
        const goalList: GoalList = this.state?.goalList;

        const index = goalList.goals.indexOf(goal);

        if (index > -1) {
            goalList.goals.splice(index, 1);
        }

        this.setState({ goalList });

        this.props.updateState(goalList);
    }

    /**
     * Update list of goals
     */
    update() {
        const goalList: GoalList = this.state?.goalList;
        this.setState({ goalList });
        this.props.updateState(goalList);
    }

    /**
     * Render the goal creator list
     */
    render() {

        return (
            <IonPage>
                <IonContent>
                    {this.state?.goalList.goals.map((goal: Goal, index: number) => (
                        <GoalPane goal={goal} removeGoal={this.removeGoal} update={this.update} key={index} />
                    ))}
                    <IonButton expand="block" color="primary" onClick={this.newGoal}>
                        <IonIcon icon={addOutline} slot='start' />
                        <IonLabel>Add Goal</IonLabel>
                    </IonButton>
                </IonContent>



            </IonPage>
        );
    }
}

export default GoalCreator;